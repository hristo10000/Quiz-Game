import React, { useEffect } from 'react';
import instance from '../../utils/Requests';
import AcceptInvite from '../Game/AcceptPage';

function Home() {
  const [username, setUsername] = React.useState('');

  const [invitation, setInvitation] = React.useState({});
  setInvitation(undefined);

  const [user, setUser] = React.useState({});

  const navigate = useNavigate();
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
      if (data.invited === user.username) {
        navigate('/accept');
      }
      if (data.invited_by.username === user.username) {
        navigate('/game', { gameToken: data.channel });
      }
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

  // const sendInvite = () => {
  //   if (username !== user?.username) {
  //     instance.post('/api/games/', { username });
  //   } else {
  //     navigate('/home');
  //   }
  // };
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
