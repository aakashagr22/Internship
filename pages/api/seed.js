// pages/api/seed.js
import 'dotenv/config';
import mongoose from 'mongoose';
import dbConnect from '../../lib/dbConnect.js';
import Doctor from '../../models/Doctor.js';


// Sample doctor data (same as in scripts/seed-data.js)
export const doctorData = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    specialty: "General Physician & Internal Medicine",
    experience: 15,
    qualification: "MBBS, MD (Internal Medicine)",
    languages: ["English", "Hindi", "Tamil"],
    gender: "Male",
    consultationFee: 800,
    availability: {
      online: true,
      clinic: true,
      hospital: false,
    },
    rating: 4.8,
    reviewCount: 245,
    imageUrl: "/images/doctors/male-doctor-1.jpg",
    location: "Chennai",
    hospital: "Apollo Hospitals",
    nextAvailableSlot: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    specialty: "General Physician & Internal Medicine",
    experience: 12,
    qualification: "MBBS, DNB (Family Medicine)",
    languages: ["English", "Hindi", "Bengali"],
    gender: "Female",
    consultationFee: 700,
    availability: {
      online: true,
      clinic: true,
      hospital: true,
    },
    rating: 4.7,
    reviewCount: 189,
    imageUrl: "/images/doctors/female-doctor-1.jpg",
    location: "Delhi",
    hospital: "Apollo Clinic",
    nextAvailableSlot: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
  },
  {
    id: "3",
    name: "Dr. Suresh Patel",
    specialty: "General Physician & Internal Medicine",
    experience: 20,
    qualification: "MBBS, MD (Internal Medicine), DM (Cardiology)",
    languages: ["English", "Gujarati", "Hindi"],
    gender: "Male",
    consultationFee: 1200,
    availability: {
      online: true,
      clinic: false,
      hospital: true,
    },
    rating: 4.9,
    reviewCount: 312,
    imageUrl: "/images/doctors/male-doctor-3.png",
    location: "Mumbai",
    hospital: "Apollo Spectra",
    nextAvailableSlot: new Date(Date.now() + 10800000).toISOString(), // 3 hours from now
  },
  {
    id: "4",
    name: "Dr. Ananya Reddy",
    specialty: "General Physician & Internal Medicine",
    experience: 8,
    qualification: "MBBS, MD (General Medicine)",
    languages: ["English", "Telugu", "Tamil"],
    gender: "Female",
    consultationFee: 600,
    availability: {
      online: true,
      clinic: true,
      hospital: false,
    },
    rating: 4.5,
    reviewCount: 156,
    imageUrl: "/images/doctors/female-doctor-2.jpg",
    location: "Hyderabad",
    hospital: "Apollo Health City",
    nextAvailableSlot: new Date(Date.now() + 14400000).toISOString(), // 4 hours from now
  },
  {
    id: "5",
    name: "Dr. Vikram Singh",
    specialty: "General Physician & Internal Medicine",
    experience: 18,
    qualification: "MBBS, MD (Internal Medicine), FRCP",
    languages: ["English", "Hindi", "Punjabi"],
    gender: "Male",
    consultationFee: 1000,
    availability: {
      online: true,
      clinic: true,
      hospital: true,
    },
    rating: 4.8,
    reviewCount: 278,
    imageUrl: "/images/doctors/male-doctor-2.png",
    location: "Bangalore",
    hospital: "Apollo Hospitals",
    nextAvailableSlot: new Date(Date.now() + 18000000).toISOString(), // 5 hours from now
  },
  {
    id: "6",
    name: "Dr. Meera Joshi",
    specialty: "General Physician & Internal Medicine",
    experience: 10,
    qualification: "MBBS, DNB (Family Medicine)",
    languages: ["English", "Marathi", "Hindi"],
    gender: "Female",
    consultationFee: 750,
    availability: {
      online: true,
      clinic: false,
      hospital: false,
    },
    rating: 4.6,
    reviewCount: 142,
    imageUrl: "/images/doctors/female-doctor-3.png",
    location: "Pune",
    hospital: "Apollo Clinic",
    nextAvailableSlot: new Date(Date.now() + 21600000).toISOString(), // 6 hours from now
  },
  {
    id: "7",
    name: "Dr. Arjun Nair",
    specialty: "General Physician & Internal Medicine",
    experience: 14,
    qualification: "MBBS, MD (Internal Medicine)",
    languages: ["English", "Malayalam", "Tamil"],
    gender: "Male",
    consultationFee: 850,
    availability: {
      online: true,
      clinic: true,
      hospital: false,
    },
    rating: 4.7,
    reviewCount: 198,
    imageUrl: "/images/doctors/male-doctor-4.jpg",
    location: "Kochi",
    hospital: "Apollo Adlux",
    nextAvailableSlot: new Date(Date.now() + 25200000).toISOString(), // 7 hours from now
  },
  {
    id: "8",
    name: "Dr. Kavita Desai",
    specialty: "General Physician & Internal Medicine",
    experience: 16,
    qualification: "MBBS, MD (General Medicine), MRCP",
    languages: ["English", "Gujarati", "Hindi"],
    gender: "Female",
    consultationFee: 900,
    availability: {
      online: true,
      clinic: true,
      hospital: true,
    },
    rating: 4.8,
    reviewCount: 231,
    imageUrl: "/images/doctors/female-doctor-4.jpg",
    location: "Ahmedabad",
    hospital: "Apollo Hospitals",
    nextAvailableSlot: new Date(Date.now() + 28800000).toISOString(), // 8 hours from now
  },
  {
    id: "9",
    name: "Dr. Rahul Verma",
    specialty: "General Physician & Internal Medicine",
    experience: 9,
    qualification: "MBBS, DNB (General Medicine)",
    languages: ["English", "Hindi", "Punjabi"],
    gender: "Male",
    consultationFee: 650,
    availability: {
      online: true,
      clinic: false,
      hospital: true,
    },
    rating: 4.5,
    reviewCount: 124,
    imageUrl: "/images/doctors/male-doctor-5.jpeg",
    location: "Chandigarh",
    hospital: "Apollo Spectra",
    nextAvailableSlot: new Date(Date.now() + 32400000).toISOString(), // 9 hours from now
  },
  {
    id: "10",
    name: "Dr. Lakshmi Rao",
    specialty: "General Physician & Internal Medicine",
    experience: 22,
    qualification: "MBBS, MD (Internal Medicine), DM (Endocrinology)",
    languages: ["English", "Telugu", "Kannada"],
    gender: "Female",
    consultationFee: 1100,
    availability: {
      online: true,
      clinic: true,
      hospital: true,
    },
    rating: 4.9,
    reviewCount: 287,
    imageUrl: "/images/doctors/female-doctor-5.jpg",
    location: "Hyderabad",
    hospital: "Apollo Health City",
    nextAvailableSlot: new Date(Date.now() + 36000000).toISOString(), // 10 hours from now
  },
];





async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
      serverSelectionTimeoutMS: 5000
    });
    console.log(' MongoDB Connected');

    // Clear existing data
    const deleteResult = await Doctor.deleteMany({});
    console.log(` Deleted ${deleteResult.deletedCount} doctors`);

    // Insert new data
    const result = await Doctor.insertMany(doctorData);
    console.log(` Seeded ${result.length} doctors`);
    
    // Verify
    const count = await Doctor.countDocuments();
    console.log(` Database now has ${count} doctors`);
    
  } catch (error) {
    console.error(' Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seedDatabase();