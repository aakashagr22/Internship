import dbConnect from "../../lib/dbConnect"
import Doctor from "../../models/Doctor"

// Sample doctor data (same as in scripts/seed-data.js)
const doctorData = [
  {
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
    imageUrl: "/images/doctors/doctor-1.png",
    location: "Chennai",
    hospital: "Apollo Hospitals",
    nextAvailableSlot: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
  },
  {
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
    imageUrl: "/images/doctors/doctor-2.png",
    location: "Delhi",
    hospital: "Apollo Clinic",
    nextAvailableSlot: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
  },
  {
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
    imageUrl: "/images/doctors/doctor-3.png",
    location: "Mumbai",
    hospital: "Apollo Spectra",
    nextAvailableSlot: new Date(Date.now() + 10800000).toISOString(), // 3 hours from now
  },
  {
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
    imageUrl: "/images/doctors/doctor-4.png",
    location: "Hyderabad",
    hospital: "Apollo Health City",
    nextAvailableSlot: new Date(Date.now() + 14400000).toISOString(), // 4 hours from now
  },
  {
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
    imageUrl: "/images/doctors/doctor-5.png",
    location: "Bangalore",
    hospital: "Apollo Hospitals",
    nextAvailableSlot: new Date(Date.now() + 18000000).toISOString(), // 5 hours from now
  },
]

export default async function handler(req, res) {
  // Only allow this in development or with a special key
  const isAuthorized = process.env.NODE_ENV === "development" || req.headers["x-seed-key"] === process.env.SEED_API_KEY

  if (!isAuthorized) {
    return res.status(401).json({ success: false, message: "Unauthorized" })
  }

  try {
    await dbConnect()

    // Clear existing data
    await Doctor.deleteMany({})

    // Insert new data
    const doctors = await Doctor.insertMany(doctorData)

    res.status(200).json({
      success: true,
      message: `Database seeded with ${doctors.length} doctors`,
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}
