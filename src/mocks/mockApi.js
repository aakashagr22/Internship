const doctorData = [
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
]

// Mock API functions
export const mockFetchDoctors = (params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Apply filters
      let filteredDoctors = [...doctorData]

      if (params.gender) {
        filteredDoctors = filteredDoctors.filter((doctor) => doctor.gender === params.gender)
      }

      if (params.experience) {
        const expValue = Number.parseInt(params.experience)
        if (expValue > 0) {
          filteredDoctors = filteredDoctors.filter((doctor) => doctor.experience >= expValue)
        }
      }

      if (params.availability) {
        if (params.availability === "online") {
          filteredDoctors = filteredDoctors.filter((doctor) => doctor.availability.online)
        } else if (params.availability === "clinic") {
          filteredDoctors = filteredDoctors.filter((doctor) => doctor.availability.clinic)
        } else if (params.availability === "hospital") {
          filteredDoctors = filteredDoctors.filter((doctor) => doctor.availability.hospital)
        }
      }

      // Apply sorting
      if (params.sortBy) {
        const sortOrder = params.sortOrder === "asc" ? 1 : -1
        filteredDoctors.sort((a, b) => {
          if (a[params.sortBy] < b[params.sortBy]) return -1 * sortOrder
          if (a[params.sortBy] > b[params.sortBy]) return 1 * sortOrder
          return 0
        })
      }

      // Apply pagination
      const page = Number.parseInt(params.page) || 1
      const limit = Number.parseInt(params.limit) || 10
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex)

      resolve({
        success: true,
        doctors: paginatedDoctors,
        pagination: {
          total: filteredDoctors.length,
          page,
          limit,
          totalPages: Math.ceil(filteredDoctors.length / limit),
        },
      })
    }, 500) // Simulate network delay
  })
}

export const mockAddDoctor = (doctorData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        doctor: {
          id: Date.now().toString(),
          ...doctorData,
        },
      })
    }, 500) // Simulate network delay
  })
}
