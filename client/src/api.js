import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/books',  // Make sure the port is correct
});

export default api;
