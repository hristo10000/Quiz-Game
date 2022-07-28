import React, { useState, useEffect } from 'react';
import './Game.css';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../../utils/Requests';
import CustomButton from '../Button/Button';

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

  useEffect(() => {
    instance.get(`/api/games/${id}/`).then((res) => setGameInfo(res.data));
    const gameWs = new WebSocket(`ws://192.168.182.94:8001/ws/game/${localStorage.getItem('token')}/${channel}/`);
    setCurrentSocket(gameWs);
    gameWs.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data);
      if (type === 'question_update') {
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
          if (data.winner === data.players[0].username) { localStorage.setItem('score', Object.entries(data.data.score)[0][1]); } else { localStorage.setItem('score', Object.entries(data.data.score)[1][1]); }
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
      currentSocket.send(JSON.stringify({ type: 'question_answer', data: { answer: idOfAnswer, time: 10000 - secondsPassed } }));
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
                ? <p>Waiting for your oponent...</p>
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
            ) : <p>Waiting for your oponent to answer...</p>}
          </>
        )
        : ''}
    </>
  );
}
export default Game;
