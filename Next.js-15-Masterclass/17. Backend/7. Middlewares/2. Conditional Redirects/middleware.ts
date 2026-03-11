import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/register", request.nextUrl));
    // return NextResponse.json({ success: "Successfully ran"});
  }
}

export const config = {
  matchers: "/dashboard",
};
