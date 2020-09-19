import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../../context/themeContext';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import Form from '../../../components/Form/Form';
import './ProfileCard.css';

const ProfileCard = ({
  userProfile,
  type,
  showFollow,
  submitHandler,
  followUser,
  unfollowUser,
  toggleTheme,
}) => {
  console.log(userProfile);
  const history = useHistory();
  const { background, foreground } = useContext(ThemeContext).theme;
  const profileForm = {
    image: {
      elementType: 'file',
      elementConfig: { placeholder: 'Upload Pic' },
      value: '',
      valid: true,
      touched: false,
    },
  };

  return (
    <div
      className='card profile-card'
      style={{ color: foreground, background }}
    >
      <div className='profile-card-content'>
        <div className='profile-card-content-body'>
          <img
            className='circle'
            src={userProfile.user.pic}
            alt={userProfile.user.name}
          />
          <div>
            <h4>
              {userProfile.user.name}
              {type === 'user' && (
                <Icon
                  position='right'
                  onClick={() => history.push('/editprofile')}
                  label='edit'
                />
              )}
            </h4>
            <h5>{userProfile.user.email}</h5>
            <div className='profile-card-content-body'>
              <h6>{userProfile.posts.length} posts</h6>
              <h6>{userProfile.user.followers.length} followers</h6>
              <h6>{userProfile.user.following.length} following</h6>
            </div>
            {type === 'other' && showFollow && (
              <Button clk={followUser} label='Follow' />
            )}
            {type === 'other' && !showFollow && (
              <Button clk={unfollowUser} label='UnFollow' />
            )}
            {type === 'user' && (
              <Button clk={toggleTheme} label='Toggle Theme' />
            )}
          </div>
        </div>
        {type === 'user' && (
          <Form
            controls={profileForm}
            updateFormValueHandler={submitHandler}
            fromType='row'
          />
        )}
      </div>
      <div className='gallery'>
        {userProfile.posts.map((item) => (
          <img
            key={item._id}
            className='item'
            alt={item.title}
            src={item.photo}
          />
        ))}
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  userProfile: PropTypes.shape({
    post: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
      }).isRequired
    ),
    user: PropTypes.exact({
      email: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      pic: PropTypes.string.isRequired,
      followers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      following: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['user', 'other']).isRequired,
  showFollow: PropTypes.bool.isRequired,
  submitHandler: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

ProfileCard.defaultProps = { type: 'user' };

export default ProfileCard;
