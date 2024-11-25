const ProductModel = require('../models/productModel');

// Get all products
const getAllProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.findAll();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// Get a product by ID
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(Number(id));
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// Create a new product
const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, categoryId } = req.body;
        const product = await ProductModel.create({
            name,
            description,
            price,
            stock,
            categoryId,
        });
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

// Update a product
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, categoryId } = req.body;
        const product = await ProductModel.update(Number(id), {
            name,
            description,
            price,
            stock,
            categoryId,
        });
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// Delete a product
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await ProductModel.delete(Number(id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
