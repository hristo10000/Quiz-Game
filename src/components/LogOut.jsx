import { useNavigate } from 'react-router-dom';
import instance from '../utils/Requests';

function LogOut() {
  instance.get('/api/accounts/logout/');
  localStorage.removeItem('token');
  const navigate = useNavigate();
  return (navigate('/home'));
}

export default LogOut;
