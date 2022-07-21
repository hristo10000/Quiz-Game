import React from 'react';

function ProfilePage() {
  const token = localStorage.getItem('token');
  console.log(token);
  const UserInfo = localStorage.getItem('token')[1];
  console.log(UserInfo);
  return (<p>a</p>);
}

export default ProfilePage;
