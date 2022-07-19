import React from 'react';
import logo from '../../images/logo.png';

function HomePage() {
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" height={200} width={300} />
      <h2>Welcome to Quiz Quest</h2>
      <h5>The quest to become the best quizer.</h5>
    </>
  );
}

export default HomePage;
