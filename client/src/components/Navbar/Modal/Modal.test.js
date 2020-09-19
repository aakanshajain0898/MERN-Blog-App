import React from 'react';
import '@testing-library/jest-dom';
// import API mocking utilities from Mock Service Worker.
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import testing utilities
import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';

const fakeUserResponse = {
  user: { id: 'some-userId', email: 'some-userEmail' },
};

const server = setupServer(
  rest.post('/search-users', (req, res, ctx) => res(ctx.json(fakeUserResponse)))
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('<Modal />', () => {
  test('renders correctly', () => {
    const { queryByTestId, queryByPlaceholderText } = render(<Modal />);
    expect(queryByTestId('button')).toBeTruthy();
    expect(queryByPlaceholderText(/search/i)).toBeTruthy();
  });

  describe('Input value', () => {
    test('update on change triggers fetchUsers function', async () => {
      const { queryByTestId, queryByPlaceholderText,debug } = render(<Modal />);
      const searchInput = queryByPlaceholderText(/search/i);
      fireEvent.change(searchInput, { target: { value: 'test' } });
      expect(searchInput.value).toBe('test');
      const link = await queryByTestId('link');
      // debug()
      // fireEvent.click(link);
    });

    test('handles server exceptions', async () => {
      // Respond with "500 Internal Server Error" status for this test.
      server.use(
        rest.post('/search-users', (req, res, ctx) =>
          res(ctx.status(500), ctx.json({ error: 'Internal server error' }))
        )
      );

      const { queryByTestId, queryByPlaceholderText } = render(<Modal />);
      const searchInput = queryByPlaceholderText(/search/i);
      fireEvent.change(searchInput, { target: { value: 'test' } });
      expect(searchInput.value).toBe('test');
      fireEvent.click(queryByTestId('button'));
    });
  });
});
