import axios from 'axios';
import keys from '../config/settings';

let conn = axios.create({
  baseURL: keys.apiURL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export const setToken = token => {
  conn.defaults.headers.common['Authorization'] = token;
};

export default conn;
