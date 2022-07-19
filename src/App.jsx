import React from 'react';
import { Link } from 'react-router-dom';
import HomePage from './components/Home/home';
import SignUpButton from './components/SignUpButton/SignUpButton';
import LogInButton from './components/LoginButton/LoginButton';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HomePage />
      </header>
      <main>
        <div className="toFlex">
          <Link className="container" to="/LogIn"><LogInButton /></Link>
          <Link className="container" to="/SignUp"><SignUpButton /></Link>
        </div>
      </main>
    </div>
  );
}

export default App;
