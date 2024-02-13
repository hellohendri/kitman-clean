'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/react';
import { getUserData } from '../lib/actions';
import type { User } from '@prisma/client';

const columns = [
  {
    key: 'username',
    label: 'USERNAME',
  },
  {
    key: 'role',
    label: 'ROLE',
  },
  {
    key: 'isActive',
    label: 'STATUS',
  },
];

export default function User() {
  const [rows, setRows] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const initialData = await getUserData();
      setRows(initialData);
    };
    fetchUserData();
  }, []);

  const getStatusText = (isActive: boolean) =>
    isActive ? 'Active' : 'Offline';

  return (
    <main className="px-5 py-5">
      <h1 className="text-2xl mb-5 font-bold">User Management</h1>
      <Table aria-label="Users table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No data to display.'} items={rows}>
          {(item) => (
            <TableRow key={item.id}>
              {
                // getKeyValue(item, columnKey)
                (columnKey) => (
                  <TableCell>
                    {columnKey === 'isActive'
                      ? getKeyValue(getStatusText(item[columnKey]), columnKey)
                      : getKeyValue(item, columnKey)}
                  </TableCell>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}
