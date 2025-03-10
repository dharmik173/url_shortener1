import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { Url } from "@/models/Url";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { originalUrl } = await req.json();

    if (!originalUrl) {
      return NextResponse.json(
        { message: "Original URL is required" },
        { status: 400 }
      );
    }

    let shortCode = nanoid(6);

    let existingUrl = await Url.findOne({ shortUrl: shortCode });

    while (existingUrl) {
      shortCode = nanoid(6);
      existingUrl = await Url.findOne({ shortUrl: shortCode });
    }
    const newUrl = new Url({
      originalUrl,
      shortUrl: shortCode,
      userId: "", // need to handle dynamically
    });
    await newUrl.save();

    return NextResponse.json(
      {
        message: "Short URL created",
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`,
        statusCode: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
