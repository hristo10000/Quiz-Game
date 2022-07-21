import React from 'react';
import axios from 'axios';
import Helper from '../Helper';
import PlayButton from './PlayButton';

function ProfilePage() {
  const token = localStorage.getItem('token').split(',')[0];
  const id = localStorage.getItem('token').split(',')[1];
  Helper(token);
  axios.get(`${window.ip}api/player/${id}/`);
  return (
    <>
      <h1>{token}</h1>
      <PlayButton />
    </>
  );
}

export default ProfilePage;
