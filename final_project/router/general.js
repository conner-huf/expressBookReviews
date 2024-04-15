const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if username already exists
  if (isValid(username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Add new user
  users.push({ username, password });

  return res.status(200).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    const bookList = JSON.stringify(books);
    return res.status(200).json({ books: bookList });
  });
  
// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books.find(book => book.ISBN === isbn);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(book);
  });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const booksByAuthor = books.filter(book => book.author === author);
    if (booksByAuthor.length === 0) {
      return res.status(404).json({ message: "Books by this author not found" });
    }
    return res.status(200).json(booksByAuthor);
  });
  
// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const booksWithTitle = books.filter(book => book.title.includes(title));
    if (booksWithTitle.length === 0) {
      return res.status(404).json({ message: "Books with this title not found" });
    }
    return res.status(200).json(booksWithTitle);
  });
  
// Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books.find(book => book.ISBN === isbn);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ ISBN: isbn, reviews: book.reviews });
  });  

module.exports.general = public_users;
