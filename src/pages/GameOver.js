import React, { useEffect, useState } from 'react';
import { useScore } from '../contexts/ScoreContext';
import { StyledTitle } from '../styled/Random';
import { StyledCharacter } from '../styled/Game';
import CTA from '../styled/CTA';
import { useAuth0 } from '@auth0/auth0-react';

export default function GameOver({ history }) {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState('');
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  if (score === -1) {
    history.push('/');
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const token = await getAccessTokenSilently();
        const options = {
          method: 'POST',
          body: JSON.stringify({ name: user['https://type/username'], score }),
          headers: {
            Authorization: `Bearer ${token}`
          }
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
    if (isAuthenticated) {
      saveHighScore();
    }
  }, [score, isAuthenticated, user, getAccessTokenSilently]);
  return (
    <div>
      <StyledTitle>Game Over</StyledTitle>
      {!isAuthenticated && <h3>Login or signup to record high scores!</h3>}
      <div>{scoreMessage}</div>
      <StyledCharacter>{score}</StyledCharacter>
      <CTA to='/game'>Play Again?</CTA>
    </div>
  );
}
