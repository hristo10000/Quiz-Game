import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cache from '../utils/cache';
import CustomButton from './Button/Button';
import instance from '../utils/Requests';
import Invitation from './Game/Invitation';

function EndGame() {
  const winner = cache.get('winner');
  const loser = cache.get('loser');
  const me = cache.get('me');
  const [invitation, setInvitation] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    instance.defaults.headers.common.Authorization = `Token ${token}`;
    const ws = new WebSocket(`ws://192.168.182.94:8001/ws/invitations/${token}/`);

    ws.onmessage = (e) => {
      const { data } = JSON.parse(e.data);
      if (data.invited === me.username) {
        setInvitation(data);
      }
    };
  }, []);

  const handleHome = () => {
    navigate('/home');
  };

  const handleRematch = () => {
    const usernameOfLoser = loser?.username;
    const usernameOfWinner = winner?.username;
    console.log(usernameOfLoser);
    console.log(usernameOfWinner);
    if (me?.username === usernameOfWinner) {
      instance.post('/api/games/', { username: usernameOfLoser }).then(({ data }) => {
        navigate(`/game/${data.id}/${data.channel}`);
      });
    } else {
      instance.post('/api/games/', { usernameOfWinner }).then(({ data }) => {
        navigate(`/game/${data.id}/${data.channel}`);
      });
    }
  };

  return (
    <>
      {invitation ? (
        <Invitation
          invitedBy={invitation.invited_by.username}
          gameId={invitation.game_id.toString()}
          channel={invitation.channel}
        />
      ) : (
        <>
          <h1>
            The Winner is
            {' '}
            {winner?.username}
            {' '}
            with score:
            {' '}
            {winner?.score}
          </h1>
          <h1>
            The Loser is
            {' '}
            {loser?.username}
            {' '}
            with score:
            {' '}
            {loser?.score}
          </h1>
          <CustomButton
            text="Home"
            onClick={handleHome}
          />
          <CustomButton
            text="Rematch"
            onClick={handleRematch}
          />
        </>
      )}
      {' '}
    </>
  );
}

export default EndGame;
