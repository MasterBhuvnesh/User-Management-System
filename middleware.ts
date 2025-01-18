import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  console.log("Middleware - Token:", token); // Debugging

  if (!token) {
    console.log("No token found, redirecting to login"); // Debugging
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Token verified, allowing access"); // Debugging
    return NextResponse.next();
  } catch (err) {
    console.log("Invalid token, redirecting to login"); // Debugging
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
