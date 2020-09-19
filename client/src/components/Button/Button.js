import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../context/themeContext';

const Button = ({ label, clk, type = 'normal', disabled }) => {
  const { background, foreground } = useContext(ThemeContext).theme;
  let btnClass = '#64b5f6 blue darken-1';
  let btnStyle = {};
  if (type === 'danger') {
    btnClass = '#c62828 red darken-3';
  } else if (type === 'modal') {
    btnClass = 'modal-close';
    btnStyle = { background, color: foreground };
  } else if (type === 'transparent') {
    btnClass = 'N/A transparent';
    btnStyle = { background, color: foreground };
  }

  return (
    <button
      data-testid='button'
      className={'btn waves-effect waves-light ' + btnClass}
      disabled={disabled}
      onClick={clk}
      style={{ margin: '10px', ...btnStyle }}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  clk: PropTypes.func,
  type: PropTypes.oneOf(['danger', 'modal', 'transparent', 'normal']),
  disabled: PropTypes.bool,
};

Button.defaultProps = { label: 'Click Me!', disabled: false };

export default Button;
