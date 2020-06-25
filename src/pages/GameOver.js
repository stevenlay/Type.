import React, { useEffect, useState } from 'react';
import { useScore } from '../contexts/ScoreContext';
import { StyledTitle } from '../styled/Random';
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
      } catch (err) {}
    };
    saveHighScore();
  });
  return (
    <div>
      <StyledTitle>Game Over</StyledTitle>
      <StyledCharacter>{score}</StyledCharacter>
      <div>{scoreMessage}</div>
      <CTA to='/game'>Play Again?</CTA>
    </div>
  );
}
