const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/apollo247clone";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Doctor Schema
const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true },
    qualification: { type: String, required: true },
    languages: [{ type: String }],
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    consultationFee: { type: Number, required: true },
    availability: {
      online: { type: Boolean, default: true },
      clinic: { type: Boolean, default: true },
      hospital: { type: Boolean, default: false },
    },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    imageUrl: { type: String, default: "/placeholder.svg" },
    location: { type: String },
    hospital: { type: String },
    nextAvailableSlot: { type: Date },
  },
  { timestamps: true }
);

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);

module.exports = { connectToDatabase, Doctor };