import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
  StyledLink,
  StyledButtonLink
} from '../styled/Navbar';
import { StyledButton } from '../styled/Buttons';
import { Accent } from '../styled/Random';
import { useAuth0 } from '@auth0/auth0-react';

export default function Navbar({ toggleTheme }) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <StyledNavbar>
      <StyledNavBrand>
        <Link to='/'>
          <Accent>Type.</Accent>
        </Link>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to='/'>Home</StyledLink>
        </li>
        <li>
          <StyledLink to='/highScores'>High Scores</StyledLink>
        </li>
        {!isAuthenticated && (
          <li>
            <StyledButtonLink onClick={loginWithRedirect}>
              Login
            </StyledButtonLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <StyledButtonLink onClick={logout}>Log Out</StyledButtonLink>
          </li>
        )}
        <li>
          <StyledButton onClick={toggleTheme}>Toggle Theme</StyledButton>
        </li>
      </StyledNavItems>
    </StyledNavbar>
  );
}
