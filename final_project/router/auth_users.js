const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
    return users.some(user => user.username === username && user.password === password);
}

// only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!isValid(username) || !authenticatedUser(username, password)) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ username: username }, "your_secret_key");
    return res.status(200).json({ message: "Customer Logged In Successfully", token });
  }); 

// Add a book review
regd_users.put("/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review } = req.body;
    const username = req.user.username; // assuming user is authenticated and token is set in request
    const bookIndex = books.findIndex(book => book.ISBN === isbn);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }
    const existingReviewIndex = books[bookIndex].reviews.findIndex(review => review.username === username);
    if (existingReviewIndex !== -1) {
      // Modify existing review
      books[bookIndex].reviews[existingReviewIndex].review = review;
    } else {
      // Add new review
      books[bookIndex].reviews.push({ username: username, review: review });
    }
    return res.status(200).json({ message: "Review added/modified successfully" });
  });  

// Delete a book review
regd_users.delete("/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const username = req.user.username; // assuming user is authenticated and token is set in request
    const bookIndex = books.findIndex(book => book.ISBN === isbn);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }
    const reviewIndex = books[bookIndex].reviews.findIndex(review => review.username === username);
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found" });
    }
    // Delete review
    books[bookIndex].reviews.splice(reviewIndex, 1);
    return res.status(200).json({ message: "Review deleted successfully" });
  });  

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
