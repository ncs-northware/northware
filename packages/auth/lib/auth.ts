import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "./user-connect";
import { authConfig } from "./auth.config";
import { compare } from "bcrypt-ts";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }: any) {
        let user = await getUser(email);
        if (user.length === 0) return null;
        let passwordsMatch = await compare(password, user[0].password!);
        if (passwordsMatch) return user[0] as any;
      },
    }),
  ],
});