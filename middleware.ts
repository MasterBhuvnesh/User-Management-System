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
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: string;
    };
    console.log("Token verified:", decoded); // Debugging

    // Redirect non-admin users to the welcome page
    if (
      decoded.role !== "ROLE_ADMIN" &&
      request.nextUrl.pathname.startsWith("/dashboard")
    ) {
      console.log("Non-admin user, redirecting to welcome page"); // Debugging
      return NextResponse.redirect(new URL("/welcome", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Token verification failed:", err); // Debugging
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/welcome"],
};
