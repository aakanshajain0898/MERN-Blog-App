import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../context/themeContext';

const LinkItem = ({ link, label, children, ...props }) => {
  const { foreground } = useContext(ThemeContext).theme;
  return (
    <Link data-testid='link' to={link} {...props}>
      {children ? children : <span style={{ color: foreground }}>{label}</span>}
    </Link>
  );
};

LinkItem.prototype = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.element,
};

LinkItem.defaultProps = { link: '#!', label: 'Click Me!' };

export default LinkItem;
