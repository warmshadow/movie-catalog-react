import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const TOKEN = process.env.REACT_APP_BEARER_TOKEN;
const AUTH = `Bearer ${TOKEN}`;

const HEADERS = {
  Authorization: AUTH,
};

export default axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});
