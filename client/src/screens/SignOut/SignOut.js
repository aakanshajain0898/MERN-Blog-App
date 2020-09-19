import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/userContext/userContext';
import { CLEAR } from '../../context/types';

const SignOut = () => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    localStorage.clear();
    dispatch({ type: CLEAR });
  }, [dispatch]);

  return <Redirect to='/auth' />;
};

export default SignOut;
