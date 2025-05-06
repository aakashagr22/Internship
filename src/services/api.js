import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

export const fetchDoctors = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/doctors`, { params })
    return response.data
  } catch (error) {
    console.error("Error fetching doctors:", error)
    throw error
  }
}

export const addDoctor = async (doctorData) => {
  try {
    const response = await axios.post(`${API_URL}/doctors/add`, doctorData)
    return response.data
  } catch (error) {
    console.error("Error adding doctor:", error)
    throw error
  }
}
