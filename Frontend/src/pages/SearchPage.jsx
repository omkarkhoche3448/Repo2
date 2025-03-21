import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { setSearchTerm, setSortBy } from "../store/slices/filterSlice"
import JobList from "../components/features/JobList"
import SearchFilters from "../components/features/SearchFilters"

function SearchPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { jobs, loading } = useSelector((state) => state.jobs)
  const filters = useSelector((state) => state.filters)
  
  const [searchInput, setSearchInput] = useState("")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  
  // Parse search params from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const query = searchParams.get("q") || ""
    
    if (query && query !== filters.searchTerm) {
      dispatch(setSearchTerm(query))
    }
    
    setSearchInput(query)
  }, [location.search, dispatch, filters.searchTerm])
  
  const handleSearch = (e) => {
    e.preventDefault()
    
    // Update URL with search query
    const searchParams = new URLSearchParams(location.search)
    if (searchInput) {
      searchParams.set("q", searchInput)
    } else {
      searchParams.delete("q")
    }
    
    navigate({
      pathname: "/search",
      search: searchParams.toString()
    })
    
    dispatch(setSearchTerm(searchInput))
  }
  
  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value))
  }
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Mobile Filters Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <span className="font-medium">Filters</span>
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>
      
      {/* Filters Sidebar - Hidden on mobile unless toggled */}
      <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
        <SearchFilters />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search job title, company, or keywords..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>
          
          {/* Search Results Info & Sort */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="text-sm text-gray-500">
              {loading ? (
                "Searching..."
              ) : (
                <>
                  {jobs.length > 0 ? (
                    <>
                      <span className="font-medium">1-{Math.min(20, jobs.length)}</span> of{" "}
                      <span className="font-medium">{jobs.length}</span> {filters.searchTerm ? `results for "${filters.searchTerm}"` : "jobs"}
                    </>
                  ) : (
                    "No results found"
                  )}
                </>
              )}
            </div>
            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="sort"
                  name="sort"
                  className="block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none"
                  onChange={handleSortChange}
                  value={filters.sortBy}
                >
                  <option value="relevance">Relevance</option>
                  <option value="date">Most Recent</option>
                  <option value="salary-high">Salary (High to Low)</option>
                  <option value="salary-low">Salary (Low to High)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Applied Filters */}
        {Object.values(filters).some(value => value && value !== "relevance") && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Applied Filters</h3>
              <button 
                className="text-xs text-blue-600 hover:text-blue-800"
                onClick={() => navigate("/search")}
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.searchTerm && (
                <FilterBadge label={`Search: ${filters.searchTerm}`} />
              )}
              {filters.jobType && (
                <FilterBadge label={`Job Type: ${filters.jobType}`} />
              )}
              {filters.location && (
                <FilterBadge label={`Location: ${filters.location}`} />
              )}
              {filters.experienceLevel && (
                <FilterBadge label={`Experience: ${filters.experienceLevel}`} />
              )}
              {filters.salaryRange && (
                <FilterBadge label={`Salary: ${filters.salaryRange}`} />
              )}
              {filters.datePosted && (
                <FilterBadge label={`Posted: ${filters.datePosted}`} />
              )}
            </div>
          </div>
        )}
        
        {/* Job Listings */}
        <JobList />
      </div>
    </div>
  )
}

function FilterBadge({ label }) {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
      {label}
    </div>
  )
}

export default SearchPage
