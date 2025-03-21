"use client"

import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Bookmark, User, Briefcase, MapPin, Clock, DollarSign, Calendar } from "lucide-react"
import {
  setJobType,
  setLocation,
  setExperienceLevel,
  setSalaryRange,
  setDatePosted,
  clearFilters,
} from "../../store/slices/filterSlice"

function Sidebar() {
  const filters = useSelector((state) => state.filters)
  const savedJobs = useSelector((state) => state.jobs.savedJobs)
  const dispatch = useDispatch()

  const handleJobTypeChange = (e) => {
    dispatch(setJobType(e.target.value))
  }

  const handleLocationChange = (e) => {
    dispatch(setLocation(e.target.value))
  }

  const handleExperienceChange = (e) => {
    dispatch(setExperienceLevel(e.target.value))
  }

  const handleSalaryChange = (e) => {
    dispatch(setSalaryRange(e.target.value))
  }

  const handleDatePostedChange = (e) => {
    dispatch(setDatePosted(e.target.value))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden sticky top-20">
      {/* User Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium">Omkar Khoche</h3>
            <p className="text-sm text-gray-500">Software Engineer</p>
          </div>
        </div>
        <Link to="/profile" className="mt-3 block text-sm text-blue-600 hover:text-blue-800">
          View profile
        </Link>
      </div>

      {/* Saved Jobs Section */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium flex items-center">
            <Bookmark className="h-4 w-4 mr-2" />
            Saved Jobs
          </h3>
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{savedJobs.length}</span>
        </div>
        <Link to="/saved" className="mt-2 block text-sm text-blue-600 hover:text-blue-800">
          View all saved jobs
        </Link>
      </div>

      {/* Filters Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Filters</h3>
          <button onClick={handleClearFilters} className="text-xs text-blue-600 hover:text-blue-800">
            Clear all
          </button>
        </div>

        {/* Job Type Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Briefcase className="h-4 w-4 mr-1" /> Job Type
          </label>
          <select
            value={filters.jobType}
            onChange={handleJobTypeChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">All Types</option>
            <option value="fulltime">Full-time</option>
            <option value="parttime">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        {/* Location Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <MapPin className="h-4 w-4 mr-1" /> Location
          </label>
          <select
            value={filters.location}
            onChange={handleLocationChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">All Locations</option>
            <option value="remote">Remote</option>
            <option value="new york">New York</option>
            <option value="san francisco">San Francisco</option>
            <option value="london">London</option>
            <option value="berlin">Berlin</option>
          </select>
        </div>

        {/* Experience Level Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Clock className="h-4 w-4 mr-1" /> Experience Level
          </label>
          <select
            value={filters.experienceLevel}
            onChange={handleExperienceChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">All Levels</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
            <option value="executive">Executive</option>
          </select>
        </div>

        {/* Salary Range Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <DollarSign className="h-4 w-4 mr-1" /> Salary Range
          </label>
          <select
            value={filters.salaryRange}
            onChange={handleSalaryChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">All Ranges</option>
            <option value="0-50000">$0 - $50,000</option>
            <option value="50000-100000">$50,000 - $100,000</option>
            <option value="100000-150000">$100,000 - $150,000</option>
            <option value="150000+">$150,000+</option>
          </select>
        </div>

        {/* Date Posted Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Calendar className="h-4 w-4 mr-1" /> Date Posted
          </label>
          <select
            value={filters.datePosted}
            onChange={handleDatePostedChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Any Time</option>
            <option value="today">Today</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
          </select>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}

export default Sidebar

