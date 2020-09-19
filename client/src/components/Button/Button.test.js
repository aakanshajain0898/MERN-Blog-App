import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import Button from './Button';

afterEach(cleanup);

describe('<Button />', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button label='click me please' />, div);
  });

  test('renders button correctly', () => {
    const { getByTestId } = render(<Button label='click me please' />);
    expect(getByTestId('button')).toHaveTextContent('click me please');
  });

  test('renders button correctly', () => {
    const { getByTestId } = render(<Button label='save' />);
    expect(getByTestId('button')).toHaveTextContent('save');
  });
});
