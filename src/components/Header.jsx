import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from './Button/Button';

function Header(user) {
  return (
    <>
      <h1>{user}</h1>
      <Link to="/logout"><CustomButton text="Log Out" /></Link>
    </>
  );
}

export default Header;
