import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="logo">
      <Link to="/">
        <img src="https://media.istockphoto.com/id/1190838248/vector/techno-book-vector-logo-technology-education-symbol.jpg?s=612x612&w=0&k=20&c=0PDv24ka723qckLFV9bHK1GxtrVpgqU7cHHBVNUu5R4=" alt="Library Logo" />
      </Link>
    </div>
    <nav role="navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/books">All Books</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;