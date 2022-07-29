import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import instance from '../../utils/Requests';
import CustomButton from '../Button/Button';
import Invitation from '../Game/Invitation';
import cache from '../../utils/cache';

function Home() {
  const [username, setUsername] = React.useState('');
  const [invitation, setInvitation] = React.useState('');
  const [topTenUsersInfo, setTopTenUsersInfo] = useState(null);
  const me = cache.get('me');
  const navigate = useNavigate();
  const sendInvite = () => {
    instance.post('/api/games/', { username }).then(({ data }) => {
      navigate(`/game/${data.id}/${data.channel}`);
    });
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    instance.defaults.headers.common.Authorization = `Token ${token}`;
    const ws = new WebSocket(`ws://192.168.182.94:8001/ws/invitations/${token}/`);
    console.log('here');
    instance.get('/api/players/').then((res) => {
      setTopTenUsersInfo(res.data);
      console.log(res.data);
    });

    ws.onmessage = (e) => {
      const { data } = JSON.parse(e.data);
      if (data.invited === me.username) {
        setInvitation(data);
      }
    };
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };
  return (
    <div className="page">
      <Link to="/logout" className="logout-button"><CustomButton text="Log Out" /></Link>
      {invitation ? (
        <Invitation
          invitedBy={invitation.invited_by.username}
          gameId={invitation.game_id.toString()}
          channel={invitation.channel}
          message="invited you to play!"
        />
      ) : (
        <>
          <div className="home-page">
            <h1>{me?.username}</h1>
            <div className="invite-div">
              <input onChange={handleChange} type="text" placeholder="enter opponent's username" className="invite-input" onKeyPress={(e) => e.key === 'Enter' && sendInvite()} />
              <CustomButton onClick={sendInvite} type="submit" text="Invite" />

            </div>
          </div>
          <div className="leaderboard" />

        </>
      )}
    </div>
  );
}

export default Home;
