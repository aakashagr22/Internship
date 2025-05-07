'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import DoctorFilters from '@/components/DoctorFilters'
import DoctorCard from '@/components/DoctorCard'
import Pagination from '@/components/Pagination'
import SEO from '@/components/SEO'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorDisplay from '@/components/ErrorDisplay'
import EmptyState from '@/components/EmptyState'
import { fetchDoctors } from '@/services/doctorService'

export default function SpecialtyPage({ params }) {
  const searchParams = useSearchParams()
  const { specialty } = params

  // State management
  const [data, setData] = useState({
    doctors: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0
    }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Memoized derived values
  const currentPage = useMemo(() => {
    const page = Number(searchParams.get('page'))
    return isNaN(page) || page < 1 ? 1 : page
  }, [searchParams])

  const formattedSpecialty = useMemo(() => {
    return specialty
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/ and /gi, ' & ')
  }, [specialty])

  // Data fetching
  const fetchDoctorData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await fetchDoctors({
        specialty,
        page: currentPage,
        limit: 10,
        gender: searchParams.get('gender'),
        experience: searchParams.get('experience'),
        availability: searchParams.get('availability'),
        sortBy: searchParams.get('sortBy') || 'rating',
        sortOrder: searchParams.get('sortOrder') || 'desc'
      })

      setData({
        doctors: result.doctors,
        pagination: result.pagination
      })
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err.message || 'Failed to load doctors')
    } finally {
      setLoading(false)
    }
  }, [specialty, currentPage, searchParams])

  useEffect(() => {
    fetchDoctorData()
  }, [fetchDoctorData])

  // Event handlers
  const updateQueryParams = useCallback((newParams) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
      else params.delete(key)
    })

    window.history.pushState(null, '', `?${params.toString()}`)
    fetchDoctorData()
  }, [searchParams, fetchDoctorData])

  const handlePageChange = (page) => {
    updateQueryParams({ page })
  }

  const handleFilterChange = (filters) => {
    updateQueryParams({ ...filters, page: '1' })
  }

  // Render
  return (
    <>
      <SEO
        title={`${formattedSpecialty} Doctors`}
        description={`Book ${formattedSpecialty} specialists near you`}
        canonical={`/specialties/${specialty}`}
      />
      
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{formattedSpecialty}</h1>
          <p className="text-lg text-gray-600 mt-2">
            Book appointments with qualified specialists
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <DoctorFilters 
              onFilterChange={handleFilterChange}
              initialValues={{
                gender: searchParams.get('gender'),
                experience: searchParams.get('experience'),
                availability: searchParams.get('availability'),
                sortBy: searchParams.get('sortBy'),
                sortOrder: searchParams.get('sortOrder')
              }}
            />
          </aside>

          <section className="lg:w-3/4">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorDisplay error={error} onRetry={fetchDoctorData} />
            ) : data.doctors.length === 0 ? (
              <EmptyState 
                title="No doctors found"
                message="Try adjusting your filters"
              />
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {data.doctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
                
                <Pagination
                  currentPage={currentPage}
                  totalPages={data.pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </section>
        </div>
      </main>
    </>
  )
}