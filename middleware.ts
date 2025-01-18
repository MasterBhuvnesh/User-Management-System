import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Use jose for JWT verification

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  // If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  try {
    // Verify the token using the JWT secret
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    // Redirect non-admin users to the welcome page if they try to access the dashboard
    if (
      payload.role !== "ROLE_ADMIN" &&
      request.nextUrl.pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/welcome", request.url));
    }

    // Allow access to the requested route
    return NextResponse.next();
  } catch (err) {
    // If the token is invalid or expired, clear the token cookie and redirect to login
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token"); // Clear the invalid token
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/welcome"],
};
