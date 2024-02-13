'use server';

import LogOutButton from './logoutButton';
import { logoutServer } from '../lib/actions';

export default async function LogoutForm() {
  return (
    <form action={logoutServer}>
      <LogOutButton />
    </form>
  );
}
