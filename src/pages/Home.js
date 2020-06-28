import React, { useEffect, useCallback } from 'react';
import CTA from '../styled/CTA';
import { Accent, StyledTitle } from '../styled/Random';
export default function Home({ history }) {
  const keyUpHandler = useCallback(
    e => {
      if (e.key === 's') {
        history.push('/game');
      }
    },
    [history]
  );
  useEffect(() => {
    document.addEventListener('keyup', keyUpHandler);
    return () => {
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [keyUpHandler]);
  return (
    <div>
      <StyledTitle>Ready to type?</StyledTitle>
      <CTA to='/game'>
        Click or type <Accent>'s'</Accent> to start playing!
      </CTA>
    </div>
  );
}
