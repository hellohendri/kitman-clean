'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Avatar } from '@nextui-org/react';

interface sidebarProps {
  username: string;
  role: string;
  avatarUrl: string | undefined;
  logout: React.ReactNode;
}

interface SidebarItem {
  title: string;
  href: string;
  icon?: string; // Optional icon class name
  submenu?: SidebarItem[]; // Optional submenu items
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Customer', href: '/customer' },
  { title: 'Service', href: '/service' },
  { title: 'User', href: '/user' },
];

export default function Sidebar(props: sidebarProps) {
  const { username, role, avatarUrl, logout } = props;

  const pathname = usePathname();
  const showPathname = pathname !== '/login';

  if (!showPathname) return null;

  return (
    <aside aria-label="Sidenav" className="top-0 left-0 w-64 h-screen">
      <div className="overflow-y-auto py-5 px-3 h-full border-r border-gray-200">
        <div className="px-3 py-5 flex gap-4 items-center border-b border-gray-200 mb-5">
          <Avatar isBordered radius="full" src={avatarUrl} size='lg'/>
          <div className='logout-container'>
            <h1 className="text-md font-bold">Welcome {username}!</h1>
            {logout}
          </div>
        </div>
        <ul>
          {SIDEBAR_ITEMS.map((item) => (
            <li
              key={item.href}
              className={`py-2 px-2 hover:bg-success-200 rounded-lg ${
                pathname === item.href
                  ? 'bg-success-700 font-bold text-white rounded-lg'
                  : ''
              }`}
            >
              <Link href={item.href}>
                <div className="flex items-center">
                  {item.icon && (
                    <div className="mr-2">
                      <i className={item.icon} />
                    </div>
                  )}
                  <span>{item.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
