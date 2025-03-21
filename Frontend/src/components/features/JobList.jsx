import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchJobs } from "../../store/slices/jobsSlice"
import JobCard from "./JobCard"

function JobList() {
  const dispatch = useDispatch()
  const { jobs, loading, error } = useSelector((state) => state.jobs)
  const filters = useSelector((state) => state.filters)

  useEffect(() => {
    dispatch(fetchJobs(filters))
  }, [dispatch, filters])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
            <div className="flex items-start">
              <div className="h-12 w-12 bg-gray-200 rounded mr-4"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="flex space-x-2">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p>Error loading jobs: {error}</p>
        <button
          onClick={() => dispatch(fetchJobs(filters))}
          className="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
        >
          Try again
        </button>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
        <p className="text-gray-600 mb-4">Try adjusting your search filters or try again later.</p>
        <button
          onClick={() => dispatch(fetchJobs({}))}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Clear filters
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}

export default JobList

