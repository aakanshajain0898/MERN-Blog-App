import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import UserState from '../context/userContext/userContext';

export const renderWithRouter = (component) => ({
  ...render(<BrowserRouter>{component}</BrowserRouter>),
});

export const renderWithUserStateRouter = (component) => ({
  ...render(
    <UserState>
      <BrowserRouter>{component}</BrowserRouter>
    </UserState>
  ),
});
