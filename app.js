require('dotenv').config({ path: '.env' });

const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const app = express();
const port = process.env.PORT || 3001;
const tokenInfoRoute = require('./routes/tokenInfoRoute');

// Configure Winston logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, message }) => {
      return `${timestamp} - ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

// Use Morgan to log requests
app.use(morgan('dev'));
app.use(express.json());


// Import routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Auth routes
app.use('/api/auth', authRoutes);
// Use routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

app.use('/api', tokenInfoRoute);
app.get('/', (req, res) => {
  throw new Error('Something went wrong9!');
});

// Middleware to log errors
app.use((err, req, res, next) => {
  logger.error(err.stack); // Log error with timestamp
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
