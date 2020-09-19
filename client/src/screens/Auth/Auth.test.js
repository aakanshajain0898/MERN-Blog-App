// __tests__/signin.js
// again, these first two imports are something you'd normally handle in
// your testing framework configuration rather than importing them in every file.
import '@testing-library/jest-dom';
import React from 'react';
// import API mocking utilities from Mock Service Worker.
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import testing utilities
import { fireEvent, screen } from '@testing-library/react';
import { renderWithUserStateRouter } from '../../utility/test-utility';
import Auth from './Auth';

const fakeUserResponse = {
  token: 'some-token',
  user: 'some-user',
  message: 'some-message',
};

const server = setupServer(
  rest.post('/signin', (req, res, ctx) => res(ctx.json(fakeUserResponse)))
);

describe('<Auth />', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  });

  test('allows the user to signin successfully', async () => {
    renderWithUserStateRouter(<Auth />);

    // fill out the form
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'aakansha@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByText(/sign/i));

    // const toast = await screen.getByText(/message/i);
    // expect(toast).toHaveTextContent(fakeUserResponse.message);
    // screen.debug();
    // expect(window.localStorage.getItem('jwt')).toEqual(fakeUserResponse.token);
    // expect(window.localStorage.getItem('user')).toEqual(fakeUserResponse.user);
  });

  test('handles signin server exceptions', async () => {
    // Respond with "500 Internal Server Error" status for this test.
    server.use(
      rest.post('/signin', (req, res, ctx) => res(ctx.json(fakeUserResponse)))
    );

    renderWithUserStateRouter(<Auth />);

    // fill out the form
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'aakansha@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByText(/sign/i));
    // const toast = await screen.getByText(/error/i);
    //   expect(toast).toHaveTextContent('Internal server error');
    expect(window.localStorage.getItem('jwt')).toBeNull();
    expect(window.localStorage.getItem('user')).toBeNull();
  });

  test('allows the user to signup successfully', async () => {
    server.use(
      rest.post('/signup', (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ error: 'Internal server error' }))
      )
    );
    renderWithUserStateRouter(<Auth />);

    fireEvent.click(screen.getByText(/account/i));

    // fill out the form
    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: 'aakansha' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'aakansha@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByText(/sign/i));

    // const toast = await screen.getByText(/message/i);
    // expect(toast).toHaveTextContent(fakeUserResponse.message);
  });

  test('handles signup server exceptions', async () => {
    // Respond with "500 Internal Server Error" status for this test.
    server.use(
      rest.post('/signup', (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ error: 'Internal server error' }))
      )
    );

    renderWithUserStateRouter(<Auth />);

    fireEvent.click(screen.getByText(/account/i));

    // fill out the form
    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: 'aakansha' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'aakansha@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByText(/sign/i));
    // const toast = await screen.getByText(/error/i);
    //   expect(toast).toHaveTextContent('Internal server error');
  });
});
