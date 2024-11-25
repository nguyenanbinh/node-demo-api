const express = require('express');
const { getInfoFromToken } = require('../utils/jwt');
const router = express.Router();

router.get('/token-info', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  const secret = process.env.ACCESS_TOKEN_SECRET;  // Use your JWT secret
  const tokenInfo = getInfoFromToken(token, secret);

  if (!tokenInfo) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  res.json({ tokenInfo });
});

module.exports = router;
