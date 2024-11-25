// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { createValidation, updateValidation } = require('../middleware/validators/userValidator');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', createValidation, userController.createUser);
router.patch('/:id', updateValidation, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
