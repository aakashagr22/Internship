"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa"
import "./DoctorFilters.css"

const DoctorFilters = ({ onFilterChange }) => {
  const [searchParams] = useSearchParams()

  const [filters, setFilters] = useState({
    specialty: searchParams.get("specialty") || "general-physician-internal-medicine",
    gender: searchParams.get("gender") || "",
    experience: searchParams.get("experience") || "",
    availability: searchParams.get("availability") || "",
    sortBy: searchParams.get("sortBy") || "rating",
    sortOrder: searchParams.get("sortOrder") || "desc",
  })

  const [expanded, setExpanded] = useState({
    gender: true,
    experience: true,
    availability: true,
    sortBy: true,
  })

  const toggleSection = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  return (
    <div className="filters-container">
      <div className="filters-header">
        <h2 className="filters-title">
          <FaFilter className="filters-icon" />
          Filters
        </h2>
      </div>

      {/* Gender Filter */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("gender")}>
          <h3 className="filter-title">Gender</h3>
          {expanded.gender ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {expanded.gender && (
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="gender"
                value=""
                checked={filters.gender === ""}
                onChange={() => handleFilterChange("gender", "")}
              />
              All
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={filters.gender === "Male"}
                onChange={() => handleFilterChange("gender", "Male")}
              />
              Male
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={filters.gender === "Female"}
                onChange={() => handleFilterChange("gender", "Female")}
              />
              Female
            </label>
          </div>
        )}
      </div>

      {/* Experience Filter */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("experience")}>
          <h3 className="filter-title">Experience</h3>
          {expanded.experience ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {expanded.experience && (
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="experience"
                value=""
                checked={filters.experience === ""}
                onChange={() => handleFilterChange("experience", "")}
              />
              All
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="experience"
                value="5"
                checked={filters.experience === "5"}
                onChange={() => handleFilterChange("experience", "5")}
              />
              5+ Years
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="experience"
                value="10"
                checked={filters.experience === "10"}
                onChange={() => handleFilterChange("experience", "10")}
              />
              10+ Years
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="experience"
                value="15"
                checked={filters.experience === "15"}
                onChange={() => handleFilterChange("experience", "15")}
              />
              15+ Years
            </label>
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("availability")}>
          <h3 className="filter-title">Availability</h3>
          {expanded.availability ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {expanded.availability && (
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="availability"
                value=""
                checked={filters.availability === ""}
                onChange={() => handleFilterChange("availability", "")}
              />
              All
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="availability"
                value="online"
                checked={filters.availability === "online"}
                onChange={() => handleFilterChange("availability", "online")}
              />
              Online Consultation
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="availability"
                value="clinic"
                checked={filters.availability === "clinic"}
                onChange={() => handleFilterChange("availability", "clinic")}
              />
              Clinic Visit
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="availability"
                value="hospital"
                checked={filters.availability === "hospital"}
                onChange={() => handleFilterChange("availability", "hospital")}
              />
              Hospital Visit
            </label>
          </div>
        )}
      </div>

      {/* Sort By Filter */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("sortBy")}>
          <h3 className="filter-title">Sort By</h3>
          {expanded.sortBy ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {expanded.sortBy && (
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="sortBy"
                value="rating"
                checked={filters.sortBy === "rating"}
                onChange={() => handleFilterChange("sortBy", "rating")}
              />
              Rating
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="sortBy"
                value="experience"
                checked={filters.sortBy === "experience"}
                onChange={() => handleFilterChange("sortBy", "experience")}
              />
              Experience
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="sortBy"
                value="consultationFee"
                checked={filters.sortBy === "consultationFee"}
                onChange={() => handleFilterChange("sortBy", "consultationFee")}
              />
              Consultation Fee
            </label>
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorFilters
