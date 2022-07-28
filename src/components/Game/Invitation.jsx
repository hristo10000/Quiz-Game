import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomButton from '../Button/Button';

function Invitation({
  invitedBy, gameId, channel, message,
}) {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <h5>{`${invitedBy} ${message}`}</h5>
      <div className="flex-row">
        <CustomButton text="Accept" onClick={() => navigate(`/game/${gameId}/${channel}`)} />
        {
        message === 'invited you to play!'
          ? (<CustomButton text="Decline" onClick={() => window.location.reload()} />)
          : (<CustomButton text="Decline" onClick={() => navigate('/home')} />)

}
      </div>
    </div>
  );
}

Invitation.defaultProps = {
  invitedBy: '',
  channel: '',
  gameId: '',
  message: '',
};

Invitation.propTypes = {
  invitedBy: PropTypes.string,
  channel: PropTypes.string,
  gameId: PropTypes.string,
  message: PropTypes.string,
};

export default Invitation;
