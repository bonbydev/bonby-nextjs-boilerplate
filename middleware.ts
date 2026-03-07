import NextAuth from "next-auth";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

import authConfig from "./auth.config";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const { auth } = NextAuth(authConfig);

const authRoutes = ["/sign-in", "/sign-up"];
const protectedRoutes = ["/dashboard"];

function isPathMatch(pathname: string, routes: string[]) {
  return routes.some((route) => {
    const pattern = new RegExp(`^(/[a-z]{2})?${route}(/.*)?$`);
    return pattern.test(pathname);
  });
}

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth?.user;

  if (isPathMatch(nextUrl.pathname, protectedRoutes) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  if (isPathMatch(nextUrl.pathname, authRoutes) && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!api|api-docs|_next/static|_next/image|favicon.ico).*)"],
};
