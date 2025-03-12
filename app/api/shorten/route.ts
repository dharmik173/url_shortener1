import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

import { connectToDB } from "@/lib/mongodb";
import { Url } from "@/models/Url";
// import { getUserFromToken } from "@/utils/common/getUserFromToken";
import { getServerSession } from "next-auth";
import { User } from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const userSession = await getServerSession()
    console.log(userSession,'userSession')
    const findUserdata = await User.findOne({email:userSession?.user?.email})
    if(!findUserdata){
      return NextResponse.json({ message: 'not valid user' }, { status:401 });
    }
    // const { user, error, status } = await getUserFromToken();


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
      userId: findUserdata?._id,
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
