const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ProductModel = {
    findAll: async () => {
        return prisma.product.findMany();
    },
    findById: async (id) => {
        return prisma.product.findUnique({ where: { id } });
    },
    create: async (data) => {
        return prisma.product.create({ data });
    },
    update: async (id, data) => {
        return prisma.product.update({ where: { id }, data });
    },
    delete: async (id) => {
        return prisma.product.delete({ where: { id } });
    },
};

module.exports = ProductModel;
