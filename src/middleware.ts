import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
	// if (pathname === "/project") {
  //   console.log(request);
	// 	return NextResponse.redirect(new URL("/project/1/tasks", request.url));
	// }

	return NextResponse.next();
}

export const config = {
	matcher: "/project",
};
