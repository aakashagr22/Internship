"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Header from "../../components/Header"
import DoctorFilters from "../../components/DoctorFilters"
import DoctorCard from "../../components/DoctorCard"
import Pagination from "../../components/Pagination"
import SEO from "../../components/SEO"
import dbConnect from "../../lib/dbConnect"
import Doctor from "../../models/Doctor"

// Helper function to format specialty for display
function formatSpecialty(specialty) {
  return specialty
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Generate structured data for SEO
function generateStructuredData(doctors, specialty, baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `Apollo 247 - ${formatSpecialty(specialty)} Doctors`,
    description: `Find and consult with the best ${formatSpecialty(specialty)} doctors online or in-clinic.`,
    url: `${baseUrl}/specialties/${specialty}`,
    logo: `${baseUrl}/images/logo/apollo-247-logo.png`,
    medicalSpecialty: formatSpecialty(specialty),
    availableService: doctors.map((doctor) => ({
      "@type": "MedicalProcedure",
      name: "Medical Consultation",
      provider: {
        "@type": "Physician",
        name: doctor.name,
        medicalSpecialty: doctor.specialty,
        image: doctor.imageUrl,
      },
    })),
  }
}

export default function SpecialtyPage({ initialDoctors, pagination, specialty }) {
  const router = useRouter()
  const { query } = router
  const [doctors, setDoctors] = useState(initialDoctors)
  const [paginationData, setPaginationData] = useState(pagination)
  const [loading, setLoading] = useState(false)

  const formattedSpecialty = formatSpecialty(specialty)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://apollo247clone.vercel.app"
  const canonicalUrl = `${baseUrl}/specialties/${specialty}`

  // Generate structured data
  const structuredData = generateStructuredData(doctors, specialty, baseUrl)

  // Fetch doctors when query params change
  useEffect(() => {
    if (!router.isReady) return

    const fetchDoctors = async () => {
      setLoading(true)
      try {
        // Build query string from router query
        const queryParams = new URLSearchParams()
        Object.entries(query).forEach(([key, value]) => {
          if (value && key !== "specialty") {
            queryParams.append(key, value)
          }
        })
        queryParams.append("specialty", specialty)

        const res = await fetch(`/api/doctors?${queryParams.toString()}`)
        const data = await res.json()

        if (data.success) {
          setDoctors(data.data)
          setPaginationData(data.pagination)
        }
      } catch (error) {
        console.error("Error fetching doctors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [router.isReady, query, specialty])

  // Get current page from URL or default to 1
  const currentPage = Number.parseInt(query.page) || 1

  return (
    <>
      <SEO
        title={`${formattedSpecialty} Doctors | Apollo 247 Clone`}
        description={`Find and consult with the best ${formattedSpecialty} doctors online or in-clinic. Book appointments, view doctor profiles, and more.`}
        canonical={canonicalUrl}
        structuredData={structuredData}
        specialty={formattedSpecialty}
      />

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{formattedSpecialty}</h1>
          <p className="text-gray-600">Find experienced doctors and book appointments online</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="md:w-1/4">
            <DoctorFilters />
          </div>

          {/* Doctors listing */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <p className="text-gray-600">
                {paginationData.total} doctors found for {formattedSpecialty}
              </p>
            </div>

            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-8 flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
              </div>
            ) : doctors.length > 0 ? (
              <>
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ))}

                <Pagination currentPage={currentPage} totalPages={paginationData.pages} />
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-lg">No doctors found matching your criteria.</p>
                <p className="text-gray-600 mt-2">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

// Server-side rendering to fetch initial doctors
export async function getServerSideProps({ params, query }) {
  const { specialty } = params
  const page = query.page || 1
  const limit = query.limit || 10

  await dbConnect()

  // Build query
  const dbQuery = { specialty: formatSpecialty(specialty) }

  // Optional filters
  if (query.gender) dbQuery.gender = query.gender
  if (query.experience) dbQuery.experience = { $gte: Number.parseInt(query.experience) }
  if (query.availability) {
    if (query.availability === "online") dbQuery["availability.online"] = true
    if (query.availability === "clinic") dbQuery["availability.clinic"] = true
    if (query.availability === "hospital") dbQuery["availability.hospital"] = true
  }

  // Sorting
  const sortBy = query.sortBy || "rating"
  const sortOrder = query.sortOrder === "asc" ? 1 : -1
  const sort = {}
  sort[sortBy] = sortOrder

  // Pagination
  const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)

  try {
    // Execute query
    const doctors = await Doctor.find(dbQuery).sort(sort).skip(skip).limit(Number.parseInt(limit)).lean()

    // Get total count for pagination
    const total = await Doctor.countDocuments(dbQuery)

    return {
      props: {
        initialDoctors: JSON.parse(JSON.stringify(doctors)),
        pagination: {
          total,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          pages: Math.ceil(total / Number.parseInt(limit)),
        },
        specialty,
      },
    }
  } catch (error) {
    console.error("Error fetching initial doctors:", error)
    return {
      props: {
        initialDoctors: [],
        pagination: {
          total: 0,
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          pages: 0,
        },
        specialty,
      },
    }
  }
}
