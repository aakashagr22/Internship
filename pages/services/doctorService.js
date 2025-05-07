// services/doctorService.js
import { mockFetchDoctors } from "@/lib/mockData";

// Configuration
const USE_MOCK_DATA = process.env.NODE_ENV === 'development' && 
                     process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes cache

// Simple in-memory cache
const cache = new Map();

export async function fetchDoctors(params = {}) {
  const cacheKey = JSON.stringify(params);
  
  // Check cache first
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
  }

  // Use mock data if enabled
  if (USE_MOCK_DATA) {
    const mockData = mockFetchDoctors(params);
    cache.set(cacheKey, { data: mockData, timestamp: Date.now() });
    return mockData;
  }

  try {
    // Prepare request
    const queryString = new URLSearchParams();
    
    // Add all valid params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryString.append(key, value);
      }
    });

    const startTime = performance.now();
    const response = await fetch(`${API_BASE_URL}/doctors?${queryString.toString()}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.json();
    const endTime = performance.now();

    console.debug(`API call took ${(endTime - startTime).toFixed(2)}ms`);

    // Validate response structure
    if (!result.data || !result.pagination) {
      throw new Error('Invalid API response structure');
    }

    // Cache successful responses
    cache.set(cacheKey, { 
      data: { 
        doctors: result.data, 
        pagination: result.pagination 
      }, 
      timestamp: Date.now() 
    });

    return {
      doctors: result.data,
      pagination: result.pagination
    };

  } catch (error) {
    console.error('DoctorService Error:', {
      error: error.message,
      params,
      timestamp: new Date().toISOString()
    });

    // Return cached data if available (even if stale)
    if (cache.has(cacheKey)) {
      console.warn('Returning stale cached data due to API error');
      return cache.get(cacheKey).data;
    }

    throw new Error(`Failed to fetch doctors: ${error.message}`);
  }
}

// Utility function to clear cache
export function clearDoctorCache() {
  cache.clear();
}