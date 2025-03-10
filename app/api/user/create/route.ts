import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { validateUserInput } from "@/utils/common/validateUser";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email, password } = await req.json();

    const validation = validateUserInput(email, password);
    if (!validation.valid) {
      return NextResponse.json(
        { message: validation.message },
        { status: 400 }
      );
    }

    const findEmail = await User.findOne({ email: email });
    if (findEmail) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const bcryptPassword = await bcrypt.hash(password, 10);

    const newuser = await User.create({ email, password: bcryptPassword });
    newuser.save();

    return NextResponse.json(
      {
        message: "User created successfully",
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
