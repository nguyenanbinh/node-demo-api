const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const OrderModel = {
    findAll: async () => {
        return prisma.order.findMany({
            include: { items: true, user: true }, // Includes related items and user details
        });
    },
    findById: async (id) => {
        return prisma.order.findUnique({
            where: { id },
            include: { items: true, user: true },
        });
    },
    create: async (data) => {
        return prisma.order.create({
            data,
            include: { items: true }, // Return created order with items
        });
    },
    update: async (id, data) => {
        return prisma.order.update({
            where: { id },
            data,
        });
    },
    delete: async (id) => {
        return prisma.order.delete({ where: { id } });
    },
};

module.exports = OrderModel;
