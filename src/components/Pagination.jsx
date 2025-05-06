// filepath: c:\Users\aakas\Downloads\Redux\doc\doc3\onlineconsult\src\components\Pagination.jsx
"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { FaChevronLeft, FaChevronRight, FaEllipsisH } from "react-icons/fa"
import "./Pagination.css"

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Safely get initial page from URL
  const initialPage = () => {
    try {
      const page = parseInt(searchParams?.get('page') || currentPage.toString())
      return Math.min(Math.max(1, page), totalPages)
    } catch {
      return currentPage
    }
  }

  const [activePage, setActivePage] = useState(initialPage())

  const handlePageNavigation = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages))
    setActivePage(newPage)

    try {
      // Use the current pathname from the router
      const pathname = router.pathname || "/"; // Provide a default value

      // Create a new URLSearchParams object from the current search parameters
      const params = new URLSearchParams(searchParams?.toString()); // Use searchParams?.toString()

      // Set the new page number
      params.set('page', newPage.toString());

      // Construct the new URL
      const newUrl = `${pathname}?${params.toString()}`;

      // Push the new URL
      router.push(newUrl, { shallow: true });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }

  const renderPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (currentPage <= 4) {
        for (let i = 2; i <= Math.min(totalPages - 1, 4); i++) {
          pages.push(i)
        }
        if (totalPages > 5) pages.push(<FaEllipsisH key="ellipsis-1" />)
      } else if (currentPage >= totalPages - 3) {
        pages.push(<FaEllipsisH key="ellipsis-1" />)
        for (let i = Math.max(2, totalPages - 3); i < totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(<FaEllipsisH key="ellipsis-1" />)
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push(<FaEllipsisH key="ellipsis-2" />)
      }
      if (totalPages > 1) pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageNavigation(activePage - 1)}
        disabled={activePage === 1}
        className="pagination-button"
        aria-label="Previous page"
      >
        <FaChevronLeft />
      </button>

      {renderPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === 'number' ? (
            <button
              onClick={() => handlePageNavigation(page)}
              className={`pagination-button ${activePage === page ? 'active' : ''}`}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          ) : (
            <span className="pagination-ellipsis" key={index}>
              <FaEllipsisH />
            </span>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => handlePageNavigation(activePage + 1)}
        disabled={activePage === totalPages}
        className="pagination-button"
        aria-label="Next page"
      >
        <FaChevronRight />
      </button>
    </div>
  )
}

export default Pagination