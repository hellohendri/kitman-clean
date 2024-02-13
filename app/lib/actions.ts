'use server';

import { signIn, signOut } from '@/auth';
import { auth } from '@/auth';
import { AuthError } from 'next-auth';
import prisma from './prisma';
import type { User } from '@prisma/client';

async function updateIsActiveFalse(id: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive: false
      }
    });
    return user ? user : undefined;
  } catch (error) {
    console.error('Failed to update user status:', error);
    throw new Error('Failed to update user status.');
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      console.error(error);
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logoutServer() {
  const session = await auth();
  if (!session?.user?.email) return null;
  const userEmail = session.user.email;

  const user = await getUserByEmail(userEmail);
  if (!user) return null;

  await updateIsActiveFalse(user.id);
  await signOut();
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function getUserData() {
  const users = await prisma.user.findMany();
  return users;
}