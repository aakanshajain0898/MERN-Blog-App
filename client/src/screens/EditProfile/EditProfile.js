import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/userContext/userContext';
import { UPDATEPROFILE } from '../../context/types';
import Form from '../../components/Form/Form';
import { showToast, updateData } from '../../utility/utility';

const EditProfile = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  const editProfileForm = {
    name: {
      elementType: 'input',
      elementConfig: { type: 'text', placeholder: 'Name' },
      value: state ? state.name : '',
      validation: { required: true },
      valid: true,
      touched: true,
    },
  };

  const submitHandler = async ({ name }) => {
    try {
      const data = await updateData('/edit-profile', { name });
      showToast(data);
      if (data.message) {
        dispatch({ type: UPDATEPROFILE, payload: data.result.name });
        localStorage.setItem(
          'user',
          JSON.stringify({ ...state, name: data.result.name })
        );
        history.replace('/profile');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      controls={editProfileForm}
      formDataSubmitHandler={submitHandler}
      btnMsg='Update Profile'
    />
  );
};

export default EditProfile;
