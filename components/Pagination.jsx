"use client"

import { useRouter } from "next/router"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter()
  const { pathname, query } = router

  const handlePageChange = (pageNumber) => {
    router.push(
      {
        pathname,
        query: { ...query, page: pageNumber.toString() },
      },
      undefined,
      { shallow: true },
    )
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the beginning
      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, maxPagesToShow - 1)
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - maxPagesToShow + 2)
      }

      // Add ellipsis if needed at the beginning
      if (start > 2) {
        pages.push("...")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed at the end
      if (end < totalPages - 1) {
        pages.push("...")
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex justify-center items-center my-8">
      <button
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center h-10 w-10 rounded-md mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex space-x-2">
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="flex items-center justify-center h-10 px-4">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              className={`flex items-center justify-center h-10 w-10 rounded-md ${
                currentPage === page ? "bg-purple-600 text-white" : "bg-white hover:bg-gray-100"
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center h-10 w-10 rounded-md ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
