import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext/userContext';
import { ThemeContext } from '../../context/themeContext';
import { UPDATE, UPDATEPIC } from '../../context/types';
import { uploadPic, fetchData, updateData } from '../../utility/utility';
import ProfileCard from './ProfileCard/ProfileCard';

const Profile = () => {
  const [userProfile, setProfile] = useState([]);
  const [type, setType] = useState('other');
  const { userId } = useParams();
  const { toggleTheme } = useContext(ThemeContext);
  const { state, dispatch } = useContext(UserContext);
  console.log(userId);
  console.log(state);

  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userId) : true
  );

  useEffect(() => {
    if (userId) {
      setType('other');
      fetchData(`/user/${userId}`)
        .then((result) => setProfile(result))
        .catch((err) => console.log(err));
    } else {
      setType('user');
      fetchData('/mypost')
        .then((result) => setProfile({ posts: result.mypost, user: state }))
        .catch((err) => console.log(err));
    }
  }, [userId, state]);

  const updateUserState = (data, type, payload) => {
    console.log(data);
    dispatch({ type, payload });
    localStorage.setItem('user', JSON.stringify(data));
  };

  const submitHandler = async (action) => {
    try {
      if (action.image) {
        const data = await uploadPic(action.image);
        const result = await updateData('/updatepic', { pic: data });
        updateUserState({ ...state, pic: result.pic }, UPDATEPIC, result.pic);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const followUser = async () => {
    try {
      const data = await updateData('/follow', { followId: userId });
      updateUserState(data, UPDATE, {
        following: data.following,
        followers: data.followers,
      });
      setProfile((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          followers: [...prevState.user.followers, data._id],
        },
      }));
      setShowFollow(false);
    } catch (err) {
      console.log(err);
    }
  };

  const unfollowUser = async () => {
    try {
      const data = await updateData('/unfollow', { unfollowId: userId });
      updateUserState(data, UPDATE, {
        following: data.following,
        followers: data.followers,
      });
      setProfile((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          followers: prevState.user.followers.filter(
            (item) => item !== data._id
          ),
        },
      }));
      setShowFollow(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {userProfile.length !== 0 ? (
        <ProfileCard
          userProfile={userProfile}
          type={type}
          showFollow={showFollow}
          submitHandler={submitHandler}
          followUser={followUser}
          unfollowUser={unfollowUser}
          toggleTheme={toggleTheme}
        />
      ) : (
        <h2>Loading...!</h2>
      )}
    </>
  );
};

export default Profile;
