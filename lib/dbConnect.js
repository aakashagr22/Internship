import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering
      dbName: process.env.MONGODB_DB || "apollo247clone", // Specify database
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB Connected Successfully");
      return mongoose;
    }).catch((err) => {
      console.error("MongoDB Connection Error:", err);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Reset cached promise on error to allow retries
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

// Optional: Close connection during app shutdown
if (process.env.NODE_ENV !== "production") {
  process.on("beforeExit", async () => {
    if (cached.conn) {
      await cached.conn.disconnect();
      console.log("MongoDB Disconnected");
    }
  });
}

export default dbConnect;