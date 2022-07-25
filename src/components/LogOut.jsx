import { useNavigate } from 'react-router-dom';
import instance from '../utils/Requests';

function LogOut() {
  const navigate = useNavigate();
  localStorage.removeItem('token');
  instance.defaults.headers.common = {};
  instance.get('/api/accounts/logout/').then(() => navigate('/'));
}

export default LogOut;
