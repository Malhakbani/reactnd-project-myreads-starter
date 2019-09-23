import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import ListBooks from "./ListBooks";

class BooksApp extends React.Component {
  state = {
    books:[],
    showSearchPage: false
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }
  handleChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.getbooksShelf();
    });
  };

  getbooksShelf() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <ListBooks booksShelf={this.state.books} />} />
        <Route
          path="/search"
          render={() =>
            <SearchPage onChangeShelf={this.handleChangeShelf} booksShelf={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp
