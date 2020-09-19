import React from 'react';
import Input from './Input';

export default { component: Input, title: 'Components/Input' };

const Template = (args) => <Input {...args} />;

export const Input1 = Template.bind({});
Input1.storyName = 'Email Input';
Input1.args = {
  elementType: 'input',
  elementConfig: { type: 'email', placeholder: 'Email' },
  value: '',
  validation: { required: true, isEmail: true },
  valid: false,
  touched: false,
  id: 'email',
};

export const Input2 = Template.bind({});
Input2.storyName = 'Password Input';
Input2.args = {
  elementType: 'input',
  elementConfig: { type: 'password', placeholder: 'Password' },
  value: '',
  validation: { required: true, minLength: 6 },
  valid: false,
  touched: false,
  id: 'password',
};

export const Input3 = Template.bind({});
Input3.storyName = 'Text Input';
Input3.args = {
  elementType: 'input',
  elementConfig: { type: 'text', placeholder: 'Text' },
  value: 'Some Text',
  validation: { required: true },
  valid: true,
  touched: true,
  id: 'text',
};

export const Input4 = Template.bind({});
Input4.storyName = 'File Input';
Input4.args = {
  elementType: 'file',
  elementConfig: { placeholder: 'Upload Pic' },
  value: '',
  valid: true,
  touched: false,
  id: 'image',
};
