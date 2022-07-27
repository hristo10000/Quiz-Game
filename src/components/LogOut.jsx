import { useNavigate } from 'react-router-dom';
import instance from '../utils/Requests';

function LogOut() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  instance.defaults.headers.common.Authorization = `Token ${token}`;
  instance.get('/api/accounts/logout/').then(() => {
    localStorage.removeItem('token');
    instance.defaults.headers.common = {};
    navigate('/');
  });
}

export default LogOut;
