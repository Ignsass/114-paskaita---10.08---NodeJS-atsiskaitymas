import React, { useState } from 'react';

const BookSearch = ({ onSearch }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ title, author, startYear, endYear });
  };

  return (
    <form className="book-search-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Start Year"
        value={startYear}
        onChange={(e) => setStartYear(e.target.value)}
      />
      <input
        type="number"
        placeholder="End Year"
        value={endYear}
        onChange={(e) => setEndYear(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default BookSearch;