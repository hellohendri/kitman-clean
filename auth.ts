import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import type { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function getUser(username: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user ? user : undefined;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string().min(5), password: z.string().min(8) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);

          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password)

          if (passwordMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
