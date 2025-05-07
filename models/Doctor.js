// models/Doctor.js
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  experience: Number,
  // ... other fields
}, { collection: 'doctor' }); // Explicit collection name

export default mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);