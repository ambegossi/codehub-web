import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/ambegossi/codehub-api',
});

export default api;
