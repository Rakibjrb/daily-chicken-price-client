import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get(`${process.env.NEXT_SECRET_TOKEN}`)?.value;

  const loggedUserCantAccessPaths = request.nextUrl.pathname == "/login";
  if (loggedUserCantAccessPaths) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard", "/login"],
};
