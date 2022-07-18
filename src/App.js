import logo from './images/logo.png';
import './App.css';
import React from 'react';
function App() {
  return (
    <React.Fragment>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
    </React.Fragment>
  );
}

export default App;
