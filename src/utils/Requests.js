import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.182.94:8001',
});
const token = localStorage.getItem('token');
instance.defaults.headers.common.Authorization = `Token ${token}`;

export default instance;
