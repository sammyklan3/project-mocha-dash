import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // IMPORTANT: This must be kept secret!
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { paramsToSign } = body;

  try {
    // Generate the Cloudinary signature
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!,
    );
    return NextResponse.json({ signature });
  } catch (error) {
    console.error("Error signing Cloudinary params:", error);
    return NextResponse.json(
      { error: "Failed to sign parameters" },
      { status: 500 },
    );
  }
}
