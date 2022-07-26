import React from 'react';
import './Game.css';
import instance from '../../utils/Requests';

function Lobby() {
  const [gameInfo, setGameInfo] = React.useState({});
  instance.get('/api/games/').then(({ data }) => setGameInfo(data));
  console.log(gameInfo);
  return (
    <div className="lobby">
      <div className="player">
        <h1>Player One</h1>
      </div>
      <div className="player">
        <h1>Player Two</h1>
      </div>
    </div>
  );
}

export default Lobby;
