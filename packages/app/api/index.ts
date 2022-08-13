import axios from 'axios';

const api = axios.create({
  baseURL: 'http://backend.cinesimul.xyz/api',
});

export default api;
