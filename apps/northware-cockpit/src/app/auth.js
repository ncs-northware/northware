import Credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { getUser } from './users';
import { authConfig } from './auth.config';
const bcrypt = require('bcryptjs');

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }) {
        let user = await getUser(email);
        if (user.length === 0) return null;
        let passwordsMatch = await bcrypt.compare(password, user[0].password);
        if (passwordsMatch) return user[0];
      },
    }),
  ],
});
