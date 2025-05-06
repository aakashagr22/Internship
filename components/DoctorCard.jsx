import Image from "next/image";
import { Star, Video, Calendar, MapPin } from "lucide-react";

export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex flex-col md:flex-row">
        {/* Doctor Image and Rating */}
        <div className="md:w-1/4 flex flex-col items-center mb-4 md:mb-0">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-2 border-2 border-purple-100">
            <Image
              src={doctor.imageUrl || "/images/user.jpg"}
              alt={doctor.name}
              width={128}
              height={128}
              className="object-cover"
              priority
            />
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-medium">{doctor.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm ml-1">({doctor.reviewCount})</span>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="md:w-2/4 md:px-4">
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p className="text-gray-600">{doctor.specialty}</p>
          <p className="text-gray-600">{doctor.qualification}</p>
          <p className="text-gray-600">{doctor.experience} years experience</p>

          {doctor.languages && doctor.languages.length > 0 && (
            <p className="text-gray-600 text-sm mt-2">Speaks: {doctor.languages.join(", ")}</p>
          )}

          {doctor.hospital && (
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              {doctor.hospital}
            </div>
          )}

          {doctor.location && (
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              {doctor.location}
            </div>
          )}
        </div>

        {/* Appointment Options */}
        <div className="md:w-1/4 flex flex-col justify-between">
          <div>
            <p className="font-semibold text-lg">₹{doctor.consultationFee}</p>
            <p className="text-gray-500 text-sm">Consultation fee</p>
          </div>

          <div className="mt-4">
            {doctor.availability.online && (
              <div className="flex items-center mb-2">
                <Video className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-sm">Online Consultation</span>
              </div>
            )}

            {doctor.nextAvailableSlot && (
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-sm">
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

          <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}