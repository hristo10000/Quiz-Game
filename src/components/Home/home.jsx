import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../utils/Requests';
import CustomButton from '../Button/Button';

function Home() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    instance.defaults.headers.common.Authorization = `Token ${token}`;
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
      <Link to="/logout"><CustomButton text="Log Out" /></Link>
      <Link to="/invite"><CustomButton text="Play" /></Link>

    </>
  );
}

export default Home;
