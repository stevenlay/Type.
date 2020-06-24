import React from 'react';
import { useScore } from '../contexts/ScoreContext';
import CTA from '../styled/CTA';

export default function GameOver({ history }) {
  const [score] = useScore();
  if (score === -1) {
    history.push('/');
  }
  return (
    <div>
      <h1>Game Over</h1>
      <p>{score}</p>
      <CTA to='/'>Play Again?</CTA>
    </div>
  );
}
