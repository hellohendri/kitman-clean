'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User as NextUIUser,
  Chip,
  Tooltip,
  ChipProps,
  getKeyValue,
} from '@nextui-org/react';
import { getUserData } from '../lib/actions';
import type { User } from '@prisma/client';
import { generateRandomDeno } from '../lib/utils/helper';
import { EyeIcon } from '../components/icons/eyeIcon';
import { EditIcon } from '../components/icons/editIcon';
import { DeleteIcon } from '../components/icons/deleteIcon';

const statusColorMap: Record<string, ChipProps['color']> = {
  true: 'success',
  false: 'danger',
};

const columns = [
  { name: 'NAME', uid: 'username' },
  { name: 'ROLE', uid: 'role' },
  { name: 'STATUS', uid: 'isActive' },
  { name: 'PHONE', uid: 'phoneNumber' },
];

export default function User() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUserData();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    const userStatus = user.isActive ? 'Active' : 'Offline';

    switch (columnKey) {
      case 'username': {
        return (
          <NextUIUser
            name={user.username}
            description={user.email}
            avatarProps={{
              src: 'https://avatars.githubusercontent.com/u/30373425?v=4',
            }}
          />
        );
      }
      case 'role': {
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{user.role}</p>
          </div>
        );
      }
      case 'isActive': {
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{userStatus}</p>
          </div>
        );
      }
      case 'phoneNumber': {
        if (!user.phoneNumber) {
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">-</p>
            </div>
          );
        }
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{user.phoneNumber.toString()}</p>
          </div>
        );
      }
      default:
        return cellValue;
    }
  }, []);

  return (
    <main className="px-5 py-5">
      <h1 className="text-2xl mb-5 font-bold">User Management</h1>
      <Table aria-label="Users table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                return <TableCell>{renderCell(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}
