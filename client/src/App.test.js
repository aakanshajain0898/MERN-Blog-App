import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  test('renders title of react app', () => {
    const { getAllByText } = render(<App />);
    const titleElement = getAllByText(/my blogging site/i);
    titleElement.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
