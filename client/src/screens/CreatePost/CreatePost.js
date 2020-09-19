import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  uploadPic,
  postData,
  updateData,
  fetchData,
  showToast,
} from '../../utility/utility';
import Form from '../../components/Form/Form';

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { postId } = useParams();
  const createPostForm = {
    title: {
      elementType: 'input',
      elementConfig: { type: 'text', placeholder: 'Title' },
      value: title,
      validation: { required: true },
      valid: title !== '',
      touched: title !== '',
    },
    body: {
      elementType: 'input',
      elementConfig: { type: 'text', placeholder: 'body' },
      value: body,
      validation: { required: true },
      valid: body !== '',
      touched: body !== '',
    },
    image: {
      elementType: 'file',
      elementConfig: { placeholder: 'Upload Pic' },
      value: '',
      valid: true,
      touched: false,
    },
  };

  useEffect(() => {
    if (postId) {
      fetchData(`/getpost/${postId}`)
        .then((result) => {
          setTitle(result.post.title);
          setBody(result.post.body);
        })
        .catch((err) => console.log(err));
    } else {
      setTitle('');
      setBody('');
    }
  }, [postId]);

  const uploadFields = async ({ title, body, photo }) =>
    await postData(
      '/createpost',
      { title, body, photo },
      { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
    );

  const updateFields = async ({ title, body, photo }) =>
    await updateData(`/editpost/${postId}`, { title, body, photo });

  const submitHandler = async (action) => {
    try {
      let data;
      if (!postId) {
        action.photo = await uploadPic(action.image);
        data = await uploadFields(action);
      } else {
        if (action.image) {
          action.photo = await uploadPic(action.image);
        } else if (postId) {
          action.photo = undefined;
        }
        data = await updateFields(action);
      }
      showToast(data);
      if (data.message) {
        history.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      controls={createPostForm}
      formDataSubmitHandler={submitHandler}
      btnMsg='Submit Post'
    />
  );
};

export default CreatePost;
