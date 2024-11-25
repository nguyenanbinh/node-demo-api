// middleware/validators/authValidator.js
const { body } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Invalid email address')
    .custom(async (value) => {
      const existingUser = await prisma.user.findUnique({ where: { email: value } });
      if (existingUser) {
        throw new Error('Email is already taken');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

exports.updateValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  // body('password').notEmpty().withMessage('Password is required'),
];
