const OrderModel = require('../models/orderModel');

// Get all orders
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await OrderModel.findAll();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

// Get an order by ID
const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await OrderModel.findById(Number(id));
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

// Create a new order
const createOrder = async (req, res, next) => {
    try {
        const { userId, totalAmount, items } = req.body;
        const order = await OrderModel.create({
            userId,
            totalAmount,
            items: {
                create: items, // Nested create for order items
            },
        });
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

// Update an order
const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { totalAmount, items } = req.body;
        const order = await OrderModel.update(Number(id), { totalAmount, items });
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

// Delete an order
const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        await OrderModel.delete(Number(id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
