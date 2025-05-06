import { validateFilters } from '../utils/validation';

const API_BASE = '/api/doctors';

export const fetchDoctors = async (filters = {}, pagination = {}) => {
  // Validate filters
  const filterError = validateFilters(filters);
  if (filterError) throw new Error(filterError);

  // Merge filters with pagination
  const params = {
    ...filters,
    page: pagination.page || 1,
    limit: pagination.limit || 10
  };

  try {
    const response = await fetch(`${API_BASE}?${new URLSearchParams(params)}`);
    if (!response.ok) throw new Error('Failed to fetch doctors');
    return await response.json();
  } catch (error) {
    console.error('DoctorService Error:', error);
    throw error;
  }
};

export const createDoctor = async (doctorData) => {
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doctorData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create doctor');
    }
    
    return await response.json();
  } catch (error) {
    console.error('DoctorService Error:', error);
    throw error;
  }
};