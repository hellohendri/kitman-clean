import { auth } from '@/auth';
import Sidebar from '../ui/sidebar';
import LogoutForm from './logoutForm';
import { getUserByEmail } from '../lib/actions';
import { generateRandomDeno } from '../lib/utils/helper';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default async function SideNavbar() {
  const session = await auth();

  if (!session?.user?.email) return null;

  const userEmail = session.user.email;

  const user = await getUserByEmail(userEmail);

  if (!user) return null;

  const { username, role, avatarUrl } = user;

  const capitalizedName = capitalizeFirstLetter(username);
  const randomDeno = generateRandomDeno();

  return <Sidebar username={capitalizedName} role={role} avatarUrl={avatarUrl ? avatarUrl : randomDeno} logout={<LogoutForm />}/>;
}
