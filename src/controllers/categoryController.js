const CategoryModel = require('../models/categoryModel');

// Get all categories
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await CategoryModel.findAll();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

// Get a category by ID
const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findById(Number(id));
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};

// Create a new category
const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = await CategoryModel.create({ name });
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};

// Update a category
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await CategoryModel.update(Number(id), { name });
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};

// Delete a category
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        await CategoryModel.delete(Number(id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
