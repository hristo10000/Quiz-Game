import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomButton from '../Button/Button';

function Invitation({ invitedBy }) {
  const navigate = useNavigate();
  console.log(invitedBy);

  return (
    <>
      <h3>{`${invitedBy} invited you to play!`}</h3>
      <CustomButton text="Accept" onClick={() => navigate('/game')} />
    </>
  );
}

Invitation.propTypes = {
  invitedBy: PropTypes.string.isRequired,
};

export default Invitation;
