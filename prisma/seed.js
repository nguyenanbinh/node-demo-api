// require('dotenv').config({ path: '.env.local' }); // Load variables from .env.local
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const uniqueEmails = faker.helpers.uniqueArray(() => faker.internet.email(), 10);
  for (let i = 0; i < uniqueEmails.length; i++) {
    const hashedPassword = await bcrypt.hash('password123', 10); // Default password for all users

    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: uniqueEmails[i],
        password: hashedPassword,
        refreshToken: faker.string.uuid(),
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
