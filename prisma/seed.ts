import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  const adminPassword = await bcrypt.hash('admin123', saltRounds);
  const staffPassword = await bcrypt.hash('staff123', saltRounds);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@nextmail.io' },
    update: {},
    create: {
      email: 'admin@nextmail.io',
      username: 'admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  const staff = await prisma.user.upsert({
    where: { email: 'staff@nextmail.io' },
    update: {},
    create: {
      email: 'staff@nextmail.io',
      username: 'staff',
      password: staffPassword,
      role: 'STAFF',
    },
  });
  console.log({ admin, staff });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
