const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'simplehearing@gmail.com';
  const plainPassword = process.env.ADMIN_PASSWORD || 'admin@5153';

  console.log('Seeding initial admin:', email);
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      passwordHash,
    },
  });

  console.log('Admin account created / updated successfully: ID', admin.id, 'Email:', admin.email);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
