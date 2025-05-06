import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DoctorsListingPage from "./pages/DoctorsListingPage"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorsListingPage />} />
        <Route path="/specialties/general-physician-internal-medicine" element={<DoctorsListingPage />} />
      </Routes>
    </Router>
  )
}

export default App
