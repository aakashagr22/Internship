import mongoose from "mongoose"

// Check if the Doctor model already exists to prevent model overwrite during hot reloads
const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    specialty: {
      type: String,
      required: [true, "Please add a specialty"],
      trim: true,
    },
    qualification: {
      type: String,
      required: [true, "Please add qualifications"],
      trim: true,
    },
    experience: {
      type: Number,
      required: [true, "Please add years of experience"],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    languages: {
      type: [String],
      default: ["English"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    consultationFee: {
      type: Number,
      required: true,
    },
    availability: {
      online: {
        type: Boolean,
        default: false,
      },
      clinic: {
        type: Boolean,
        default: false,
      },
      hospital: {
        type: Boolean,
        default: false,
      },
    },
    imageUrl: {
      type: String,
      default: "/images/doctors/default-doctor.png",
    },
    location: {
      type: String,
      trim: true,
    },
    hospital: {
      type: String,
      trim: true,
    },
    nextAvailableSlot: {
      type: Date,
      default: Date.now,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
)

// Create slug from name before saving
DoctorSchema.pre("save", function (next) {
  this.slug = this.name
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
  next()
})

// Use mongoose.models to check if the model exists already
// This prevents errors when the model is compiled again during hot reloads
const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema)

export default Doctor
