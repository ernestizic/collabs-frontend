import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("access_token")?.value;
	const { pathname } = req.nextUrl;
	
	const protectedRoutes = ["/dashboard", "/create-project", "/project", "/verify-email"];
	const authRoutes = ["/login", "/signup", "/forgot-password"];

	if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	if (token && authRoutes.some((route) => pathname.startsWith(route))) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/project/:path*",
		"/dashboard/:path*",
		"/create-project",
		"/login",
		"/signup",
		"/verify-email",
		"/forgot-password/:path*",
	],
};
