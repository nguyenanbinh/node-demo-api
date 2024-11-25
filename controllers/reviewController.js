const ReviewModel = require('../models/reviewModel');

// Get all reviews
const getAllReviews = async (req, res, next) => {
    try {
        const reviews = await ReviewModel.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
};

// Get a review by ID
const getReviewById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await ReviewModel.findById(Number(id));
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
};

// Create a new review
const createReview = async (req, res, next) => {
    try {
        const { userId, productId, rating, comment } = req.body;
        const review = await ReviewModel.create({ userId, productId, rating, comment });
        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
};

// Update a review
const updateReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const review = await ReviewModel.update(Number(id), { rating, comment });
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
};

// Delete a review
const deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        await ReviewModel.delete(Number(id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
};
