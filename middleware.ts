import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    console.log('token', token);

    if (token === undefined && token === null && request.nextUrl.pathname.startsWith('/main')) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (token && token !== null && token !== undefined && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL("/main", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/main/:path*'],
};