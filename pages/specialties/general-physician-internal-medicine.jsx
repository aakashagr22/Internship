// filepath: c:\Users\aakas\Downloads\Redux\doc\doc3\onlineconsult\pages\specialties\general-physician-internal-medicine.jsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import DoctorFilters from "@/components/DoctorFilters"
import DoctorCard from "@/components/DoctorCard"
import Pagination from "@/components/Pagination"
import { mockFetchDoctors } from "@/lib/mockData"
import SEO from "@/components/SEO"

export default function DoctorsListingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [doctors, setDoctors] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const currentPage = Number.parseInt(searchParams.get('page')) || 1
  const specialty = "General Physician & Internal Medicine"

  const fetchDoctorData = useCallback(async () => {
    if (!router.isReady) return

    try {
      setLoading(true)
      setError(null)

      // In a real app, you would fetch from your API:
      // const response = await fetch(`/api/doctors?${new URLSearchParams(query)}`)
      // const data = await response.json()

      // Using mock data for now
      const result = mockFetchDoctors({
        page: currentPage,
        limit: 10,
        gender: searchParams.get('gender'),
        experience: searchParams.get('experience'),
        availability: searchParams.get('availability'),
        sortBy: searchParams.get('sortBy') || "rating",
        sortOrder: searchParams.get('sortOrder') || "desc",
        specialty // Pass specialty to mock fetch
      })

      setDoctors(result.doctors)
      setPagination(result.pagination)
    } catch (err) {
      setError("Failed to load doctors. Please try again later.")
      console.error("Error fetching doctors:", err)
    } finally {
      setLoading(false)
    }
  }, [router.isReady, searchParams, currentPage])

  useEffect(() => {
    fetchDoctorData()
  }, [fetchDoctorData])

  const handlePageChange = useCallback((page) => {
    const newQuery = new URLSearchParams(searchParams.toString())
    newQuery.set('page', page.toString())
    router.push(`${router.pathname}?${newQuery.toString()}`, { shallow: true })
  }, [router, searchParams])

  const handleFilterChange = useCallback((newFilters) => {
    const newQuery = new URLSearchParams()
    for (const key in newFilters) {
      if (newFilters[key]) {
        newQuery.set(key, newFilters[key])
      }
    }
    newQuery.set('page', '1') // Reset to page 1 when filters change
    router.push(`${router.pathname}?${newQuery.toString()}`, { shallow: true })
  }, [router])

  return (
    <>
      <SEO
        title={`${specialty} Doctors | Apollo 247 Clone`}
        description={`Book appointments with top ${specialty} specialists. Find experienced doctors near you.`}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/specialties/general-physician-internal-medicine`}
        specialty={specialty}
      />

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{specialty}</h1>
          <p className="text-lg text-gray-600 mt-2">
            Find and book appointments with qualified specialists
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <DoctorFilters onFilterChange={handleFilterChange} />
          </div>

          <div className="lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline">{error}</span>
              </div>
            ) : (
              <>
                {doctors.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No doctors found</h3>
                    <p className="mt-1 text-gray-500">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </div>
                ) : (
                  <>
                    {doctors.map((doctor) => (
                      <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={pagination.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}