import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomButton from '../Button/Button';

function Invitation({ invitedBy, gameId, channel }) {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <h3>{`${invitedBy} invited you to play!`}</h3>
      <CustomButton text="Accept" onClick={() => navigate(`/game/${gameId}/${channel}`)} />
    </div>
  );
}

Invitation.defaultProps = {
  invitedBy: '',
  channel: '',
  gameId: '',
};

Invitation.propTypes = {
  invitedBy: PropTypes.string,
  channel: PropTypes.string,
  gameId: PropTypes.string,
};

export default Invitation;
