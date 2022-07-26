import React from 'react';

import './Game.css';
import { useParams } from 'react-router-dom';
import instance from '../../utils/Requests';
import cache from '../../utils/cache';

function Game() {
  // const [gameInfo, setGameInfo] = React.useState({});
  const { id, channel } = useParams();
  const me = cache.get('me');
  console.log(me.token);
  console.log(channel);
  console.log(localStorage.getItem('user'));
  instance.get(`/api/games/${id}/`).then(({ data }) => console.log(data));
  // console.log(gameInfo);
  return (
    <div className="lobby">
      <div className="player">
        <h1>{}</h1>
      </div>
      <div className="player">
        <h1>Player Two</h1>
      </div>
    </div>
  );
}

export default Game;
