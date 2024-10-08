import { Book } from '../models/bookModel.js';

export const getAllBooks = async (req, res) => {
  const { title, author, startYear, endYear } = req.query;

  const filter = {};

  if (title) filter.title = { $regex: title, $options: 'i' }; 

  if (author) filter.author = { $regex: author, $options: 'i' }; 

  if (startYear) filter.publishDate = { ...filter.publishDate, $gte: new Date(startYear) };

  if (endYear) filter.publishDate = { ...filter.publishDate, $lte: new Date(endYear) };

  try {
    const books = await Book.find(filter);
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};