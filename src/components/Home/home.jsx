import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../../utils/Requests';
import CustomButton from '../Button/Button';

function Home() {
  const [username, setUsername] = React.useState('');
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();
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

  useEffect(() => {
    instance.get('/api/players/me/').then(({ data }) => setUser(data));
  }, []);

  const SendInvite = () => {
    if (username === user?.username) { instance.post('/api/games/', { username }).then(navigate('/lobby')); }
  };
  const handleChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };
  return (
    <>
      <h1>{user?.username}</h1>
      <Link to="/logout"><CustomButton text="Log Out" /></Link>
      <div className="InviteSearch">
        <input onChange={handleChange} type="text" placeholder="enter username of another player" />
        <input onClick={SendInvite} type="submit" value="Invite" />
      </div>
    </>
  );
}

export default Home;
