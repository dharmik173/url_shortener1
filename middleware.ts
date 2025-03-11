import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/api") || url.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const shortUrl = url.pathname.slice(1);
  const reservedRoutes = ["login", "dashboard", "signup"];
  if (reservedRoutes.includes(shortUrl)) {
      return NextResponse.next();
  }
  if (!shortUrl) return NextResponse.next();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/shorten/${shortUrl}`
  );
  if (response.status === 404) return NextResponse.next();

  const data = await response.json();
  if (data.data) return NextResponse.redirect(data.data, 301);

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|api|.*\\..*).*)",
};
