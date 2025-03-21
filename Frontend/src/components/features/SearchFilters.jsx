"use client"

import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { ChevronUp, ChevronDown } from "lucide-react"
import {
  setJobType,
  setLocation,
  setExperienceLevel,
  setSalaryRange,
  setDatePosted,
  clearFilters,
} from "../../store/slices/filterSlice"
import { useState } from "react"

function SearchFilters() {
  const filters = useSelector((state) => state.filters)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    workMode: true,
    experience: true,
    department: true,
    salary: true,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleFilterChange = (filterType, value) => {
    // Update URL with filter
    const searchParams = new URLSearchParams(location.search)
    if (value) {
      searchParams.set(filterType, value)
    } else {
      searchParams.delete(filterType)
    }

    navigate({
      pathname: "/search",
      search: searchParams.toString(),
    })

    // Update Redux state
    switch (filterType) {
      case "jobType":
        dispatch(setJobType(value))
        break
      case "location":
        dispatch(setLocation(value))
        break
      case "experienceLevel":
        dispatch(setExperienceLevel(value))
        break
      case "salaryRange":
        dispatch(setSalaryRange(value))
        break
      case "datePosted":
        dispatch(setDatePosted(value))
        break
      default:
        break
    }
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
    navigate("/search")
  }

  const handleApplyFilters = () => {
    // Refresh the page to apply all filters
    window.location.reload()
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden sticky top-20">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-medium text-lg">All Filters</h2>
        <span className="text-blue-600 text-sm">
          {Object.values(filters).filter(Boolean).length > 0 &&
            `Applied (${Object.values(filters).filter(Boolean).length})`}
        </span>
      </div>

      {/* Work Mode Filter */}
      <div className="border-b">
        <button
          className="w-full p-4 flex justify-between items-center text-left"
          onClick={() => toggleSection("workMode")}
        >
          <h3 className="font-medium">Work mode</h3>
          {expandedSections.workMode ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {expandedSections.workMode && (
          <div className="px-4 pb-4 space-y-2">
            <div className="flex items-center">
              <input
                id="work-office"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={filters.jobType === "fulltime"}
                onChange={(e) => handleFilterChange("jobType", e.target.checked ? "fulltime" : "")}
              />
              <label htmlFor="work-office" className="ml-2 block text-sm text-gray-700">
                Work from office (535)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="hybrid"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={filters.jobType === "hybrid"}
                onChange={(e) => handleFilterChange("jobType", e.target.checked ? "hybrid" : "")}
              />
              <label htmlFor="hybrid" className="ml-2 block text-sm text-gray-700">
                Hybrid (12)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="remote"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={filters.location === "remote"}
                onChange={(e) => handleFilterChange("location", e.target.checked ? "remote" : "")}
              />
              <label htmlFor="remote" className="ml-2 block text-sm text-gray-700">
                Remote (6)
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Experience Filter */}
      <div className="border-b">
        <button
          className="w-full p-4 flex justify-between items-center text-left"
          onClick={() => toggleSection("experience")}
        >
          <h3 className="font-medium">Experience</h3>
          {expandedSections.experience ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {expandedSections.experience && (
          <div className="px-4 pb-4">
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>0 Yrs</span>
                <span>30 Yrs</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div className="absolute left-0 h-2 w-1/4 bg-blue-600 rounded-full"></div>
                <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-4 w-4 bg-blue-600 rounded-full"></div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <input
                  id="entry-level"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={filters.experienceLevel === "entry"}
                  onChange={(e) => handleFilterChange("experienceLevel", e.target.checked ? "entry" : "")}
                />
                <label htmlFor="entry-level" className="ml-2 block text-sm text-gray-700">
                  0-2 Years
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="mid-level"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={filters.experienceLevel === "mid"}
                  onChange={(e) => handleFilterChange("experienceLevel", e.target.checked ? "mid" : "")}
                />
                <label htmlFor="mid-level" className="ml-2 block text-sm text-gray-700">
                  3-5 Years
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="senior-level"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={filters.experienceLevel === "senior"}
                  onChange={(e) => handleFilterChange("experienceLevel", e.target.checked ? "senior" : "")}
                />
                <label htmlFor="senior-level" className="ml-2 block text-sm text-gray-700">
                  6-10 Years
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="executive"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={filters.experienceLevel === "executive"}
                  onChange={(e) => handleFilterChange("experienceLevel", e.target.checked ? "executive" : "")}
                />
                <label htmlFor="executive" className="ml-2 block text-sm text-gray-700">
                  10+ Years
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Department Filter */}
      <div className="border-b">
        <button
          className="w-full p-4 flex justify-between items-center text-left"
          onClick={() => toggleSection("department")}
        >
          <h3 className="font-medium">Department</h3>
          {expandedSections.department ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {expandedSections.department && (
          <div className="px-4 pb-4 space-y-2">
            <div className="flex items-center">
              <input
                id="engineering"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="engineering" className="ml-2 block text-sm text-gray-700">
                Engineering - Software (546)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="it"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="it" className="ml-2 block text-sm text-gray-700">
                IT & Information Security (2)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="production"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="production" className="ml-2 block text-sm text-gray-700">
                Production, Manufacturing (2)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="healthcare"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="healthcare" className="ml-2 block text-sm text-gray-700">
                Healthcare & Life Sciences (2)
              </label>
            </div>
            <button className="text-blue-600 text-sm mt-2">View More</button>
          </div>
        )}
      </div>

      {/* Salary Filter */}
      <div className="border-b">
        <button
          className="w-full p-4 flex justify-between items-center text-left"
          onClick={() => toggleSection("salary")}
        >
          <h3 className="font-medium">Salary</h3>
          {expandedSections.salary ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {expandedSections.salary && (
          <div className="px-4 pb-4 space-y-2">
            <div className="flex items-center">
              <input
                id="salary-0-3"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={filters.salaryRange === "0-50000"}
                onChange={(e) => handleFilterChange("salaryRange", e.target.checked ? "0-50000" : "")}
              />
              <label htmlFor="salary-0-3" className="ml-2 block text-sm text-gray-700">
                0-3 Lakhs (304)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="salary-3-6"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={filters.salaryRange === "50000-100000"}
                onChange={(e) => handleFilterChange("salaryRange", e.target.checked ? "50000-100000" : "")}
              />
              <label htmlFor="salary-3-6" className="ml-2 block text-sm text-gray-700">
                3-6 Lakhs (66)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="salary-6-10"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={filters.salaryRange === "100000-150000"}
                onChange={(e) => handleFilterChange("salaryRange", e.target.checked ? "100000-150000" : "")}
              />
              <label htmlFor="salary-6-10" className="ml-2 block text-sm text-gray-700">
                6-10 Lakhs (30)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="salary-10-15"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={filters.salaryRange === "150000+"}
                onChange={(e) => handleFilterChange("salaryRange", e.target.checked ? "150000+" : "")}
              />
              <label htmlFor="salary-10-15" className="ml-2 block text-sm text-gray-700">
                10-15 Lakhs (8)
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 flex gap-2">
        <button
          onClick={handleClearFilters}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Clear All
        </button>
        <button
          onClick={handleApplyFilters}
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Apply
        </button>
      </div>
    </div>
  )
}

export default SearchFilters

