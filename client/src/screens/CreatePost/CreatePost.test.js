import '@testing-library/jest-dom';
import React from 'react';
// import API mocking utilities from Mock Service Worker.
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import testing utilities
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '../../utility/test-utility';
import CreatePost from './CreatePost';

const fakeUserResponse = { message: 'some-message' };

const server = setupServer(
  rest.post('/createpost', (req, res, ctx) => res(ctx.json(fakeUserResponse)))
);

afterAll(() => server.close());
afterEach(() => server.resetHandlers());
beforeAll(() => server.listen());

describe('<CreatePost />', () => {
  test('allows the user to create successfully', async () => {
    renderWithRouter(<CreatePost />);

    // fill out the form
    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: 'title' },
    });
    fireEvent.change(screen.getByPlaceholderText(/body/i), {
      target: { value: 'body' },
    });

    fireEvent.click(screen.getByTestId('button'));

    // const toast = await screen.getByText(/message/i);
    // expect(toast).toHaveTextContent(fakeUserResponse.message);
  });

  test('handles server exceptions', async () => {
    // Respond with "500 Internal Server Error" status for this test.
    server.use(
      rest.post('/createpost', (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ error: 'Internal server error' }))
      )
    );

    renderWithRouter(<CreatePost />);

    // fill out the form
    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: 'title' },
    });
    fireEvent.change(screen.getByPlaceholderText(/body/i), {
      target: { value: 'body' },
    });

    fireEvent.click(screen.getByTestId('button'));
    // const toast = await screen.getByText(/error/i);
    //   expect(toast).toHaveTextContent('Internal server error');
  });
});
