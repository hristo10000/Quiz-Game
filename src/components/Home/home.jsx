import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import instance from '../../utils/Requests';
import CustomButton from '../Button/Button';
import Invitation from '../Game/Invitation';
import cache from '../../utils/cache';

function Home() {
  const [username, setUsername] = React.useState('');
  const [invitation, setInvitation] = React.useState('');
  const me = cache.get('me');

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    instance.defaults.headers.common.Authorization = `Token ${token}`;
    const ws = new WebSocket(`ws://192.168.182.94:8001/ws/invitations/${token}/`);

    ws.onmessage = (e) => {
      const { data } = JSON.parse(e.data);
      if (data.invited === me.username) {
        setInvitation(data);
      }
    };
  }, []);
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
      <h1>{me?.username}</h1>

      <Link to="/logout"><CustomButton text="Log Out" /></Link>

      <div className="InviteSearch">

        <input onChange={handleChange} type="text" placeholder="enter oponent's username" />

        <input onClick={sendInvite} type="submit" value="Invite" />

      </div>

      {invitation && (
      <Invitation
        invitedBy={invitation.invited_by.username}
        channel={invitation.channel}
      />
      ) }
    </>
  );
}

export default Home;
