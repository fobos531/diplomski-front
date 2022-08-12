import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  // baseURL: 'http://backend.cinesimul.xyz/api',
});

export default api;
