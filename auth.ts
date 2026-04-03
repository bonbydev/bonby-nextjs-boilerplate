import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { dbConnect } from "@/lib/mongoose";
import { User } from "@/models/user.model";
import { signInSchema } from "@/validators/auth";

import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validated = signInSchema.safeParse(credentials);
        if (!validated.success) return null;

        const { username, password } = validated.data;

        await dbConnect();
        const user = await User.findOne({ username: username.toLowerCase() }).select("+password");
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
      }

      if (token.sub && !token.role) {
        await dbConnect();
        const dbUser = await User.findById(token.sub);
        if (dbUser) {
          token.role = dbUser.role;
          token.name = dbUser.username;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.role) {
        session.user.role = token.role as string;
      }
      if (token.name) {
        session.user.name = token.name;
      }
      return session;
    },
  },
});
