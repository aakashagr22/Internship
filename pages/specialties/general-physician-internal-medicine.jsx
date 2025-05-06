"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import DoctorFilters from "@/components/DoctorFilters"
import DoctorCard from "@/components/DoctorCard"
import Pagination from "@/components/Pagination"
import { mockFetchDoctors } from "@/lib/mockData"
import Head from "next/head"

export default function DoctorsListingPage() {
  const router = useRouter()
  const { query } = router
  const [doctors, setDoctors] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(true)

  // Get current page from URL or default to 1
  const currentPage = Number.parseInt(query.page) || 1

  useEffect(() => {
    if (!router.isReady) return

    // Fetch doctors data
    const result = mockFetchDoctors({
      page: currentPage,
      limit: 10,
      gender: query.gender,
      experience: query.experience,
      availability: query.availability,
      sortBy: query.sortBy || "rating",
      sortOrder: query.sortOrder || "desc",
    })

    setDoctors(result.doctors)
    setPagination(result.pagination)
    setLoading(false)
  }, [router.isReady, query, currentPage])

  return (
    <>
      <Head>
        <title>General Physician & Internal Medicine Doctors | Apollo 247 Clone</title>
        <meta
          name="description"
          content="Find the best General Physicians and Internal Medicine specialists. Book appointments online for consultations with experienced doctors."
        />
        <meta
          name="keywords"
          content="general physician, internal medicine, doctor appointment, online consultation, Apollo 247"
        />
      </Head>

      <main>
        <Header />

        <div className="container py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">General Physician & Internal Medicine</h1>
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
                  {pagination.total} doctors found for General Physician & Internal Medicine
                </p>
              </div>

              {loading ? (
                <div className="bg-white rounded-lg shadow-md p-8 flex justify-center items-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
                </div>
              ) : doctors.length > 0 ? (
                <>
                  {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}

                  <Pagination currentPage={currentPage} totalPages={pagination.totalPages} />
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-lg">No doctors found matching your criteria.</p>
                  <p className="text-gray-600 mt-2">Try adjusting your filters to see more results.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
