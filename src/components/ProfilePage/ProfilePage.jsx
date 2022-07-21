import React from 'react';
import axios from 'axios';
import Helper from '../Helper';

function ProfilePage() {
  const token = localStorage.getItem('token').split(',')[0];
  const id = localStorage.getItem('token').split(',')[1];
  Helper(token);
  axios.get(`${window.ip}api/player/${id}/`);
  return (<p>a</p>);
}

export default ProfilePage;
