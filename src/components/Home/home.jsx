import React from 'react';
import logo from '../../images/logo.png';

function HomePage() {
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" height={300} width={450} />
      <h2>Welcome to Quiz Quest</h2>
      <h3>The quest to become the best quizer.</h3>
    </>
  );
}

export default HomePage;
