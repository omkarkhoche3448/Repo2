import { Provider } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { store } from "./store"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import SavedJobsPage from "./pages/SavedJobsPage"
import JobDetailsPage from "./pages/JobDetailsPage"
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/saved" element={<SavedJobsPage />} />
            <Route path="/job/:id" element={<JobDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  )
}

export default App

