'use client';

import { Avatar } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
];

export default function Sidebar() {
  const pathname = usePathname();
  const showPathname = pathname !== '/login';

  if (!showPathname) return null;

  return (
    <aside aria-label="Sidenav" className="top-0 left-0 w-64 h-screen">
      <div className="overflow-y-auto py-5 px-3 h-full border-r border-gray-200">
        <div className="px-3 py-5 flex gap-4 items-center border-b border-gray-200 mb-5">
          <Avatar
            isBordered
            radius="full"
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          />
          <div>
            <h1 className="text-md font-bold">Welcome, Admin</h1>
            <p>Sign Out</p>
          </div>
        </div>
        <ul>
          {SIDEBAR_ITEMS.map((item) => (
            <li
              key={item.href}
              className={`py-2 px-2 hover:bg-gray-200 ${
                pathname === item.href
                  ? 'bg-success-700 font-bold text-white'
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
