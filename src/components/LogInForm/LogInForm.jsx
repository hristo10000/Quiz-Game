import React from 'react';

function LogInForm() {
  return (
    <>
      <h2>Log In</h2>
      <form>
        <input label="username" htmlFor="username" required="true" />
        <input label="password" htmlFor="password" required="true" />
        <input type="submit" />
      </form>
    </>
  );
}

export default LogInForm;
