import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.cinesimul.xyz/api',
});

export default api;
