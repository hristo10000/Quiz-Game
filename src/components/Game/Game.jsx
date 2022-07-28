import React, { useState, useRef, useEffect } from 'react';
import './Game.css';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../../utils/Requests';
import CustomButton from '../Button/Button';
import cache from '../../utils/cache';

function Game() {
  const { id, channel } = useParams();
  const [currentSocket, setCurrentSocket] = useState(null);
  const [gameInfo, setGameInfo] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);
  const [gameStatus, setGameStatus] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [startOfQuestion, setStartOfQuestion] = useState(null);
  const navigate = useNavigate();

  const Ref = useRef(null);

  const [timer, setTimer] = useState('00');

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total, seconds,
    };
  };

  const startTimer = (e) => {
    const {
      total, seconds,
    } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(seconds);
    }
  };

  const clearTimer = (e) => {
    setTimer('10');
    if (Ref.current) clearInterval(Ref.current);
    const idTimer = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = idTimer;
  };

  const getDeadTime = () => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);
  const ResetTimer = () => {
    clearTimer(getDeadTime());
  };

  useEffect(() => {
    instance.get(`/api/games/${id}/`).then((res) => setGameInfo(res.data));
    const gameWs = new WebSocket(`ws://192.168.182.94:8001/ws/game/${localStorage.getItem('token')}/${channel}/`);
    setCurrentSocket(gameWs);
    gameWs.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data);
      if (type === 'question_update') {
        ResetTimer();
        setAnswerStatus('not answered');
        setStartOfQuestion(new Date());
        if (gameStatus !== 'ongoing') {
          setGameStatus('ongoing');
        }
        setQuestion(data.content);
        setAnswers(data.answers);
      }
      if (type === 'game_update') {
        if (data.state === 'in_progress') {
          setFirstPlayerScore(Object.entries(data.data.score)[1][1]);
          setSecondPlayerScore(Object.entries(data.data.score)[0][1]);
        }
        if (data.state === 'finished') {
          localStorage.setItem('winner', data.winner.username);
          if (data.winner.username === data.players[1].username) {
            cache.set('winner', { score: Object.entries(data.data.score)[0][1], username: Object.entries(data.data.score)[0][0] });
            cache.set('loser', { score: Object.entries(data.data.score)[1][1], username: Object.entries(data.data.score)[1][0] });
          } else {
            cache.set('winner', { score: Object.entries(data.data.score)[1][1], username: Object.entries(data.data.score)[1][0] });
            cache.set('loser', { score: Object.entries(data.data.score)[0][1], username: Object.entries(data.data.score)[0][0] });
          }
          navigate('/end');
        }
      }
    };
  }, []);

  const [status, setStatus] = useState();

  const handleClickReady = (event) => {
    event.preventDefault();
    if (status === 'ready') { setStatus('not ready'); } else {
      setStatus('ready');
    }
    currentSocket.send(JSON.stringify({ type: 'game_connect', data: 'ok' }));
  };

  const handleAnswerGiving = (idOfAnswer) => {
    const timeofAnswer = new Date();
    const secondsPassed = timeofAnswer.getTime() - startOfQuestion.getTime();
    if (secondsPassed > 10000) {
      currentSocket.send(JSON.stringify({ type: 'question_answer', data: { answer: null, time: 10000 - secondsPassed } }));
    } else {
      currentSocket.send(JSON.stringify({ type: 'question_answer', data: { answer: idOfAnswer, time: 10000 - secondsPassed } }));
    }
    setAnswerStatus('answered');
  };
  return (
    <>
      {
        (gameStatus !== 'ongoing' && gameInfo) ? (
          <div className="lobby">

            <div className="players-div">

              <div className="player">

                <img className="image-for-game" src={gameInfo?.players[0].avatar} alt="img" />

                <h6 className="username-lobby">{gameInfo.players[0].username}</h6>

              </div>

              <div className="vs-sign">VS</div>

              <div className="player">

                <img className="image-for-game" src={gameInfo.players[1].avatar} alt="img" />

                <h6 className="username-lobby">{gameInfo.players[1].username}</h6>

              </div>

            </div>
            <div>
              {status === 'ready'
                ? <p className="waiting-text">Waiting for your opponent...</p>
                : (
                  <CustomButton text="Ready!" onClick={handleClickReady} />
                )}
            </div>
          </div>

        ) : null
      }

      {question
        ? (
          <>
            <div className="scores">
              <h3>
                {gameInfo.players[0].username}
                `s score is:
                {' '}
                {firstPlayerScore}
              </h3>
              <h3>
                {gameInfo.players[1].username}
                `s score is:
                {' '}
                {secondPlayerScore}
              </h3>
            </div>
            <h2>{timer}</h2>
            <h2>{question}</h2>
            {answerStatus !== 'answered' ? (
              <div className="answers">
                <div className="rows">
                  <div className="left-answer">
                    <CustomButton
                      text={answers[0].content}
                      onClick={() => handleAnswerGiving(answers[0].id)}
                    />
                  </div>
                  <div className="right-answer">
                    <CustomButton
                      text={answers[1].content}
                      onClick={() => handleAnswerGiving(answers[1].id)}
                    />
                  </div>
                </div>
                <div className="rows">
                  <div className="left-answer">
                    <CustomButton
                      text={answers[2].content}
                      onClick={() => handleAnswerGiving(answers[2].id)}
                    />
                  </div>
                  <div className="right-answer">
                    <CustomButton
                      text={answers[3].content}
                      onClick={() => handleAnswerGiving(answers[3].id)}
                    />
                  </div>
                </div>
              </div>
            ) : <p className="waitong-text">Waiting for your opponent to answer...</p>}
          </>
        )
        : ''}
    </>
  );
}
export default Game;
