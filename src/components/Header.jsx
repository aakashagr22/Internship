// filepath: c:\Users\aakas\Downloads\Redux\doc\doc3\onlineconsult\src\components\Header.jsx
"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa"
import "./Header.css"
import { ROUTES } from "@/constants/routes" // Import the ROUTES constant

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleNavigation = (path) => {
    try {
      if (typeof path === 'string' && path.length > 0) {
        router.push(path)
        setMobileMenuOpen(false)
      } else {
        console.error('Invalid navigation path:', path)
      }
    } catch (error) {
      console.error("Navigation error:", error)
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link href="/" passHref legacyBehavior>
              <a>
                <Image
                  src="/images/apollo247.jpg"
                  alt="Apollo 247"
                  width={120}
                  height={40}
                  className="logo-img"
                />
              </a>
            </Link>
          </div>

          {/* Navigation */}
          <nav className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
            <button
              className="nav-link"
              onClick={() => handleNavigation(ROUTES.DOCTORS)} // Use ROUTES.DOCTORS
            >
              Doctors
            </button>
            <button
              className="nav-link"
              onClick={() => handleNavigation(ROUTES.PHARMACY)} // Use ROUTES.PHARMACY
            >
              Pharmacy
            </button>
            <button
              className="nav-link"
              onClick={() => handleNavigation(ROUTES.LAB_TESTS)} // Use ROUTES.LAB_TESTS
            >
              Lab Tests
            </button>
            <button
              className="nav-link"
              onClick={() => handleNavigation(ROUTES.HEALTH_RECORDS)} // Use ROUTES.HEALTH_RECORDS
            >
              Health Records
            </button>
          </nav>

          {/* Right side icons */}
          <div className="header-icons">
            <button
              className="icon-btn"
              aria-label="Search"
              onClick={() => handleNavigation(ROUTES.SEARCH)} // Use ROUTES.SEARCH
            >
              <FaSearch />
            </button>
            <button
              className="icon-btn"
              aria-label="Cart"
              onClick={() => handleNavigation(ROUTES.CART)} // Use ROUTES.CART
            >
              <FaShoppingCart />
            </button>
            <button
              className="icon-btn"
              aria-label="User Account"
              onClick={() => handleNavigation(ROUTES.ACCOUNT)} // Use ROUTES.ACCOUNT
            >
              <FaUser />
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header