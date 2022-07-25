import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../Button/Button';

function AcceptPage(props) {
  return (
    <>
      <p>You have been invited to play!</p>
      <p>{}</p>
      <p>{}</p>
      <Link to="/home"><CustomButton text="Accept" /></Link>
      <Link to="/home"><CustomButton text="Decline" /></Link>
    </>
  );
}

export default AcceptPage;
