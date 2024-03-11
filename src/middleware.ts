import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });

    if (!token) {
        return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    /*
    if (token && (request.nextUrl.pathname === "/auth/signin" || request.nextUrl.pathname === "/auth/signup" || request.nextUrl.pathname === "/auth/forgot-password")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    */
}

export const config = { matcher: ["/dashboard/:path*"] };