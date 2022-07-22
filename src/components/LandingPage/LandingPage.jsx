import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

function LandingPage() {
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" height={300} width={450} />
      <h2>Welcome to Quiz Quest</h2>
      <h3>The quest to become the best quizer.</h3>
      <div className="toFlex">
        <Link className="container" to="/Login"><LogInButton /></Link>
        <Link className="container" to="/Register"><SignUpButton /></Link>
      </div>
    </>
  );
}

export default LandingPage;
