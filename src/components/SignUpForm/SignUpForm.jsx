import React from 'react';

function SignUpForm() {
  return (
    <>
      <h2>Sign Up</h2>
      <form>
        <input label="username" htmlFor="username" required="true" />
        <input label="password" htmlFor="password" required="true" />
        <input type="submit" />
      </form>
    </>
  );
}

export default SignUpForm;
