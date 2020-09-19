import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../context/userContext/userContext';
import { fetchData, updateData, deleteData } from '../../utility/utility';
import HomeCard from './HomeCard/HomeCard';

const Home = ({ type }) => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext);
  useEffect(() => {
    let url;
    if (type === 'all') {
      url = '/allpost';
    } else {
      url = '/getsubpost';
    }
    fetchData(url)
      .then((result) => setData(result.posts))
      .catch((err) => console.log(err));
  }, [type]);

  const updatePostData = (result) => {
    console.log(result);
    const newData = data.map((item) => {
      if (item._id === result._id) {
        return result;
      } else {
        return item;
      }
    });
    setData(newData);
  };

  const likePost = async (postId) => {
    try {
      const result = await updateData(
        '/like',
        { postId },
        { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
      );
      updatePostData(result);
    } catch (err) {
      console.log(err);
    }
  };

  const unlikePost = async (postId) => {
    try {
      const result = await updateData(
        '/unlike',
        { postId },
        { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
      );
      updatePostData(result);
    } catch (err) {
      console.log(err);
    }
  };

  const makeComment = async (data, postId) => {
    try {
      const result = await updateData(
        '/comment',
        { postId, text: data.comment },
        { Authorization: 'Bearer ' + localStorage.getItem('jwt') }
      );
      updatePostData(result);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const result = await deleteData(`/deletecomment/${postId}/${commentId}`);
      updatePostData(result);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (postId) => {
    try {
      const result = await deleteData(`/deletepost/${postId}`);
      setData(data.filter((item) => item._id !== result.result._id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {data.length !== 0 ? (
        data.map((item) => (
          <HomeCard
            key={item._id}
            userId={state._id}
            post={item}
            likePost={likePost}
            unlikePost={unlikePost}
            makeComment={makeComment}
            deleteComment={deleteComment}
            deletePost={deletePost}
          />
        ))
      ) : (
        <h2>No Post Found!</h2>
      )}
    </>
  );
};

Home.prototype = { type: PropTypes.string };

export default Home;
