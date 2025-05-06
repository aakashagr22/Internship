import { useState } from 'react';

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    name: '',
    specialty: 'General Physician & Internal Medicine',
    experience: 0,
    qualification: '',
    gender: 'Male',
    consultationFee: 0,
    availability: { online: true, clinic: false, hospital: false }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      alert(`Doctor added: ${data.name}`);
    } catch (error) {
      alert('Error adding doctor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add all form fields matching your schema */}
      <button type="submit">Add Doctor</button>
    </form>
  );
}