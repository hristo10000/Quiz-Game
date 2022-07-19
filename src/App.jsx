import React from 'react';
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
          <LogInButton />
          <SignUpButton />
        </div>
      </main>
    </div>
  );
}

export default App;
