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
  SortDescriptor,
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
  { name: 'NAME', uid: 'username', sortable: true },
  { name: 'ROLE', uid: 'role', sortable: true },
  { name: 'STATUS', uid: 'isActive', sortable: true },
  { name: 'PHONE', uid: 'phoneNumber', sortable: true },
];

const randomDeno = generateRandomDeno();

export default function User() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'isActive',
    direction: 'descending',
  });

  const sortedItems = React.useMemo(() => {
    return [...users].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as unknown as number;
      const second = b[
        sortDescriptor.column as keyof User
      ] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, users]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUserData();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    let userFullName = user.firstName ? user.firstName : '';

    if (user.firstName && user.lastName) {
      userFullName = user.firstName + ' ' + user.lastName;
    }

    const userStatus: String = user.isActive ? 'Active' : 'Offline';
    const userAvatar = user.avatarUrl ? user.avatarUrl : randomDeno;

    switch (columnKey) {
      case 'username': {
        return (
          <NextUIUser
            name={userFullName}
            description={user.email}
            avatarProps={{
              src: userAvatar,
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
          <Chip
            className="capitalize"
            color={statusColorMap[user.isActive.toString()]}
            size="sm"
            variant="flat"
          >
            {userStatus}
          </Chip>
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
      <Table
        aria-label="Users table"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} allowsSorting={column.sortable}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
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
