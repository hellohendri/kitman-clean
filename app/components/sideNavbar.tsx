import { auth } from '@/auth';
import Sidebar from '../ui/sidebar';
import { PrismaClient } from '@prisma/client';
import LogoutForm from '../ui/logoutForm';

const prisma = new PrismaClient();

const generateRandomDeno = () => {
    const denoList = [
        '4a1267.svg',
        '13be44.svg',
        '41f332.svg',
        '69c754.svg',
        '200f1d.svg',
        'a8d827.svg',
        '3872b2.svg',
        'a133e7.svg',
        'fb3c4a.svg',
        'fb7849.svg'
    ]

    const randomIndex = Math.floor(Math.random() * denoList.length);
    return `https://deno-avatar.deno.dev/avatar/${denoList[randomIndex]}`;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default async function SideNavbar() {
  const session = await auth();

  if (!session?.user?.email) return null;

  const userEmail = session.user.email;

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) return null;

  const { username, role, avatarUrl } = user;

  const capitalizedName = capitalizeFirstLetter(username);
  const randomDeno = generateRandomDeno();

  return <Sidebar username={capitalizedName} role={role} avatarUrl={avatarUrl ? avatarUrl : randomDeno} logout={<LogoutForm />}/>;
}
