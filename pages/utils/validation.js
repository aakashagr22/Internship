// utils/validation.js
export const validateDoctorData = (data) => {
  const requiredFields = [
    'name',
    'specialty',
    'experience',
    'qualification',
    'gender',
    'consultationFee'
  ];
  
  const missingFields = requiredFields.filter(field => !data[field]);
  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(', ')}`;
  }

  // Add more specific validations as needed
  return null;
};

export const validateFilters = (filters) => {
  if (filters.rating && (isNaN(filters.rating) || filters.rating < 0 || filters.rating > 5)) {
    return 'Rating must be between 0-5';
  }

  if (filters.experience && (isNaN(filters.experience) || filters.experience < 0)) {
    return 'Experience must be a positive number';
  }

  if (filters.page && (isNaN(filters.page) || filters.page < 1)) {
    return 'Page must be a positive number';
  }

  if (filters.limit && (isNaN(filters.limit) || filters.limit < 1 || filters.limit > 100)) {
    return 'Limit must be between 1-100';
  }

  if (filters.availability && !['online', 'clinic', 'hospital'].includes(filters.availability)) {
    return 'Invalid availability type';
  }

  return null;
};