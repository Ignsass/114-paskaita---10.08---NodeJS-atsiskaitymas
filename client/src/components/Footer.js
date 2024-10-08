import React from 'react';

const Footer = () => (
  <footer>
    <div className="footer-icons">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-facebook"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram"></i>
      </a>
    </div>
    <p>© {new Date().getFullYear()} Library. All rights reserved.</p>
  </footer>
);

export default Footer;