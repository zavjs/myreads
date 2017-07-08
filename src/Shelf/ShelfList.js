import React from 'react';
import Shelf from './Shelf.js';
import { Link } from 'react-router-dom';

const ShelfList = ({ books, onBookUpdate }) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        <Shelf
          title="Currently Reading"
          books={books && books.length > 0 && books.filter((f) => f.shelf === 'currentlyReading')}
          onBookUpdate={onBookUpdate} />
        <Shelf
          title="Want to Read"
          books={books && books.length > 0 && books.filter((f) => f.shelf === 'wantToRead')}
          onBookUpdate={onBookUpdate} />
        <Shelf
          title="Read"
          books={books && books.length > 0 && books.filter((f) => f.shelf === 'read')}
          onBookUpdate={onBookUpdate} />
      </div>
    </div>
    <div className="open-search">
      <Link to="/search">
        Add a book
      </Link>
    </div>
  </div>
);

export default ShelfList;
