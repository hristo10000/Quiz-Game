import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import instance from '../../utils/Requests';
import logo from '../../images/logo.png';
import '../../App.css';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      instance.defaults.headers.common.Authorization = `Token ${token}`;
      navigate('/home');
    }
  }, []);

  return (
    <div className="landing-page">
      <h2>Welcome To</h2>
      <img src={logo} className="App-logo" alt="logo" height={380} width={560} />
      <h3>The quest to become the best quizer</h3>
      <div className="flex-row">
        <Link className="container" to="/Login"><Button text="Log In" /></Link>
        <Link className="container" to="/Register"><Button text="Sign Up" /></Link>
      </div>
    </div>
  );
}

export default LandingPage;
