import React, { useEffect, useState } from 'react';
import { useScore } from '../contexts/ScoreContext';
import { StyledLink } from '../styled/Navbar';
import { StyledCharacter } from '../styled/Game';
import CTA from '../styled/CTA';

export default function GameOver({ history }) {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState('');
  if (score === -1) {
    history.push('/');
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const options = {
          method: 'POST',
          body: JSON.stringify({ name: 'James', score })
        };
        const res = await fetch('/.netlify/functions/SaveHighScores', options);
        const data = await res.json();
        if (data.id) {
          setScoreMessage('You got a high score!');
        } else {
          setScoreMessage('Not a high score. Sorry!');
        }
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    saveHighScore();
  });
  return (
    <div>
      <h1>Game Over</h1>
      <StyledCharacter>{score}</StyledCharacter>
      <div>{scoreMessage}</div>
      <CTA to='/game'>Play Again?</CTA>
    </div>
  );
}
