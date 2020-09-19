import React from 'react';
import { renderWithRouter } from '../../../utility/test-utility';
import RenderNavList from './RenderNavList';

describe('<RenderNavList />', () => {
  test('should render two <NavLinkItem /> elements if not authenticated', () => {
    const { getAllByTestId } = renderWithRouter(<RenderNavList />);
    expect(getAllByTestId(/navlink/i)).toHaveLength(1);
  });

  test('should render five <NavigationItem /> elements if authenticated', () => {
    const { getAllByTestId } = renderWithRouter(
      <RenderNavList user='testing' />
    );
    expect(getAllByTestId(/navlink/i)).toHaveLength(5);
  });
});
