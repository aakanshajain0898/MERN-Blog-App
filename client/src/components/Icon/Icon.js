import React from 'react';
import PropTypes from 'prop-types';
import './Icon.css';

const Icon = ({ label, position, ...props }) => (
  <i className={'material-icons ' + position} {...props}>
    {label}
  </i>
);

Icon.propTypes = {
  label: PropTypes.oneOf([
    'search',
    'menu',
    'delete',
    'edit',
    'favorite',
    'favorite_border',
  ]).isRequired,
  position: PropTypes.string,
};

export default Icon;
