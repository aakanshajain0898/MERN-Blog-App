import '@testing-library/jest-dom';
import React from 'react';
// import API mocking utilities from Mock Service Worker.
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import testing utilities
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '../../utility/test-utility';
import Reset from './Reset';

const fakeResponse = { message: 'some-message' };

const server = setupServer(
  rest.post('/reset-password', (req, res, ctx) => res(ctx.json(fakeResponse)))
);

describe('<Reset />', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  test('allows the user to reset password successfully', async () => {
    renderWithRouter(<Reset />);

    // fill out the form
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'aakansha@gmail.com' },
    });

    fireEvent.click(screen.getByTestId('button'));

    // const toast = await screen.getByText(/message/i);
    // expect(toast).toHaveTextContent(fakeUserResponse.message);
  });

  test('handles server exceptions', async () => {
    // Respond with "500 Internal Server Error" status for this test.
    server.use(
      rest.post('/reset-password', (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ error: 'Internal server error' }))
      )
    );

    renderWithRouter(<Reset />);

    // fill out the form
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'aakansha@gmail.com' },
    });

    fireEvent.click(screen.getByTestId('button'));
    //   const toast = await screen.getByText(/error/i);
    //   expect(toast).toHaveTextContent('Internal server error');
  });
});
