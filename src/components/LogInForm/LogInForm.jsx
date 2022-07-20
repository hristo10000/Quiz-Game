import React from 'react';

function SignUpForm() {
  return (
    <form>
      <input label="username" htmlFor="username" required="true" />
      <input label="password" htmlFor="password" required="true" />
      <input type="submit" />
    </form>
  );
}

export default SignUpForm;
