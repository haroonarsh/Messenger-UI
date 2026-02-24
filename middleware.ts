import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // ← Use 'jwt' (your cookie name)
  const localToken = localStorage.getItem("token"); // ← Check localStorage for token (if needed)

  console.log('token from middleware:', token);
  
  const pathname = request.nextUrl.pathname;

  console.log("Middleware - Path:", pathname, "Token exists:", !!token);

  // Protected routes (require login)
  const protectedPaths = ["/main", "/chat"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // If trying to access protected route without token → redirect to login
  if (isProtected && !token && !localToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If logged in and trying to access login page → redirect to main
  if (token || localToken && pathname === "/") {
    return NextResponse.redirect(new URL("/main", request.url));
  }

  // Otherwise, allow the request
  return NextResponse.next();
}

// Apply middleware to these paths
export const config = {
  matcher: [
    "/",
    "/main/:path*",
    "/chat/:path*",
  ],
};