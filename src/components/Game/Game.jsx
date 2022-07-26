import React from 'react';

import './Game.css';
import instance from '../../utils/Requests';

function Lobby(gameToken) {
  const [gameInfo, setGameInfo] = React.useState({});
  console.log(gameToken);
  instance.defaults.headers.common = {};
  instance.defaults.headers.common.Authorization = `Token ${gameToken}`;
  instance.get('/api/games/').then(({ data }) => console.log(data));
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
