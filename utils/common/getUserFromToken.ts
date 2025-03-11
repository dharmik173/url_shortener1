import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserFromToken = async () => {
  try {
    const cookieStore = await cookies();
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const authToken = cookieStore.get("auth_token") as JwtPayload;
    if (!authToken || !authToken.value) {
      return { error: "Please Login First", status: 401 };
    }

    const userData = jwt.verify(authToken.value, secret);

    return { user: userData as JwtPayload, status: 200 };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        return { error: "Token has expired. Please login again.", status: 401 };
      }
      return { error: error.message, status: 400 };
    }
    return { error: "Unknown error occurred", status: 500 };
  }
};
