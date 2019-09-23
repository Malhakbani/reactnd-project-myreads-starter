import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class ListBooks extends React.Component {
  state = {};

  handleChangeShelf = (bookId, e) => {
    let shelfbook = this.props.booksShelf;
    const book = shelfbook.filter(x => x.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: shelfbook
      });
    });
  };

  render() {
    const {booksShelf} = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            key="currently"
            books={booksShelf.filter(book => book.shelf === "currentlyReading")}
            onChangeShelf={this.handleChangeShelf}
            shelftitle="Currently Reading"
          />
          <BookShelf
            key="wantToRead"
            books={booksShelf.filter(book => book.shelf === "wantToRead")}
            onChangeShelf={this.handleChangeShelf}
            shelftitle="Want to Read"
          />
          <BookShelf
            key="read"
            books={booksShelf.filter(book => book.shelf === "read")}
            onChangeShelf={this.handleChangeShelf}
            shelftitle="Read"
          />
        </div>
        <div className="open-search">
          <Link to="/search">
          <button className="open-search">
            Add a book
            </button>
            </Link>
        </div>
      </div>
    );
  }
}
export default ListBooks;