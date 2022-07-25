import React, { useEffect } from 'react';
import instance from '../../utils/Requests';
import AcceptInvite from '../Game/AcceptPage';

function Home() {
  const [username, setUsername] = React.useState('');
  const [invitation, setInvitation] = React.useState({});
  setInvitation(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    instance.defaults.headers.common.Authorization = `Token ${token}`;
    const ws = new WebSocket(`ws://192.168.182.94:8001/ws/invitations/${token}/`);

    ws.onopen = () => {
      console.log('connected');
    };

    ws.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data);
      console.log(type, data);
      if (data.invited === username) {
        setInvitation(data);
      }
    };

    ws.onerror = (e) => {
      console.log(e);
    };

    ws.onclose = (e) => {
      console.log('CLOSED', e);
    };
  });

  const handleChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const sendInvite = () => {
    instance.post('/api/games/', { username });
  };

  return (
    <>
      {/* <Header /> */}
      {
        invitation && <AcceptInvite invited_by />
      }
      <div className="invite-search">
        <input onChange={handleChange} type="text" placeholder="enter username of another player" />
        <input onClick={sendInvite} type="submit" value="Invite" />
      </div>
    </>
  );
}

export default Home;
