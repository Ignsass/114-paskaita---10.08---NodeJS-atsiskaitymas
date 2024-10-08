// models/bookModel.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  genres: [String],
  pages: { type: Number, required: true },
  publishDate: { type: Date, required: true },
  rating: { type: Number, required: true },
  amountOfCopies: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

// Here, the third argument 'books' tells Mongoose the exact collection name to use.
export const Book = mongoose.model('Book', bookSchema, 'books');