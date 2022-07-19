import HomePage from './components/Home/home.js'
import './App.css';
import React from 'react';
function App() {
  return (
    <React.Fragment>
    <div className="App">
      <header className="App-header">
        <HomePage></HomePage>
      </header>
      <main>
        if(userIsLoggedIn){
          <LogoutButton>Logout</LogoutButton>
        }else{
          <LoginButton>Login</LoginButton>
          <SignUpButton>Sign Up</SignUpButton>
        }
      </main>
    </div>
    </React.Fragment>
  );
}

export default App;
