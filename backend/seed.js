const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Admin@invenger', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@invenger.com' },
    update: {},
    create: {
      name: 'Invenger Admin',
      email: 'admin@invenger.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
