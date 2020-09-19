import React from 'react';
import PropTypes from 'prop-types';
import NavLinkItem from '../NavLinkItem';
import Button from '../../Button/Button';

const RenderNavList = ({ user }) => {
  if (user) {
    return [
      <NavLinkItem key='' link='/' label='Home' exact />,
      <NavLinkItem key='profile' link='/profile' label='Profile' />,
      <NavLinkItem key='create' link='/create' label='Create Post' />,
      <NavLinkItem key='explore' link='/explore' label='Explore' />,
      <NavLinkItem key='signout' link='/signOut'>
        <Button label='SignOut' type='danger' />
      </NavLinkItem>,
    ];
  } else {
    return [<NavLinkItem key='signin' link='/auth' label='SignIn / SignUp' />];
  }
};

RenderNavList.propTypes = { user: PropTypes.object };

RenderNavList.defaultProps = { user: null };

export default RenderNavList;
