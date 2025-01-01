import { compare } from 'bcrypt-ts';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { getUser } from './user-connect';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await getUser(email);
        if (user.length === 0) {
          return null;
        }
        const passwordsMatch = await compare(password, user[0].password || '');
        if (passwordsMatch) {
          return {
            name: user[0].name,
            email: user[0].email,
          };
        }
        return null;
      },
    }),
  ],
});
