import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch/BookSearch';
import ShelfList from './Shelf/ShelfList';
import Loader from './Loader';
import { filterByType, inArray } from './helpers/helpers';

import './App.css'

class BooksApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      read: [],
      books: [],
      wantToRead: [],
      searchResults: [],
      currentlyReading: [],
      isLoading: true,
    }

    this.onBookSearch = this.onBookSearch.bind(this);
    this.onBookUpdate = this.onBookUpdate.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(res => {
        this.setState({
          books: res,
          isLoading: false,
          read: filterByType(res, { shelf: 'read' }).map((r) => r.id),
          wantToRead: filterByType(res, { shelf: 'wantToRead' }).map((r) => r.id),
          currentlyReading: filterByType(res, { shelf: 'currentlyReading' }).map((r) => r.id)
        });
      });
  }

  onBookSearch(e) {
    let query = e.target.value;
    this.setState({ isLoading: true });

    if(!query) {
      this.cleanSearch();
      return;
    }
    
    BooksAPI.search(query, 20)
      .then(res => {
        let results = res.length > 0 ? res.filter((r) => r.shelf === 'none') : [];
        
        results = this.mapSearchResults(results, this.state);
        
        this.setState((prev) => ({
          isLoading: false,
          searchResults: results
        }));
      });
  }

  onBookUpdate(e, book) {
    let shelf = e.target.value;
    let bookCopy = Object.assign({}, book, { shelf });
   
    this.setState({ isLoading: true });
    BooksAPI.update({ id: book.id }, shelf)
      .then(res => {
        let { read, wantToRead, currentlyReading } = res;
        let results = this.state.searchResults;

        results = this.mapSearchResults(results, res);
         
        this.setState((prev) => ({
          read,
          wantToRead,
          currentlyReading,
          isLoading: false,
          searchResults: results,
          books: prev.books.filter(f => f.id !== book.id).concat([bookCopy]),
        }));
      });
  }

  render() {
    return (
      <div className="app">
          { this.state.isLoading && <Loader /> }
          <Route
            exact path="/search"
            render={() => (
              <BookSearch
                searchResults={this.state.searchResults}
                onCloseClick={this.cleanSearch}
                onBookUpdate={this.onBookUpdate}
                onBookSearch={this.onBookSearch}/>
            )} />
          <Route 
            exact path="/" render={() => (
              <ShelfList
                onBookUpdate={this.onBookUpdate}
                books={this.state.books} />
          )} />
      </div>
    )
  }

  mapSearchResults (results, ref) {
    let { read, wantToRead, currentlyReading } = ref;

    return results.map((r) => {
      if(inArray(r.id, read)) {
        r.shelf = 'read';
      } else if(inArray(r.id, wantToRead)) {
        r.shelf = 'wantToRead';
      } else if(inArray(r.id, currentlyReading)) {
        r.shelf = 'currentlyReading';
      }

      return r;
    });
  }

  cleanSearch() {
    this.setState((prev) => ({
      isLoading: false,
      searchResults: []
    }));
  }
}

export default BooksApp
