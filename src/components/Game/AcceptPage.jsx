/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../Button/Button';

function Invitation({ invited_by: invitedBy }) {
  const navigate = useNavigate();
  console.log(invitedBy);
  return (
    <>
      <h3>{`${invitedBy} invited you to play!`}</h3>
      <CustomButton text="Accept" onClick={navigate('/game')} />
    </>
  );
}

export default Invitation;
