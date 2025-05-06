"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";


export default function DoctorFilters() {
  const router = useRouter();
  const { query } = router;

  const [filters, setFilters] = useState({
    specialty: query.specialty || "general-physician-internal-medicine",
    gender: query.gender || "",
    experience: query.experience || "",
    availability: query.availability || "",
    sortBy: query.sortBy || "rating",
    sortOrder: query.sortOrder || "desc",
  });

  const [expanded, setExpanded] = useState({
    gender: true,
    experience: true,
    availability: true,
    sortBy: true,
  });

  const toggleSection = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value,
    };
    setFilters(newFilters);

    // Create new query params
    const params = new URLSearchParams();

    // Add all non-empty filters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    // Set page to 1 when filters change
    params.set("page", "1");

    // Update the URL
    router.push(
      {
        pathname: router.pathname,
        query: Object.fromEntries(params),
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (!router.isReady) return;

    setFilters({
      specialty: query.specialty || "general-physician-internal-medicine",
      gender: query.gender || "",
      experience: query.experience || "",
      availability: query.availability || "",
      sortBy: query.sortBy || "rating",
      sortOrder: query.sortOrder || "desc",
    });
  }, [router.isReady, query]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h2>
      </div>

      {/* Gender Filter */}
      <div className="mb-4 border-b pb-2">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("gender")}
        >
          <h3 className="font-medium">Gender</h3>
          {expanded.gender ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {expanded.gender && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value=""
                checked={filters.gender === ""}
                onChange={() => handleFilterChange("gender", "")}
                className="mr-2"
              />
              All
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={filters.gender === "Male"}
                onChange={() => handleFilterChange("gender", "Male")}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={filters.gender === "Female"}
                onChange={() => handleFilterChange("gender", "Female")}
                className="mr-2"
              />
              Female
            </label>
          </div>
        )}
      </div>

      {/* Experience Filter */}
      <div className="mb-4 border-b pb-2">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("experience")}
        >
          <h3 className="font-medium">Experience</h3>
          {expanded.experience ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {expanded.experience && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="experience"
                value=""
                checked={filters.experience === ""}
                onChange={() => handleFilterChange("experience", "")}
                className="mr-2"
              />
              All
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="experience"
                value="5"
                checked={filters.experience === "5"}
                onChange={() => handleFilterChange("experience", "5")}
                className="mr-2"
              />
              5+ Years
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="experience"
                value="10"
                checked={filters.experience === "10"}
                onChange={() => handleFilterChange("experience", "10")}
                className="mr-2"
              />
              10+ Years
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="experience"
                value="15"
                checked={filters.experience === "15"}
                onChange={() => handleFilterChange("experience", "15")}
                className="mr-2"
              />
              15+ Years
            </label>
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="mb-4 border-b pb-2">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("availability")}
        >
          <h3 className="font-medium">Availability</h3>
          {expanded.availability ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {expanded.availability && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                value=""
                checked={filters.availability === ""}
                onChange={() => handleFilterChange("availability", "")}
                className="mr-2"
              />
              All
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                value="online"
                checked={filters.availability === "online"}
                onChange={() => handleFilterChange("availability", "online")}
                className="mr-2"
              />
              Online Consultation
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                value="clinic"
                checked={filters.availability === "clinic"}
                onChange={() => handleFilterChange("availability", "clinic")}
                className="mr-2"
              />
              Clinic Visit
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                value="hospital"
                checked={filters.availability === "hospital"}
                onChange={() => handleFilterChange("availability", "hospital")}
                className="mr-2"
              />
              Hospital Visit
            </label>
          </div>
        )}
      </div>

      {/* Sort By Filter */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("sortBy")}
        >
          <h3 className="font-medium">Sort By</h3>
          {expanded.sortBy ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {expanded.sortBy && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="sortBy"
                value="rating"
                checked={filters.sortBy === "rating"}
                onChange={() => handleFilterChange("sortBy", "rating")}
                className="mr-2"
              />
              Rating
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sortBy"
                value="experience"
                checked={filters.sortBy === "experience"}
                onChange={() => handleFilterChange("sortBy", "experience")}
                className="mr-2"
              />
              Experience
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sortBy"
                value="consultationFee"
                checked={filters.sortBy === "consultationFee"}
                onChange={() => handleFilterChange("sortBy", "consultationFee")}
                className="mr-2"
              />
              Consultation Fee
            </label>
          </div>
        )}
      </div>
    </div>
  );
}