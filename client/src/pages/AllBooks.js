import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genres, setGenres] = useState([]);
  const [available, setAvailable] = useState(false);
  const [sortBy, setSortBy] = useState('publishDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedBook, setSelectedBook] = useState(null);
  const availableGenres = ["Fiction", "Non-Fiction", "Fantasy", "Science", "Mystery"];

  useEffect(() => {
    fetchBooks();
  }, [page, limit, title, author, genres, available, sortBy, sortOrder]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books', {
        params: {
          page,
          limit,
          title,
          author,
          genres: genres.join(','),
          available,
          sortBy,
          sortOrder,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1); 
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleGenreChange = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g) => g !== genre));
    } else {
      setGenres([...genres, genre]);
    }
  };

  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="all-books">
      <h1>All Books</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
          Available Only
        </label>
        <div className="genres">
          {availableGenres.map((genre) => (
            <label key={genre}>
              <input
                type="checkbox"
                value={genre}
                checked={genres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
              {genre}
            </label>
          ))}
        </div>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="publishDate">Publish Date</option>
          <option value="rating">Rating</option>
          <option value="pages">Pages</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <input
          type="number"
          min="1"
          value={limit}
          onChange={handleLimitChange}
          placeholder="Books per page"
        />
      </div>
      <div className="books">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <img src={book.imageUrl} alt={book.title} />
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Rating: {book.rating}</p>
            <button onClick={() => openModal(book)}>Read More</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>

      {selectedBook && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <img src={selectedBook.imageUrl} alt={selectedBook.title} />
            <h2>{selectedBook.title}</h2>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Genres:</strong> {selectedBook.genres.join(', ')}</p>
            <p><strong>Pages:</strong> {selectedBook.pages}</p>
            <p><strong>Publish Date:</strong> {new Date(selectedBook.publishDate).toLocaleDateString()}</p>
            <p><strong>Rating:</strong> {selectedBook.rating}</p>
            <p><strong>Description:</strong> {selectedBook.description}</p>
            <p><strong>Copies Available:</strong> {selectedBook.amountOfCopies}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllBooks;