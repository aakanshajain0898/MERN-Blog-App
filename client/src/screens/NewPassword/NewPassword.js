import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { ThemeContext } from '../../context/themeContext';
import { postData, showToast } from '../../utility/utility';

const NewPassword = () => {
  const { foreground } = useContext(ThemeContext).theme;
  const history = useHistory();
  const { token } = useParams();
  console.log(token);

  const newPasswordForm = {
    password: {
      elementType: 'input',
      elementConfig: { type: 'password', placeholder: 'Password' },
      value: '',
      validation: { required: true, minLength: 6 },
      valid: false,
      touched: false,
    },
  };

  const submitHandler = async ({ password }) => {
    try {
      const data = await postData('/new-password', { password, token });
      showToast(data);
      if (data.message) {
        history.replace('/auth');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      controls={newPasswordForm}
      formDataSubmitHandler={submitHandler}
      btnMsg='Update Password'
      heading={<h2 style={{ color: foreground }}>My Blogging Site</h2>}
    />
  );
};

export default NewPassword;
