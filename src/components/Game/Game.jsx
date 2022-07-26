import React from 'react';

import './Game.css';
import { useParams } from 'react-router-dom';
import instance from '../../utils/Requests';
import cache from '../../utils/cache';

function Game() {
  const { id, channel } = useParams();
  const me = cache.get('me');
  const gameInfo = cache.get('game_info');
  console.log(me.token);
  console.log(channel);
  // console.log(gameInfo);
  return (
    <div className="lobby">
      <div className="player">
        <img className="image-for-game" src={gameInfo.players[0].avatar} alt="img" />
        <h1>{gameInfo.players[0].username}</h1>
      </div>
      <div className="vs-sign">VS</div>
      <div className="player">
        <img className="image-for-game" src={gameInfo.players[1].avatar} alt="img" />
        <h1>{gameInfo.players[1].username}</h1>
      </div>
    </div>
  );
}

export default Game;
