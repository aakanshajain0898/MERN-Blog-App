import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { ThemeContext } from '../../context/themeContext';
import { postData, showToast } from '../../utility/utility';

const Reset = () => {
  const { foreground } = useContext(ThemeContext).theme;
  const history = useHistory();
  const resetForm = {
    email: {
      elementType: 'input',
      elementConfig: { type: 'email', placeholder: 'Email' },
      value: '',
      validation: { required: true, isEmail: true },
      valid: false,
      touched: false,
    },
  };

  const submitHandler = async ({ email }) => {
    try {
      const data = await postData('/reset-password', { email });
      showToast(data);
      if (data.messsage) {
        history.replace('/signin');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      controls={resetForm}
      formDataSubmitHandler={submitHandler}
      btnMsg='Reset password'
      heading={<h2 style={{ color: foreground }}>My Blogging Site</h2>}
    />
  );
};

export default Reset;
