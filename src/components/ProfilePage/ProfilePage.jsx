import React from 'react';
import PlayButton from './PlayButton';

function ProfilePage() {
  const token = localStorage.getItem('token');
  console.log(token);
  return (
    <>
      <h1>{token}</h1>
      <PlayButton />
    </>
  );
}

export default ProfilePage;
