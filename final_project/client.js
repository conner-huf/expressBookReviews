const axios = require('axios');

async function registerUser(username, password) {
  try {
    const response = await axios.post('http://localhost:5000/register', {
      username,
      password
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function loginUser(username, password) {
  try {
    const response = await axios.post('http://localhost:5000/customer/login', {
      username,
      password
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function addReview(isbn, review) {
  try {
    const response = await axios.put(`http://localhost:5000/customer/review/${isbn}`, {
      review
    }, {
      headers: {
        Authorization: `Bearer ${your_token}` // replace `your_token` with the actual token
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}