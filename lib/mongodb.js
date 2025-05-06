import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'apollo247clone';

// Configuration options for MongoDB connection
const MONGO_OPTIONS = {
  maxPoolSize: 10, // Maximum number of connections in the pool
  socketTimeoutMS: 30000, // Close sockets after 30 seconds of inactivity
  serverSelectionTimeoutMS: 5000, // Try sending operations for 5 seconds
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
};

// Validate environment variables
if (!MONGODB_URI) {
  throw new Error(`
  Please define the MONGODB_URI environment variable inside .env.local
  
  Example:
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster.example.mongodb.net/?retryWrites=true&w=majority
  `);
}

if (!MONGODB_DB) {
  throw new Error(`
  Please define the MONGODB_DB environment variable inside .env.local
  
  Example:
  MONGODB_DB=apollo247clone
  `);
}

// Connection caching for development
let cached = global.mongo || { client: null, promise: null };

/**
 * Connects to MongoDB and returns the client and database instance
 * @returns {Promise<{client: MongoClient, db: Db}>}
 */
export async function connectToDatabase() {
  if (cached.client) {
    return {
      client: cached.client,
      db: cached.client.db(MONGODB_DB),
    };
  }

  if (!cached.promise) {
    try {
      cached.promise = MongoClient.connect(MONGODB_URI, MONGO_OPTIONS)
        .then(client => {
          console.log(' MongoDB Connected Successfully');
          return client;
        })
        .catch(err => {
          console.error(' MongoDB Connection Error:', err);
          throw err;
        });
    } catch (err) {
      console.error('MongoDB Connection Setup Failed:', err);
      throw err;
    }
  }

  try {
    cached.client = await cached.promise;
    return {
      client: cached.client,
      db: cached.client.db(MONGODB_DB),
    };
  } catch (err) {
    // Reset cache on connection failure
    cached.promise = null;
    throw err;
  }
}

// Cleanup connection in development when process exits
if (process.env.NODE_ENV === 'development') {
  process.on('beforeExit', async () => {
    if (cached.client) {
      await cached.client.close();
      console.log(' MongoDB Disconnected');
      cached.client = null;
      cached.promise = null;
    }
  });
}