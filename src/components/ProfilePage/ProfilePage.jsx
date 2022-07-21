import React from 'react';
import Instance from '../../utils/Requests';

function ProfilePage() {
  const obj = Instance.get('/api/players/me/');
  console.log(obj);
  return (<p>a</p>);
}

export default ProfilePage;
