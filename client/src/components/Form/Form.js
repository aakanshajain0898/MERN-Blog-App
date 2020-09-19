import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Input from './Input/Input';
import { ThemeContext } from '../../context/themeContext';
import { updateObject } from '../../utility/utility';
import './Form.css';

export default class Form extends Component {
  static contextType = ThemeContext;
  static propsTypes = {
    controls: PropTypes.exact({
      elementType: PropTypes.string.isRequired,
      elementConfig: PropTypes.exact({
        type: PropTypes.string,
        placeholder: PropTypes.string.isRequired,
      }).isRequired,
      value: PropTypes.string.isRequired,
      validation: PropTypes.object.isRequired,
      valid: PropTypes.bool.isRequired,
      touched: PropTypes.bool.isRequired,
    }).isRequired,
    btnMsg: PropTypes.string,
    fromType: PropTypes.string,
    heading: PropTypes.element,
    children: PropTypes.element,
    formDataSubmitHandler: PropTypes.func,
    updateFormValueHandler: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      controls: props.controls,
      formIsValid: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.controls !== this.props.controls) {
      this.setState({ controls: this.props.controls });
    }
  }

  prepareData = () => {
    let data = {};
    for (let key in this.state.controls) {
      data[key] = this.state.controls[key].value;
    }
    return data;
  };

  submitHandler = (event) => {
    event.preventDefault();
    const data = this.prepareData();
    this.props.formDataSubmitHandler(data);
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    let value;
    if (controlName === 'image') {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value,
        valid: this.checkValidity(
          value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });
    let formIsValid = true;
    for (let controlName in updatedControls) {
      formIsValid = updatedControls[controlName].valid && formIsValid;
    }

    this.setState({ controls: updatedControls, formIsValid }, () => {
      // For InLine Form
      if (this.props.updateFormValueHandler) {
        const data = this.prepareData();
        data.valid = formIsValid;
        this.props.updateFormValueHandler(data);
      }
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({ id: key, config: this.state.controls[key] });
    }
    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        id={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        valid={formElement.config.valid}
        validation={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        // For InLine form
        inputClass={this.props.fromType ? 'col' : ''}
      />
    ));

    return (
      <div
        className={this.props.fromType || 'mycard card auth-card input-field'}
        style={{ background: this.context.theme.background }}
      >
        <form onSubmit={this.submitHandler}>
          {this.props.heading}
          {form}
          {this.props.btnMsg && (
            <Button
              btnType='btn-success btn-block'
              disabled={!this.state.formIsValid}
              label={this.props.btnMsg}
            />
          )}
        </form>
        {this.props.children}
      </div>
    );
  }
}
