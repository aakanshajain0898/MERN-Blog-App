import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../../context/themeContext';
import './Input.scss';

const Input = ({
  valid,
  touched,
  validation,
  elementConfig,
  elementType,
  value,
  changed,
  id,
  inputClass,
}) => {
  const { foreground } = useContext(ThemeContext).theme;
  let inputElement = null;
  let validationError = null;
  const inputClasses = ['validate'];

  if (!valid && touched && validation) {
    inputClasses.push('invalid');
    validationError = (
      <p className='invalid'>
        Please enter a valid {elementConfig.placeholder}!
      </p>
    );
  }

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
          id={id}
          style={{ color: foreground }}
        />
      );
      break;

    case 'file':
      return (
        <div className='file-field input-field' style={{ margin: '10px' }}>
          <div className='btn #64b5f6 blue darken-1'>
            <span>{elementConfig.placeholder}</span>
            <input type='file' onChange={changed} />
          </div>
          <div className='file-path-wrapper'>
            <input
              className='file-path validate'
              type='text'
              style={{ color: foreground }}
            />
          </div>
        </div>
      );
    default:
      return;
  }

  return (
    <div className={inputClass}>
      <div className='input-field'>
        {inputElement}
        <label
          className={value ? 'active' : ''}
          style={{ color: foreground }}
          htmlFor={id}
        >
          {elementConfig.placeholder}
        </label>
        {validationError}
      </div>
    </div>
  );
};

Input.propTypes = {
  valid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  validation: PropTypes.object,
  elementConfig: PropTypes.exact({
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
  }).isRequired,
  elementType: PropTypes.oneOf(['input', 'file']).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  changed: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  inputClass: PropTypes.oneOf(['col', '']).isRequired,
};

export default Input;
