import axios from 'axios';

function Helper(token) {
  axios.defaults.headers.common.Authorization = `Token ${token}`;
}

export default Helper;
