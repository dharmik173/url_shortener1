import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { Url } from "@/models/Url";

export async function GET(
  req: Request,
  { params }: { params: { shortUrl: string } }
) {
  try {
    await connectToDB();

    const { shortUrl } = params;

    if (!shortUrl) {
      return NextResponse.json(
        { message: "Short URL is required" },
        { status: 400 }
      );
    }

    const urlDoc = await Url.findOne({ shortUrl });

    if (!urlDoc) {
      return NextResponse.json(
        { error: true, message: "Short URL not found" },
        { status: 404 }
      );
    }

    let destinationUrl = urlDoc.originalUrl;

    if (!destinationUrl.startsWith("http")) {
      destinationUrl = `https://${destinationUrl}`;
    }
    return NextResponse.json({ data: destinationUrl });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
