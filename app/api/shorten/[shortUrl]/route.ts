import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { Url } from "@/models/Url";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortUrl: string }> }
) {
  try {
    // Connect to the database
    await connectToDB();

    // Extract the shortUrl from params
    const { shortUrl } = await params;

    // Validate the shortUrl
    if (!shortUrl) {
      return NextResponse.json(
        { error: true, message: "Short URL is required" },
        { status: 400 }
      );
    }

    // Find the URL document in the database
    const urlDoc = await Url.findOne({ shortUrl });

    // Handle case where the short URL is not found
    if (!urlDoc) {
      return NextResponse.json(
        { error: true, message: "Short URL not found" },
        { status: 404 }
      );
    }

    // Ensure the destination URL has a valid protocol
    let destinationUrl = urlDoc.originalUrl;
    if (
      !destinationUrl.startsWith("http://") &&
      !destinationUrl.startsWith("https://")
    ) {
      destinationUrl = `https://${destinationUrl}`;
    }

    // Return the destination URL
    return NextResponse.json({ data: destinationUrl });
  } catch (error) {
    console.error("Error in GET /api/shorten/[shortUrl]:", error);

    // Return a generic server error response
    return NextResponse.json(
      { error: true, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
