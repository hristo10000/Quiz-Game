import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import instance from '../../utils/Requests';
import CustomButton from '../Button/Button';
import eyeOpened from '../../images/password-eye.jpg';
import eyeClosed from '../../images/password-eye-slashed.jpg';

function SignUpForm() {
  const [setformValue] = React.useState({
    username: '',
    password: '',
  });
  const [passwordType, setPasswordType] = useState('password');
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
    await axios.post(`${window.ip}api/accounts/register/`, data).then((response) => {
      localStorage.setItem('token', response.data.token);
      instance.defaults.headers.common.Authorization = `Token ${response.data.token}`;
    });
    navigate('/ProfilePage');
  };

  const handlePasswordTypeChange = () => (passwordType === 'password' ? setPasswordType('text') : setPasswordType('password'));

  return (
    <form onSubmit={handleSubmit} className="custom-form">
      <h3>Sign Up</h3>
      <h4>Enter Your Credentials</h4>
      <input className="custom-form-element" label="username" htmlFor="username" placeholder="enter a username" required onChange={handleChangeOnUsername} />
      <div>
        <input
          className="custom-form-element"
          type={passwordType}
          name="password"
          required
          placeholder="enter password"
          onChange={handleChangeOnPassword}
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
      <CustomButton className="custom-form-element" type="submit" text="Submit" />
    </form>
  );
}
export default SignUpForm;
