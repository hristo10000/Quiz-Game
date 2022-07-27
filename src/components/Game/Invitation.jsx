import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomButton from '../Button/Button';

function Invitation({ invitedBy, channel }) {
  const navigate = useNavigate();
  return (
    <>
      <h3>{`${invitedBy} invited you to play!`}</h3>
      <button className="button-ready" type="button" onClick={() => navigate(`/game/${channel}`)}>
        <CustomButton text="Accept" />
        {' '}
      </button>
    </>
  );
}

Invitation.propTypes = {
  invitedBy: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
};

export default Invitation;
