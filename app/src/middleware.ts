import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// To be used with backend routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);

  // // Allow only valid routes
  // const validRoutes = ["/dashboard", "/not_found"];
  // if (!validRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL("/not_found", request.url));
  // }

  // if (!request.nextUrl.pathname.includes('/dashboard')) {
  //   return NextResponse.redirect(new URL('/not_found', request.url))
  // }

  // Allow the request to proceed for valid routes
  return NextResponse.next();
}