import React from 'react';
import ShelfBook from '../Shelf/ShelfBook';
import { Debounce } from 'react-throttle';
import { Link } from 'react-router-dom';

const BookSearch = ({ searchResults, onBookSearch, onBookUpdate, onCloseClick }) => (
  <div className="search-books">
    <div className="search-books-bar">
      <Link
        onClick={onCloseClick}
        to="/" className="close-search">
        Close
      </Link>
      <div className="search-books-input-wrapper">
        <Debounce time="400" handler="onChange">
          <input
            type="text"
            onChange={onBookSearch}
            placeholder="Search by title or author"/>
        </Debounce>
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
        { !!searchResults.length && searchResults.map(r =>
          <ShelfBook
            key={r.id}
            book={r}
            onBookUpdate={onBookUpdate} />
        )}
      </ol>
    </div>
  </div>
);

export default BookSearch;
