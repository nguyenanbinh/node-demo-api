const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CategoryModel = {
    findAll: async () => {
        return prisma.category.findMany();
    },
    findById: async (id) => {
        return prisma.category.findUnique({ where: { id } });
    },
    create: async (data) => {
        return prisma.category.create({ data });
    },
    update: async (id, data) => {
        return prisma.category.update({ where: { id }, data });
    },
    delete: async (id) => {
        return prisma.category.delete({ where: { id } });
    },
};

module.exports = CategoryModel;
