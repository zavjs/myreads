import React from 'react';
import ShelfChanger from './ShelfChanger';
import { imageUrl } from '../helpers/helpers';

const ShelfBook = ({ book, onBookUpdate }) => (
  <li key={book.title}>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
            width: 128, height: 193,
            backgroundImage: imageUrl(book) }}>
        </div>
        <ShelfChanger
          book={book}
          onBookUpdate={onBookUpdate} />
      </div>
      <div className="book-title">{book.title}</div>
        <div className="book-authors">{book && book.authors && book.authors.join(', ')}</div>
    </div>
  </li>
);

export default ShelfBook;
