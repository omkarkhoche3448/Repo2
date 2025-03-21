"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Briefcase, User, Bell, MessageSquare, Menu, Search, X } from "lucide-react"
import Logo from "../../assets/JOB.webp"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === "/"
  const isSearchPage = location.pathname === "/search"

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`)
    } else {
      navigate("/search")
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img src={Logo} className="w-42 h-28"></img>
              {/* <div className="h-8 w-fit text-blue-600 rounded flex items-center justify-center text-xl border px-2">
                  ProFind
              </div> */}
            </Link>

            <div className="hidden md:flex ml-6 space-x-8">
              <Link
                to="/"
                className={`flex items-center px-1 pt-1 text-sm font-medium ${
                  isHomePage
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Jobs
              </Link>
              <Link
                to="/search"
                className={`flex items-center px-1 pt-1 text-sm font-medium ${
                  isSearchPage
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Search
              </Link>
              <Link
                to="/companies"
                className="flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Companies
              </Link>
              <Link
                to="/services"
                className="flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Services
              </Link>
            </div>
          </div>

          {/* Search Bar - Only visible on non-search pages */}
          {!isSearchPage && !isHomePage && (
            <div className="hidden md:block flex-1 max-w-lg mx-auto">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search jobs, skills, companies..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </form>
            </div>
          )}

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/messages" className="text-gray-500 hover:text-gray-700" title="Messages">
              <MessageSquare className="h-6 w-6" />
            </Link>
            <Link to="/notifications" className="text-gray-500 hover:text-gray-700" title="Notifications">
              <Bell className="h-6 w-6" />
            </Link>
            <Link to="/profile" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!isSearchPage && (
              <form onSubmit={handleSearch} className="mb-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search jobs, skills, companies..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </form>
            )}
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                isHomePage ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Briefcase className="mr-3 h-5 w-5" />
              <span>Jobs</span>
            </Link>
            <Link
              to="/search"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                isSearchPage ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Search className="mr-3 h-5 w-5" />
              <span>Search</span>
            </Link>
            <Link
              to="/companies"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              <span>Companies</span>
            </Link>
            <Link
              to="/services"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Bell className="mr-3 h-5 w-5" />
              <span>Services</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <User className="mr-3 h-5 w-5" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

