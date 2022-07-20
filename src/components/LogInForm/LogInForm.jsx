import React from 'react';
import axios from 'axios';

function LoginForm() {
  const [formValue, setformValue] = React.useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // store the states in the form data
    const loginFormData = new FormData();
    loginFormData.append('username', formValue.username);
    loginFormData.append('password', formValue.password);

    console.log(loginFormData);

    try {
      // make axios post request
      await axios({
        method: 'post',
        url: 'http://192.168.182.94:8001/api/accounts/login/',
        data: loginFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((resp) => {
        console.log(resp.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
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
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
