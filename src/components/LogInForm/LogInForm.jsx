import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formValue, setformValue] = React.useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginFormData = new FormData();
    loginFormData.append('username', formValue.username);
    loginFormData.append('password', formValue.password);

    await axios({
      method: 'post',
      url: `${window.ip}api/accounts/login/`,
      data: loginFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
    });
    navigate('/ProfilePage');
  };
  const handleChange = (event) => {
    event.preventDefault();
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Login Form</p>
      <input
        type="username"
        name="username"
        required
        placeholder="enter username"
        value={formValue.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        required
        placeholder="enter a password"
        value={formValue.password}
        onChange={handleChange}
      />
      <button
        type="submit"
      >
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
