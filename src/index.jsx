import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import LandingPage from './components/LandingPage/LandingPage';
import LogIn from './components/LogInForm/LogInForm';
import SignUp from './components/SignUpForm/SignUpForm';
import LogOut from './components/LogOut';
import Game from './components/Game/Game';
import Invitation from './components/Game/Invitation';
import Home from './components/Home/home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/logout" element={<LogOut />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/game/:id/:channel" element={<Game />} />
      <Route path="/accept" element={<Invitation />} />
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
