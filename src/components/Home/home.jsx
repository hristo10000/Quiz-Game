import React, { useEffect } from 'react';
import PlayButton from '../Button/Button';
import instance from '../../utils/Requests';

function Home() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const ws = new WebSocket(`ws://192.168.182.94:8001/ws/invitations/${token}/`);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'game_connect', data: 'ok' }));
      console.log('connected');
    };

    ws.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data);
      console.log(type, data);
    };

    ws.onerror = (e) => {
      console.log(e);
    };

    ws.onclose = (e) => {
      console.log('CLOSED', e);
    };
  });

  const [user, setUser] = React.useState({});

  useEffect(() => {
    instance.get('/api/players/me/').then(({ data }) => setUser(data));
  }, []);

  return (
    <>
      <h1>{user?.username}</h1>
      <PlayButton />
    </>
  );
}

export default Home;
