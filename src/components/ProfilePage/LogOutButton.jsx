import React from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../utils/Requests';

function LogOutButton() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    instance.get('/api/accounts/logout/');
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className="container">
      <div className="center">
        <button onClick={handleLogOut} type="button" className="btn">
          <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
            <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
            <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
          </svg>
          <span style={{ fontSize: 24 }}>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default LogOutButton;
