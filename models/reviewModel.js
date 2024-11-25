const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ReviewModel = {
    findAll: async () => {
        return prisma.review.findMany({
            include: { product: true, user: true }, // Includes related product and user details
        });
    },
    findById: async (id) => {
        return prisma.review.findUnique({
            where: { id },
            include: { product: true, user: true },
        });
    },
    create: async (data) => {
        return prisma.review.create({ data });
    },
    update: async (id, data) => {
        return prisma.review.update({
            where: { id },
            data,
        });
    },
    delete: async (id) => {
        return prisma.review.delete({ where: { id } });
    },
};

module.exports = ReviewModel;
