import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../context/themeContext';

const NavLinkItem = ({ link, exact, label, children }) => {
  const { foreground } = useContext(ThemeContext).theme;
  return (
    <li>
      <NavLink
        data-testid='navlink'
        to={link}
        exact={exact}
        activeClassName='active'
      >
        {children ? (
          children
        ) : (
          <span style={{ color: foreground }}>{label}</span>
        )}
      </NavLink>
    </li>
  );
};

NavLinkItem.prototype = {
  link: PropTypes.string.isRequired,
  exact:PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.element,
};

export default NavLinkItem;
