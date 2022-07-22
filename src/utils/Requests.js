import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.182.94:8001',
});

export default instance;
