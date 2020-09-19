import React, { useContext, useRef, useEffect } from 'react';
import { UserContext } from '../../context/userContext/userContext';
import { ThemeContext } from '../../context/themeContext';
import Icon from '../Icon/Icon';
import LinkItem from '../LinkItem/LinkItem';
import RenderNavList from './RenderNavList/RenderNavList';
import Modal from './Modal/Modal';
import M from 'materialize-css';

const NavBar = () => {
  const { state } = useContext(UserContext);
  const { background, foreground } = useContext(ThemeContext).theme;
  const searchModal = useRef(null);

  useEffect(() => {
    let sidenav = document.querySelector('#nav-mobile');
    M.Sidenav.init(sidenav, {});
    M.Modal.init(searchModal.current);
  }, []);

  return (
    <nav>
      <div className='nav-wrapper' style={{ background }}>
        <LinkItem
          link={state ? '/' : '/signin'}
          label='My Blogging Site'
          className='brand-logo'
        />
        <a href='#!' data-target='nav-mobile' className='sidenav-trigger'>
          <Icon style={{ color: foreground }} label='menu' />
        </a>
        <ul className='right hide-on-med-and-down'>
          <RenderNavList user={state} />
        </ul>
        <ul className='sidenav' id='nav-mobile' style={{ background }}>
          <RenderNavList user={state} />
        </ul>
        {state && (
          <Icon
            data-target='modal'
            position='modal-trigger right'
            style={{ color: foreground }}
            label='search'
          />
        )}
      </div>
      <Modal
        userId={state ? state._id : ''}
        background={background}
        foreground={foreground}
        ref={searchModal}
      />
    </nav>
  );
};

export default NavBar;
