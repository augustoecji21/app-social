// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 10);

  await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com', password },
      { name: 'Bob', email: 'bob@example.com', password },
    ],
    skipDuplicates: true,
  });

  console.log('Usuarios predefinidos insertados');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
