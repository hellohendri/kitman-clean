'use server';

import LogOutButton from '../components/logoutButton';
import { logoutServer } from '../lib/actions';

export default async function LogoutForm() {
  return (
    <form action={logoutServer}>
      <LogOutButton />
    </form>
  );
}
