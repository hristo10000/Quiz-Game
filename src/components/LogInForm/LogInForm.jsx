import React from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../utils/Requests';
import cache from '../../utils/cache';
import CustomButton from '../Button/Button';

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
    ).then(({ data }) => {
      localStorage.setItem('token', data.token);
      instance.defaults.headers.common.Authorization = `Token ${data.token}`;
      cache.set('me', data.user);
      navigate('/home');
    });
  };
  const handleChange = (event) => {
    event.preventDefault();
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="custom-form">
      <h3>Log In</h3>
      <h4>Enter Your Credentials</h4>
      <input
        className="custom-form-element"
        type="username"
        name="username"
        required
        placeholder="enter username"
        value={formValue.username}
        onChange={handleChange}
      />
      <input
        className="custom-form-element"
        type="password"
        name="password"
        required
        placeholder="enter password"
        value={formValue.password}
        onChange={handleChange}
      />
      <CustomButton
        className="custom-form-element"
        type="submit"
        text="Submit"
      />
    </form>
  );
}

export default LoginForm;
