import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Use jose for JWT verification

export async function middleware(request: NextRequest) {
  // Log all cookies for debugging
  const cookies = request.cookies.getAll();
  console.log("All cookies:", cookies); // Debugging

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value;
  console.log("Middleware - Token from cookies:", token); // Debugging

  // If no token is found, redirect to the login page
  if (!token) {
    console.log("No token found, redirecting to login"); // Debugging
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    // Verify the token using the JWT secret
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    console.log("Token verified:", payload); // Debugging

    // Redirect non-admin users to the welcome page if they try to access the dashboard
    if (
      payload.role !== "ROLE_ADMIN" &&
      request.nextUrl.pathname.startsWith("/dashboard")
    ) {
      console.log("Non-admin user, redirecting to welcome page"); // Debugging
      return NextResponse.redirect(new URL("/welcome", request.url));
    }

    // Allow access to the requested route
    return NextResponse.next();
  } catch (err) {
    console.error("Token verification failed:", err); // Debugging

    // If the token is invalid or expired, clear the token cookie and redirect to login
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token"); // Clear the invalid token
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/welcome"],
};
