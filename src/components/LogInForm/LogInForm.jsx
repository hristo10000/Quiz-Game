import React from 'react';
import axios from 'axios';

function LoginForm() {
  const [formValue, setformValue] = React.useState({
    username: '',
    password: '',
  });

  const handleSubmit = async () => {
    // store the states in the form data
    const loginFormData = new FormData();
    loginFormData.append('username', formValue.email);
    loginFormData.append('password', formValue.password);
    try {
      // make axios post request
      // eslint-disable-next-line no-unused-vars
      const response = await axios({
        method: 'post',
        url: '/api/login',
        data: loginFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Login Form</p>
      <input
        type="username"
        name="username"
        required
        placeholder="enter username"
        value={formValue.email}
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
        Login
      </button>
    </form>
  );
}

export default LoginForm;
