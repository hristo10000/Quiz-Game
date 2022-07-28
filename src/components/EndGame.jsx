import React from 'react';
import cache from '../utils/cache';

function EndGame() {
  const winner = cache.get('winner');
  const loser = cache.get('loser');
  return (
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

    </>
  );
}

export default EndGame;
