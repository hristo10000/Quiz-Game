import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const [setformValue] = React.useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChangeOnUsername = (event) => {
    setformValue.username = event.target.value;
  };

  const handleChangeOnPassword = (event) => {
    setformValue.password = event.target.value;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: setformValue.username,
      password: setformValue.password,
    };
    await axios.post('http://192.168.182.94:8001/api/accounts/register/', data).then((response) => {
      localStorage.setItem('token', response.data.token);
    });
    navigate('/ProfilePage');
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input label="username" htmlFor="username" placeholder="enter a username" required onChange={handleChangeOnUsername} />
        <input label="password" htmlFor="password" type="password" placeholder="enter a password" required onChange={handleChangeOnPassword} />
        <input type="submit" />
      </form>
    </>
  );
}
export default SignUpForm;
