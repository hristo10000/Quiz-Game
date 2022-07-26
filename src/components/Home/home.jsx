import React, { useEffect } from 'react';
import instance from '../../utils/Requests';
import CustomButton from '../Button/Button';

function Home() {
  const [username, setUsername] = React.useState('');
  const navigate = useNavigate();
  useEffect(() => {
    instance.get('/api/players/me/').then(({ data }) => localStorage.setItem('user', JSON.parse(data)));
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    instance.defaults.headers.common.Authorization = `Token ${token}`;
    const ws = new WebSocket(`ws://192.168.182.94:8001/ws/invitations/${token}/`);

    ws.onopen = () => {
      console.log('connected');
    };

    ws.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data);
      localStorage.setItem('gameChannel', data.channel);
      console.log(type, data);
      if (data.invited === ) {
        navigate('/accept');
      }
    };
  });
  const sendInvite = () => {
      instance.post('/api/games/', { username }).then(({ data }) => {
        navigate(`/game/${data.id}/${data.channel}`);
      });
  };
  const handleChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  return (
    <>
      {/* <Header /> */}
      {
        invitation && <AcceptInvite invited_by />
      }
      <h1></h1>
      <Link to="/logout"><CustomButton text="Log Out" /></Link>
      <div className="InviteSearch">
        <input onChange={handleChange} type="text" placeholder="enter username of another player" />
        <input onClick={sendInvite} type="submit" value="Invite" />
      </div>
    </>
  );
}

export default Home;
