import express from 'express';
import { getAllBooks } from '../controllers/bookController.js';

const router = express.Router();

// Route to get all books
router.get('/books', getAllBooks);

export default router;