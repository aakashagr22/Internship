
import { FaStar, FaVideo, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"
import "./DoctorCard.css"

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-card-content">
        {/* Doctor Image and Rating */}
        <div className="doctor-image-container">
          <img src={doctor.imageUrl || "/images/user.jpg"} alt={doctor.name} className="doctor-image" />
          <div className="doctor-rating">
            <FaStar className="star-icon" />
            <span className="rating-value">{doctor.rating.toFixed(1)}</span>
            <span className="review-count">({doctor.reviewCount})</span>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="doctor-info">
          <h2 className="doctor-name">{doctor.name}</h2>
          <p className="doctor-specialty">{doctor.specialty}</p>
          <p className="doctor-qualification">{doctor.qualification}</p>
          <p className="doctor-experience">{doctor.experience} years experience</p>

          {doctor.languages && doctor.languages.length > 0 && (
            <p className="doctor-languages">Speaks: {doctor.languages.join(", ")}</p>
          )}

          {doctor.hospital && (
            <div className="doctor-location">
              <FaMapMarkerAlt className="location-icon" />
              {doctor.hospital}
            </div>
          )}

          {doctor.location && (
            <div className="doctor-location">
              <FaMapMarkerAlt className="location-icon" />
              {doctor.location}
            </div>
          )}
        </div>

        {/* Appointment Options */}
        <div className="appointment-options">
          <div className="fee-container">
            <p className="consultation-fee">₹{doctor.consultationFee}</p>
            <p className="fee-label">Consultation fee</p>
          </div>

          <div className="availability-info">
            {doctor.availability.online && (
              <div className="availability-item">
                <FaVideo className="availability-icon" />
                <span className="availability-text">Online Consultation</span>
              </div>
            )}

            {doctor.nextAvailableSlot && (
              <div className="availability-item">
                <FaCalendarAlt className="availability-icon" />
                <span className="availability-text">
                  Next Available:{" "}
                  {new Date(doctor.nextAvailableSlot).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>

          <button className="book-button">Book Appointment</button>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard
