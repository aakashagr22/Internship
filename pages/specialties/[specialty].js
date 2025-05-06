// filepath: c:\Users\aakas\Downloads\Redux\doc\doc3\onlineconsult\pages\specialties\[specialty].js
"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "../../components/Header"
import DoctorFilters from "../../components/DoctorFilters"
import DoctorCard from "../../components/DoctorCard"
import Pagination from "../../components/Pagination"
import SEO from "../../components/SEO"
import { fetchDoctors } from "../../services/doctorService" // New service import
import { formatSpecialty, generateStructuredData } from "../../utils/specialtyUtils" // Extracted helpers

export default function SpecialtyPage({ initialDoctors, pagination, specialty }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [doctors, setDoctors] = useState([])
  const [paginationData, setPaginationData] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const currentPage = Number.parseInt(searchParams.get('page')) || 1
  const specialtyName = specialty || "General Physician & Internal Medicine" // Provide a default

  const fetchDoctorData = useCallback(async () => {
    if (!router.isReady) return

    try {
      setLoading(true)
      setError(null)

      const queryParams = {
        specialty: specialtyName,
        page: currentPage,
        limit: 10,
        gender: searchParams.get('gender') || '',
        experience: searchParams.get('experience') || '',
        availability: searchParams.get('availability') || '',
        sortBy: searchParams.get('sortBy') || "rating",
        sortOrder: searchParams.get('sortOrder') || "desc",
      }

      const { data, pagination } = await fetchDoctors(queryParams)

      setDoctors(data)
      setPaginationData(pagination)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching doctors:", err)
    } finally {
      setLoading(false)
    }
  }, [router.isReady, searchParams, currentPage, specialtyName])

  useEffect(() => {
    fetchDoctorData()
  }, [fetchDoctorData])

  const handlePageChange = useCallback((page) => {
    // Safely get the current pathname
    const pathname = router.pathname || `/specialties/${specialtyName.toLowerCase().replace(/ /g, '-')}`;

    // Create a new URLSearchParams object from the current search parameters
    const params = new URLSearchParams(searchParams?.toString());

    // Set the new page number
    params.set('page', page.toString());

    // Construct the new URL
    const newUrl = `${pathname}?${params.toString()}`;

    // Push the new URL
    router.push(newUrl, { shallow: true });
  }, [router, searchParams, specialtyName]);

  const handleFilterChange = useCallback((newFilters) => {
    // Safely get the current pathname
    const pathname = router.pathname || `/specialties/${specialtyName.toLowerCase().replace(/ /g, '-')}`;

    // Create a new URLSearchParams object
    const params = new URLSearchParams();

    // Add the new filters
    for (const key in newFilters) {
      if (newFilters[key]) {
        params.set(key, newFilters[key]);
      }
    }

    // Reset the page number
    params.set('page', '1');

    // Construct the new URL
    const newUrl = `${pathname}?${params.toString()}`;

    // Push the new URL
    router.push(newUrl, { shallow: true });
  }, [router, specialtyName]);

  return (
    <>
      <SEO
        title={`${formatSpecialty(specialtyName)} Doctors | Apollo 247 Clone`}
        description={`Book appointments with top ${formatSpecialty(specialtyName)} specialists. Find experienced doctors near you.`}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/specialties/${specialtyName.toLowerCase().replace(/ /g, '-')}`}
        specialty={specialtyName}
      />

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{formatSpecialty(specialtyName)}</h1>
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
                      totalPages={paginationData.totalPages}
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

// Server-side rendering remains the same
export async function getServerSideProps({ params, query }) {
  const { specialty } = params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/doctors`;

    const queryParams = {
      specialty,
      page: query.page || 1,
      limit: query.limit || 10,
      gender: query.gender || '',
      experience: query.experience || '',
      availability: query.availability || '',
      sortBy: query.sortBy || "rating",
      sortOrder: query.sortOrder || "desc",
    };

    const response = await fetch(`${apiUrl}?${new URLSearchParams(queryParams)}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch doctors: ${response.status} ${response.statusText}`);
    }

    const { data, pagination } = await response.json();

    return {
      props: {
        initialDoctors: data,
        pagination,
        specialty,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        initialDoctors: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        },
        specialty,
      },
    };
  }
}