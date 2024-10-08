import React from 'react';

const BookModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{book.title}</h2>
        <img src={book.imageUrl} alt={book.title} />
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <p><strong>Genres:</strong> {book.genres.join(', ')}</p>
        <p><strong>Pages:</strong> {book.pages}</p>
        <p><strong>Publish Date:</strong> {new Date(book.publishDate).toDateString()}</p>
        <p><strong>Rating:</strong> {book.rating}</p>
        <p><strong>Amount of Copies:</strong> {book.amountOfCopies}</p>
      </div>
    </div>
  );
};

export default BookModal;