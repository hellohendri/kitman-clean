import type { NextAuthConfig } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginRoute = nextUrl.pathname === '/login';

      if (isLoggedIn && isLoginRoute) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      const protectedRoutes = ['/dashboard', '/service', '/customer'];
      const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route),
      );

      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      return true;
    },
    async jwt({ token, account }) {
      if (account && account.user) {
        token.user = account.user;
      }
      
      return token;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
