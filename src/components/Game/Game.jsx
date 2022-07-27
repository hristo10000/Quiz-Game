import React, { useState, useEffect } from 'react';
import './Game.css';
import { useParams } from 'react-router-dom';
import instance from '../../utils/Requests';
import CustomButton from '../Button/Button';

function Game() {
  const { id, channel } = useParams();
  const [currentSocket, setCurrentSocket] = useState(null);
  const [gameInfo, setGameInfo] = useState(null);
  useEffect(() => {
    instance.get(`/api/games/${id}/`).then((res) => setGameInfo(res.data));
    const gameWs = new WebSocket(`ws://192.168.182.94:8001/ws/game/${localStorage.getItem('token')}/${channel}/`);
    setCurrentSocket(gameWs);
    gameWs.onopen = () => {
      console.log('connected');
    };
  }, []);

  const [status, setStatus] = useState();

  const handleClick = (event) => {
    event.preventDefault();
    if (status === 'ready') { setStatus('not ready'); } else {
      setStatus('ready');
    }
    currentSocket.send(JSON.stringify({ type: 'game_connect', data: 'ok' }));
  };
  return (
    <>
      {
      gameInfo
        ? (
          <>
            <div className="lobby">

              <div className="player">

                <img className="image-for-game" src={gameInfo?.players[0].avatar} alt="img" />

                <h1>{gameInfo.players[0].username}</h1>

              </div>

              <div className="vs-sign">VS</div>

              <div className="player">

                <img className="image-for-game" src={gameInfo.players[1].avatar} alt="img" />

                <h1>{gameInfo.players[1].username}</h1>

              </div>

            </div>
            <div>
              {status === 'ready'
                ? <p>Waiting for your oponent...</p>
                : (
                  <CustomButton text="Ready!" onClick={handleClick} />
                )}
            </div>

          </>
        )
        : 'Loading...'
    }
      <div />
    </>
  );
}

export default Game;
