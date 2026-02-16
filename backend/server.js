import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connection from './db.js';

dotenv.config();

// create express app with port from .env file
const app = express();
const PORT = process.env.PORT || 8080;

// enable cross-origin resource sharing (CORS), allows different ports to communicate to one another 
app.use(cors());

// converts string data sent from frontend to JSON for the request body 
app.use(express.json());

// convert connection to promise so that our SQL queries only execute when fulfilled 
const promisePool = connection.promise();

// GET API endpoint for products with filters/sort 
app.get('/api/products', async (req, res) => {
  try {

    // destructure query parameters from request for filtering 
    const {
      search,
      category,
      minPrice,
      maxPrice,
      minRating,
      sortBy
    } = req.query;

    // base query, included "WHERE 1=1" for appending more things to WHERE clause
    let query = 'SELECT * FROM products WHERE 1=1';

    // array to hold parameterized values for sql injection prevention
    const params = [];

    // add search filter for name and description 
    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    // add category filter
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    // add price filters 
    if (minPrice) {
      query += ' AND price >= ?';
      params.push(parseFloat(minPrice));
    }
    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(parseFloat(maxPrice));
    }

    // add rating filter 
    if (minRating) {
      query += ' AND rating >= ?';
      params.push(parseFloat(minRating));
    }

    // add sorting based on sortBy param
    switch (sortBy) {
      case 'name-asc':
        query += ' ORDER BY name ASC';
        break;
      case 'name-desc':
        query += ' ORDER BY name DESC';
        break;
      case 'price-asc':
        query += ' ORDER BY price ASC';
        break;
      case 'price-desc':
        query += ' ORDER BY price DESC';
        break;
      case 'rating-asc':
        query += ' ORDER BY rating ASC';
        break;
      case 'rating-desc':
        query += ' ORDER BY rating DESC';
        break;
      default:
        query += ' ORDER BY id ASC';
    }

    // extracts data from the SQL query with the following params 
    const [rows] = await promisePool.query(query, params);
    // sends the response to the frontend in JSON format 
    res.json(rows);

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

