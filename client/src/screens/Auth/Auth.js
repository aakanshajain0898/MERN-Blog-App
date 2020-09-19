import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import LinkItem from '../../components/LinkItem/LinkItem';
import { postData, showToast, uploadPic } from '../../utility/utility';
import { USER } from '../../context/types';
import { UserContext } from '../../context/userContext/userContext';
import { ThemeContext } from '../../context/themeContext';

const Auth = () => {
  const { dispatch } = useContext(UserContext);
  const { foreground } = useContext(ThemeContext).theme;
  const history = useHistory();
  const [isSignUp, setIsSignUp] = useState(false);

  const signinForm = {
    email: {
      elementType: 'input',
      elementConfig: { type: 'email', placeholder: 'Email' },
      value: '',
      validation: { required: true, isEmail: true },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: { type: 'password', placeholder: 'Password' },
      value: '',
      validation: { required: true, minLength: 6 },
      valid: false,
      touched: false,
    },
  };

  const signupForm = {
    name: {
      elementType: 'input',
      elementConfig: { type: 'text', placeholder: 'Name' },
      value: '',
      validation: { required: true },
      valid: false,
      touched: false,
    },
    ...signinForm,
    image: {
      elementType: 'file',
      elementConfig: { placeholder: 'Upload Pic' },
      value: '',
      valid: true,
      touched: false,
    },
  };

  const PostData = async (action) => {
    try {
      const authData = { email: action.email, password: action.password };
      let url = '/signin';
      if (isSignUp) {
        authData.name = action.name;
        authData.pic = action.pic;
        url = '/signup';
      }
      const data = await postData(url, authData);
      showToast(data);
      if (data.message) {
        if (!isSignUp) {
          dispatch({ type: USER, payload: data.user });
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('jwt', data.token);
          history.replace('/');
        } else {
          history.replace('/auth');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async (action) => {
    try {
      if (action.image) {
        action.pic = await uploadPic(action.image);
      } else {
        action.pic = undefined;
      }
      PostData(action);
    } catch (err) {
      console.log(err);
    }
  };

  const switchAuthModeHandler = () => setIsSignUp((prevState) => !prevState);

  return (
    <Form
      controls={isSignUp ? signupForm : signinForm}
      formDataSubmitHandler={submitHandler}
      btnMsg={isSignUp ? 'Sign Up' : 'Sign In'}
      heading={<h2 style={{ color: foreground }}>My Blogging Site</h2>}
    >
      <Button
        type='transparent'
        clk={switchAuthModeHandler}
        label={
          isSignUp ? 'Already have an account ?' : "Don't have an account ?"
        }
      />
      <h6>
        <LinkItem link='/reset' label='Forgot Password ?' />
      </h6>
    </Form>
  );
};

export default Auth;
