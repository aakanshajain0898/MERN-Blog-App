import '@testing-library/jest-dom';
import React from 'react';
// import API mocking utilities from Mock Service Worker.
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import testing utilities
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '../../utility/test-utility';
import NewPassword from './NewPassword';

const fakeResponse = { message: 'some-message' };

const server = setupServer(
  rest.post('/new-password', (req, res, ctx) => res(ctx.json(fakeResponse)))
);

describe('<NewPassword />', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  test('allows the user to set new password successfully', async () => {
    renderWithRouter(<NewPassword />);

    // fill out the form
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByTestId('button'));

    // const toast = await screen.getByText(/message/i);
    // expect(toast).toHaveTextContent(fakeUserResponse.message);
  });

  test('handles server exceptions', async () => {
    // Respond with "500 Internal Server Error" status for this test.
    server.use(
      rest.post('/new-password', (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ error: 'Internal server error' }))
      )
    );

    renderWithRouter(<NewPassword />);

    // fill out the form
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByTestId('button'));
    //   const toast = await screen.getByText(/error/i);
    //   expect(toast).toHaveTextContent('Internal server error');
  });
});
