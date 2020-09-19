import '@testing-library/jest-dom';
import React from 'react';
// import API mocking utilities from Mock Service Worker.
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import testing utilities
import { fireEvent, screen } from '@testing-library/react';
import { renderWithUserStateRouter } from '../../utility/test-utility';
import EditProfile from './EditProfile';

const fakeUserResponse = {
  result: { name: 'some-name' },
  message: 'some-message',
};

const server = setupServer(
  rest.put('/edit-profile', (req, res, ctx) => res(ctx.json(fakeUserResponse)))
);

describe('<EditProfile />', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    localStorage.removeItem('user');
  });

  test('allows the user to edit profile successfully', async () => {
    renderWithUserStateRouter(<EditProfile />);

    // fill out the form
    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: 'aakansha' },
    });

    fireEvent.click(screen.getByTestId('button'));

    // const toast = await screen.getByText(/message/i);
    // expect(toast).toHaveTextContent(fakeUserResponse.message);
    // expect(window.localStorage.getItem('user')).toEqual(fakeUserResponse.user);
  });

  test('handles server exceptions', async () => {
    // Respond with "500 Internal Server Error" status for this test.
    server.use(
      rest.put('/edit-profile', (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ error: 'Internal server error' }))
      )
    );

    renderWithUserStateRouter(<EditProfile />);

    // fill out the form
    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: 'aakansha' },
    });

    fireEvent.click(screen.getByTestId('button'));
    // const toast = await screen.getByText(/error/i);
    // expect(toast).toHaveTextContent('Internal server error');
    expect(window.localStorage.getItem('user')).toBeNull();
  });
});
