
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Link } from "react-router-dom"
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa"
import "./Header.css"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <Image src="/images/apollo247.jpg" alt="Apollo 247" className="logo-img" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
            <Link to="/specialties/general-physician-internal-medicine" className="nav-link">
              Doctors
            </Link>
            <Link to="#" className="nav-link">
              Pharmacy
            </Link>
            <Link to="#" className="nav-link">
              Lab Tests
            </Link>
            <Link to="#" className="nav-link">
              Health Records
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="header-icons">
            <button className="icon-btn">
              <FaSearch />
            </button>
            <button className="icon-btn">
              <FaShoppingCart />
            </button>
            <button className="icon-btn">
              <FaUser />
            </button>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <FaBars />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
