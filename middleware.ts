import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

const authRoutes = ["/sign-in", "/sign-up"];

function isPathMatch(pathname: string, routes: string[]) {
  return routes.some((route) => {
    const pattern = new RegExp(`^(/[a-z]{2})?${route}(/.*)?$`);
    return pattern.test(pathname);
  });
}

function isProtectedPath(pathname: string) {
  return pathname === "/";
}

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth?.user;

  if (isProtectedPath(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  if (isPathMatch(nextUrl.pathname, authRoutes) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
