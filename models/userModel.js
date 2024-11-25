const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

/**
 * Hashes the password before saving it to the database.
 * @param {string} plainPassword - Plain text password.
 * @returns {Promise<string>} - Hashed password.
 */
const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

/**
 * Finds a user by email.
 * @param {string} email - User email.
 * @returns {Promise<Object|null>} - User object or null.
 */
const findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Creates a new user with hashed password.
 * @param {Object} data - User data (name, email, password).
 * @returns {Promise<Object>} - Created user.
 */
const createUser = async (data) => {
  const hashedPassword = await hashPassword(data.password);
  return await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

/**
 * Updates the user's refresh token.
 * @param {number} userId - User ID.
 * @param {string} refreshToken - New refresh token.
 * @returns {Promise<Object>} - Updated user.
 */
const updateRefreshToken = async (userId, refreshToken) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { refreshToken },
  });
};

module.exports = {
  hashPassword,
  findByEmail,
  createUser,
  updateRefreshToken,
};
