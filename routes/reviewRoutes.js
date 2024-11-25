const express = require('express');
const {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/reviewController');

const router = express.Router();

// Get all reviews
router.get('/', getAllReviews);

// Get a review by ID
router.get('/:id', getReviewById);

// Create a new review
router.post('/', createReview);

// Update a review
router.put('/:id', updateReview);

// Delete a review
router.delete('/:id', deleteReview);

module.exports = router;
