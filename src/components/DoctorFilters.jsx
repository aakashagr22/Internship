// filepath: c:\Users\aakas\Downloads\Redux\doc\doc3\onlineconsult\src\components\DoctorFilters.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./DoctorFilters.css";

const DoctorFilters = ({ onFilterChange }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Safely get search params with defaults
  const getSafeParam = useCallback((param) => {
    try {
      return searchParams?.get(param) || "";
    } catch {
      return "";
    }
  }, [searchParams]);

  const [filters, setFilters] = useState({
    specialty: getSafeParam("specialty") || "general-physician-internal-medicine",
    gender: getSafeParam("gender"),
    experience: getSafeParam("experience"),
    availability: getSafeParam("availability"),
    sortBy: getSafeParam("sortBy") || "rating",
    sortOrder: getSafeParam("sortOrder") || "desc",
  });

  const [activeSections, setActiveSections] = useState({
    specialty: true,
    gender: false,
    experience: false,
    availability: false,
    sort: false,
  });

  const toggleSection = (section) => {
    setActiveSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    onFilterChange?.(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [key]: value
      };
  
      // Safely construct the URL
      try {
        // Get current pathname safely (use window.location if router.pathname is undefined)
        const pathname = window.location.pathname || "/specialties/general-physician-internal-medicine";
        
        // Create URLSearchParams from the new filters
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([k, v]) => {
          if (v !== undefined && v !== null && v !== "") {
            params.set(k, v);
          }
        });
  
        // Construct the new URL
        const newUrl = `${pathname}?${params.toString()}`;
        
        // Validate URL before navigation
        if (typeof newUrl === 'string' && newUrl.length > 0) {
          router.push(newUrl, { scroll: false, shallow: true });
        } else {
          console.error('Invalid URL generated:', newUrl);
        }
      } catch (error) {
        console.error("Navigation error:", error);
      }
  
      return newFilters;
    });
  }, [router]);
  return (
    <div className="doctor-filters">
      <div className="filter-header">
        <FaFilter className="filter-icon" />
        <h3>Filters</h3>
      </div>

      {/* Specialty Filter */}
      <div className="filter-section">
        <div
          className="filter-section-header"
          onClick={() => toggleSection("specialty")}
          aria-expanded={activeSections.specialty}
        >
          <h4>Specialty</h4>
          {activeSections.specialty ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {activeSections.specialty && (
          <div className="filter-options">
            <select
              value={filters.specialty}
              onChange={(e) => handleFilterChange("specialty", e.target.value)}
              aria-label="Select doctor specialty"
            >
              <option value="general-physician-internal-medicine">General Physician</option>
              <option value="cardiologist">Cardiologist</option>
              <option value="dermatologist">Dermatologist</option>
              <option value="pediatrician">Pediatrician</option>
            </select>
          </div>
        )}
      </div>

      {/* Gender Filter */}
      <div className="filter-section">
        <div
          className="filter-section-header"
          onClick={() => toggleSection("gender")}
          aria-expanded={activeSections.gender}
        >
          <h4>Gender</h4>
          {activeSections.gender ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {activeSections.gender && (
          <div className="filter-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={filters.gender === "male"}
                onChange={() => handleFilterChange("gender", "male")}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={filters.gender === "female"}
                onChange={() => handleFilterChange("gender", "female")}
              />
              Female
            </label>
            <button
              className="clear-filter"
              onClick={() => handleFilterChange("gender", "")}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Experience Filter */}
      <div className="filter-section">
        <div
          className="filter-section-header"
          onClick={() => toggleSection("experience")}
          aria-expanded={activeSections.experience}
        >
          <h4>Experience</h4>
          {activeSections.experience ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {activeSections.experience && (
          <div className="filter-options">
            <select
              value={filters.experience || ""}
              onChange={(e) => handleFilterChange("experience", e.target.value)}
              aria-label="Select doctor experience"
            >
              <option value="">Any</option>
              <option value="5">5+ years</option>
              <option value="10">10+ years</option>
              <option value="15">15+ years</option>
              <option value="20">20+ years</option>
            </select>
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="filter-section">
        <div
          className="filter-section-header"
          onClick={() => toggleSection("availability")}
          aria-expanded={activeSections.availability}
        >
          <h4>Availability</h4>
          {activeSections.availability ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {activeSections.availability && (
          <div className="filter-options">
            <label>
              <input
                type="checkbox"
                checked={filters.availability === "today"}
                onChange={() =>
                  handleFilterChange("availability", filters.availability === "today" ? "" : "today")
                }
              />
              Available Today
            </label>
          </div>
        )}
      </div>

      {/* Sort Options */}
      <div className="filter-section">
        <div
          className="filter-section-header"
          onClick={() => toggleSection("sort")}
          aria-expanded={activeSections.sort}
        >
          <h4>Sort By</h4>
          {activeSections.sort ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {activeSections.sort && (
          <div className="filter-options">
            <div className="sort-option">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                aria-label="Select sort criteria"
              >
                <option value="rating">Rating</option>
                <option value="experience">Experience</option>
                <option value="price">Price</option>
              </select>
            </div>
            <div className="sort-order">
              <label>
                <input
                  type="radio"
                  name="sortOrder"
                  checked={filters.sortOrder === "asc"}
                  onChange={() => handleFilterChange("sortOrder", "asc")}
                />
                Ascending
              </label>
              <label>
                <input
                  type="radio"
                  name="sortOrder"
                  checked={filters.sortOrder === "desc"}
                  onChange={() => handleFilterChange("sortOrder", "desc")}
                />
                Descending
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorFilters;