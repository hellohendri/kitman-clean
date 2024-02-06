import { signOut } from '@/auth';
import LogOutButton from '../components/logoutButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1>Dashboard Page</h1>
      <form
        action={async () => {
          'use server'
          await signOut();
        }}
      >
        <LogOutButton />
      </form>
    </main>
  );
}
