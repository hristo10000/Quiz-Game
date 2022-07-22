import React, { useState, useEffect } from 'react';
import instance from '../../utils/Requests';
import LogOutButton from './LogOutButton';
import PlayButton from './PlayButton';

function ProfilePage() {
  const [user, setUser] = useState({});
  useEffect(() => {
    instance.get('/api/players/me/').then(({ data }) => setUser(data));
  }, []);

  return (
    <>
      <h1>{user?.username}</h1>
      <PlayButton />
      <LogOutButton />
    </>
  );
}

export default ProfilePage;
