const jwt = require('jsonwebtoken');

/**
 * Extracts and decodes information from a JWT token.
 * @param {string} token - The JWT token.
 * @param {string} secret - Secret key to verify the token (optional).
 * @returns {object|null} - Decoded payload or null if invalid.
 */
const getInfoFromToken = (token, secret = null) => {
  try {
    if (secret) {
      // Verify token with secret (if provided)
      const decoded = jwt.verify(token, secret);
      return decoded; 
    }
    // Decode without verification (only for getting data)
    const decoded = jwt.decode(token); 
    return decoded;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

module.exports = { getInfoFromToken };
