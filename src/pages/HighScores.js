import React, { useState, useEffect } from 'react';
import { ScoresList, ScoresLI } from '../styled/HighScores';
import { StyledTitle } from '../styled/Random';
export default function HighScores() {
  const [highScores, setHighScores] = useState([]);
  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch('/.netlify/functions/GetHighScores');
        const scores = await res.json();
        setHighScores(scores);
      } catch (err) {}
    };
    loadHighScores();
  }, []);
  return (
    <div>
      <StyledTitle>High Scores</StyledTitle>
      <ScoresList>
        {highScores.map(({ fields }, index) => (
          <ScoresLI key={index}>
            {index + 1}. {fields.name} - {fields.score}
          </ScoresLI>
        ))}
      </ScoresList>
    </div>
  );
}
