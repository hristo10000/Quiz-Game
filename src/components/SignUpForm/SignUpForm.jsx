import React from 'react';

function SignUpForm() {
  const [setformValue] = React.useState({
    username: '',
    password: '',
  });

  const handleChangeOnUsername = (event) => {
    setformValue.username = event.target.value;
  };

  const handleChangeOnPassword = (event) => {
    setformValue.password = event.target.value;
  };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  return (
    <>
      <h2>Sign Up</h2>
      <form>
        <input label="username" htmlFor="username" required onChange={handleChangeOnUsername} />
        <input label="password" htmlFor="password" required onChange={handleChangeOnPassword} />
        <input type="submit" />
      </form>
    </>
  );
}

export default SignUpForm;
