import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ["name", "specialty", "experience", "qualification", "consultationFee"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // In a real application, you would save this to a database
    // For now, we'll just return success
    return NextResponse.json(
      {
        success: true,
        doctor: {
          id: Date.now().toString(),
          ...data,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding doctor:", error)
    return NextResponse.json({ success: false, error: "Failed to add doctor" }, { status: 500 })
  }
}
