import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../utils/Requests';
import cache from '../../utils/cache';
import CustomButton from '../Button/Button';
import eyeOpened from '../../images/password-eye.jpg';
import eyeClosed from '../../images/password-eye-slashed.jpg';

function LoginForm() {
  const [formValue, setformValue] = React.useState({
    username: '',
    password: '',
  });
  const [passwordType, setPasswordType] = useState('password');
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
  const handlePasswordTypeChange = () => (passwordType === 'password' ? setPasswordType('text') : setPasswordType('password'));

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
      <div>
        <input
          className="custom-form-element"
          type={passwordType}
          name="password"
          required
          placeholder="enter password"
          value={formValue.password}
          onChange={handleChange}
        />
        <button
          className="eye"
          type="button"
          onClick={handlePasswordTypeChange}
        >
          {passwordType === 'text'
            ? <img src={eyeClosed} alt="eye" width="43px" height="30px" /> : <img src={eyeOpened} alt="eye" width="43px" height="30px" />}
        </button>
      </div>
      <CustomButton
        className="custom-form-element"
        type="submit"
        text="Submit"
      />
    </form>
  );
}

export default LoginForm;
