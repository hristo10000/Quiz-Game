import React from 'react';

function EndGame() {
  return (
    <h1>
      The Winner is
      {' '}
      {localStorage.getItem('winner')}
      {' '}
      with score:
      {' '}
      {localStorage.getItem('score')}
    </h1>
  );
}

export default EndGame;
