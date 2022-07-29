import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cache from '../utils/cache';
import CustomButton from './Button/Button';
import instance from '../utils/Requests';
import Invitation from './Game/Invitation';
import rightArrow from '../images/rightArrow.png';
import leftArrow from '../images/leftArrow.png';
import '../App.css';
import './Game/Game.css';

function EndGame() {
  const winner = cache.get('winner');
  const loser = cache.get('loser');
  const me = cache.get('me');
  const winnerAvatar = localStorage.getItem('winnerAvatar');
  const loserAvatar = localStorage.getItem('loserAvatar');
  const [invitation, setInvitation] = React.useState('');
  const navigate = useNavigate();
  const [shownPlayer, setShownPlayer] = useState('winner');

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
    if (me?.username === usernameOfWinner) {
      instance.post('/api/games/', { username: usernameOfLoser }).then(({ data }) => {
        navigate(`/game/${data.id}/${data.channel}`);
      });
    } else {
      instance.post('/api/games/', { username: usernameOfWinner }).then(({ data }) => {
        navigate(`/game/${data.id}/${data.channel}`);
      });
    }
  };

  const handleChangeShownPlayer = () => (shownPlayer === 'winner' ? setShownPlayer('loser') : setShownPlayer('winner'));

  return (
    <>
      {invitation ? (
        <Invitation
          invitedBy={invitation.invited_by.username}
          gameId={invitation.game_id.toString()}
          channel={invitation.channel}
          message="want`s rematch!"
        />
      ) : (
        <>
          <div className="flex-row">

            {shownPlayer === 'winner' ? (
              <>
                <button type="button" onClick={handleChangeShownPlayer} className="arrowButton"><img className="arrowImg" src={leftArrow} alt="arrow" /></button>
                <div className="end-game-player-div">
                  <h1>Winner</h1>
                  <div className="end-game-player">
                    <img className="image-for-game" src={winnerAvatar} alt="img" />

                    <h6 className="username-lobby">{winner?.username}</h6>

                    <h3 className="score">
                      score:
                      {winner?.score}
                    </h3>

                  </div>
                </div>
                <button type="button" onClick={handleChangeShownPlayer} className="arrowButton"><img className="arrowImg" src={rightArrow} alt="arrow" /></button>
              </>
            ) : (
              <>
                <button type="button" onClick={handleChangeShownPlayer} className="arrowButton"><img className="arrowImg" src={leftArrow} alt="arrow" /></button>
                <div className="end-game-player-div">
                  <h1>Loser</h1>
                  <div className="end-game-player">
                    <img className="image-for-game" src={loserAvatar} alt="img" />

                    <h6 className="username-lobby">{loser?.username}</h6>

                    <h3 className="score">
                      score:
                      {loser?.score}
                    </h3>

                  </div>
                </div>
                <button type="button" onClick={handleChangeShownPlayer} className="arrowButton"><img className="arrowImg" src={rightArrow} alt="arrow" /></button>
              </>
            )}

          </div>

          <div className="flex-row">
            <CustomButton
              text="Home"
              onClick={handleHome}
            />
            <CustomButton
              text="Rematch"
              onClick={handleRematch}
            />
          </div>

        </>
      )}
      {' '}
    </>
  );
}

export default EndGame;
