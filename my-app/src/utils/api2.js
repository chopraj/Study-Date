import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/constants';

// Create an instance of axios
const api2 = axios.create({
  baseURL: '/api'
});

export default api2;
