import React from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../utils/Requests';

function LoginForm() {
  const [formValue, setformValue] = React.useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    instance.post(
      '/api/accounts/login/',
      {
        username: formValue.username,
        password: formValue.password,
      },
    ).then((response) => {
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    });
    // TODO: delete this useless code
    //   instance.defaults.headers.common.Authorization = `Token ${response.data.token}`;
    // });
    // instance.get('/api/players/me/');
    // navigate('/ProfilePage');
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
