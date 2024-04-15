const axios = require('axios');

async function getBooks() {
  try {
    const response = await axios.get('http://localhost:5000/books');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/books/${isbn}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:5000/books/author/${author}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:5000/books/title/${title}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}