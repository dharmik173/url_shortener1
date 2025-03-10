import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { validateUserInput } from "@/utils/common/validateUser";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const cookieStore = await cookies();
    const { email, password } = await req.json();

    const validation = validateUserInput(email, password);
    if (!validation.valid) {
      return NextResponse.json(
        { message: validation.message },
        { status: 400 }
      );
    }

    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return NextResponse.json(
        { message: "Please enter correct user details" },
        { status: 409 }
      );
    }

    const hasehdPassword = await bcrypt.compare(password, findUser.password);

    if (!hasehdPassword) {
      return NextResponse.json(
        { message: "Please enter correct user details" },
        { status: 409 }
      );
    }

    const token = jwt.sign(
      {
        data: findUser,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    cookieStore.set("auth_token", token);

    return NextResponse.json(
      {
        message: "User successfully logged in",
        statusCode: 200,
        userData: findUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
