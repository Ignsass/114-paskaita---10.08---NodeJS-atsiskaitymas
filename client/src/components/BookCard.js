import React from 'react';

const BookCard = ({ book, onReadMore }) => (
  <div className="book-card">
    <h2>{book.title}</h2>
    <p>{book.description.slice(0, 100)}...</p>
    <img src={book.imageUrl} alt={book.title} />
    <p>Author: {book.author}</p>
    <button onClick={onReadMore}>Read More</button>
  </div>
);

export default BookCard;