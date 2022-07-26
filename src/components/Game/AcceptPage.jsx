import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../Button/Button';

function AcceptPage() {
  const navigate = useNavigate();
  return (
    <>
      <h3>{`${1} invited you to play!`}</h3>
      <CustomButton text="Accept" onClick={navigate('/game')} />
    </>
  );
}

export default AcceptPage;
