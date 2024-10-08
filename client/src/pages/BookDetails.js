import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>Author: {book.author}</p>
      <p>Genres: {book.genres.join(', ')}</p>
      <p>Public Date: {new Date(book.publicDate).toDateString()}</p>
      <p>Rating: {book.rating}</p>
      <p>Pages: {book.pages}</p>
      <p>Amount in Stock: {book.amount}</p>
    </div>
  );
};

export default BookDetails;
