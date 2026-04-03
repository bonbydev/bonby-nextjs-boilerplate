import type { NextAuthConfig } from "next-auth";

export default {
  providers: [],
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthConfig;
