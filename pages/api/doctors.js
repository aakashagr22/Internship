// pages/api/doctors/route.js
import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

// Default configuration
const DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  SORT: "rating",
  ORDER: "desc",
  SPECIALTY: "General Physician & Internal Medicine"
};

export async function GET(request) {
  try {
    // Debug connection
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Database connected successfully");

    const { searchParams } = new URL(request.url);
    
    // Parse query parameters with defaults
    const queryParams = {
      specialty: searchParams.get('specialty') || DEFAULTS.SPECIALTY,
      rating: searchParams.get('rating'),
      experience: searchParams.get('experience'),
      availability: searchParams.get('availability'),
      gender: searchParams.get('gender'),
      page: Number(searchParams.get('page')) || DEFAULTS.PAGE,
      limit: Number(searchParams.get('limit')) || DEFAULTS.LIMIT,
      sortBy: searchParams.get('sortBy') || DEFAULTS.SORT,
      sortOrder: searchParams.get('sortOrder') || DEFAULTS.ORDER
    };

    console.log("Query parameters:", queryParams);

    // Build query
    const query = { specialty: queryParams.specialty };
    
    // Apply filters
    if (queryParams.rating) query.rating = { $gte: Number(queryParams.rating) };
    if (queryParams.experience) query.experience = { $gte: Number(queryParams.experience) };
    if (queryParams.gender) query.gender = queryParams.gender;
    if (queryParams.availability) {
      query[`availability.${queryParams.availability}`] = true;
    }

    console.log("Final query:", JSON.stringify(query, null, 2));

    // Execute query
    const [doctors, total] = await Promise.all([
      Doctor.find(query)
        .sort({ [queryParams.sortBy]: queryParams.sortOrder === "asc" ? 1 : -1 })
        .skip((queryParams.page - 1) * queryParams.limit)
        .limit(queryParams.limit)
        .lean(),
      Doctor.countDocuments(query)
    ]);

    console.log(`Found ${doctors.length} doctors out of ${total}`);

    if (doctors.length === 0) {
      console.warn("No doctors found matching query");
    }

    return NextResponse.json({
      success: true,
      data: doctors,
      pagination: {
        total,
        page: queryParams.page,
        limit: queryParams.limit,
        totalPages: Math.ceil(total / queryParams.limit),
      },
    });
    
  } catch (error) {
    console.error("API Error:", error);
    
    return NextResponse.json({
      success: false,
      error: error.message || "Server Error",
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        fullError: JSON.stringify(error)
      })
    }, { 
      status: error.statusCode || 500 
    });
  }
}

export async function POST(request) {
  try {
    console.log("Connecting to database for POST...");
    await dbConnect();
    
    const body = await request.json();
    console.log("Received POST data:", body);

    // Validate required fields
    const requiredFields = ['name', 'specialty'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Create new doctor
    const doctor = await Doctor.create(body);
    console.log("Created new doctor:", doctor._id);
    
    return NextResponse.json({
      success: true,
      data: doctor.toObject()
    }, { status: 201 });
    
  } catch (error) {
    console.error("POST Error:", error);
    
    // Enhanced error responses
    let status = 500;
    let errorMessage = "Server Error";
    
    if (error.name === 'ValidationError') {
      status = 400;
      errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
    } else if (error.code === 11000) {
      status = 409;
      errorMessage = "Duplicate entry";
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    }, { status });
  }
}