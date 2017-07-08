import React from 'react';
import ShelfBook from './ShelfBook';

const Shelf = ({ title, books, onBookUpdate }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        { books && books.length > 0 && books.map((r) => (
            <ShelfBook
              key={r.id}
              book={r}
              onBookUpdate={onBookUpdate} />))}
      </ol>
    </div>
  </div>
);

export default Shelf;
