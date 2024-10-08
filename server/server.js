import dotenv from 'dotenv';  // Import dotenv first
dotenv.config();  // Configure dotenv before using any environment variable

import { MongoClient } from 'mongodb';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI; // Use the environment variable after dotenv.config()

app.use(cors());
app.use(express.json());

// Fetch books from MongoDB with filtering, pagination, limit, and sorting
app.get('/api/books', async (req, res) => {
  const filter = {};
  const { title, author, startYear, endYear, genres, available, page = 1, limit = 10, sortOrder = 'asc', sortBy = 'publishDate' } = req.query;
  const parsedLimit = parseInt(limit, 10);
  const skip = (page - 1) * parsedLimit;
  const sortOptions = { publishDate: { publishDate: sortOrder === 'asc' ? 1 : -1 }, rating: { rating: sortOrder === 'asc' ? 1 : -1 }, pages: { pages: sortOrder === 'asc' ? 1 : -1 } };
  const sort = sortOptions[sortBy] || { publishDate: 1 }; // Sort by publishDate, rating, or pages ascending or descending

  if (title) filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search for title
  if (author) filter.author = { $regex: author, $options: 'i' }; // Case-insensitive search for author
  if (startYear) filter.publishDate = { ...filter.publishDate, $gte: new Date(startYear) };
  if (endYear) filter.publishDate = { ...filter.publishDate, $lte: new Date(endYear) };
  if (genres) filter.genres = { $all: genres.split(',').map(g => g.trim()) }; // Search by genres
  if (available === 'true') filter.amountOfCopies = { $gt: 0 }; // Check if copies are available

  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const coll = client.db('atsiskaitymas').collection('books');
    const cursor = coll.find(filter).sort(sort).skip(skip).limit(parsedLimit);
    const result = await cursor.toArray();
    res.status(200).json(result);

    await client.close();
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Fetch a single book by ID
app.get('/api/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const coll = client.db('atsiskaitymas').collection('books');
    const book = await coll.findOne({ _id: id });

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.status(200).json(book);
    }

    await client.close();
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});