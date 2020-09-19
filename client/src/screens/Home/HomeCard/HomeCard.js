import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../../context/themeContext';
import LinkItem from '../../../components/LinkItem/LinkItem';
import Icon from '../../../components/Icon/Icon';
import Form from '../../../components/Form/Form';
import './HomeCard.css';

const HomeCard = ({
  userId,
  post,
  likePost,
  unlikePost,
  makeComment,
  deleteComment,
  deletePost,
}) => {
  const history = useHistory();
  const { background, foreground } = useContext(ThemeContext).theme;
  const foregroundColor = { color: foreground };
  const commentForm = {
    comment: {
      elementType: 'input',
      elementConfig: { type: 'text', placeholder: 'Add a comment' },
      value: '',
      validation: { required: true },
      valid: false,
      touched: false,
    },
  };

  return (
    <div className='card home-card' style={{ background }}>
      <div className='home-card-header'>
        <img
          className='circle'
          src={post.postedBy.pic}
          alt={post.postedBy.name}
        />
        <h5 className='home-card-header-content'>
          <LinkItem
            link={
              post.postedBy._id !== userId
                ? '/profile/' + post.postedBy._id
                : '/profile'
            }
            label={post.postedBy.name}
          />
          {post.postedBy._id === userId && (
            <span className='right' style={foregroundColor}>
              <Icon
                onClick={() => history.push(`/create/${post._id}`)}
                label='edit'
              />
              <Icon onClick={() => deletePost(post._id)} label='delete' />
            </span>
          )}
        </h5>
      </div>
      <div className='card-image'>
        <img src={post.photo} alt={post.title} />
      </div>
      <div className='card-content'>
        {post.likes.includes(userId) ? (
          <Icon
            style={{ color: 'red' }}
            onClick={() => unlikePost(post._id)}
            label='favorite'
          />
        ) : (
          <Icon
            style={foregroundColor}
            onClick={() => likePost(post._id)}
            label='favorite_border'
          />
        )}
        <h6 style={foregroundColor}>{post.likes.length} likes</h6>
        <h6 style={foregroundColor}>{post.title}</h6>
        <p style={foregroundColor}>{post.body}</p>
        {post.comments.map((record) => (
          <h6 key={record._id} style={foregroundColor}>
            <span>{record.postedBy.name}</span>
            {' ' + record.text}
            {record.postedBy._id === userId && (
              <Icon
                position='right'
                onClick={() => deleteComment(post._id, record._id)}
                label='delete'
              />
            )}
          </h6>
        ))}
        <Form
          controls={commentForm}
          formDataSubmitHandler={(data) => makeComment(data, post._id)}
          fromType='row'
        />
      </div>
    </div>
  );
};

HomeCard.propTypes = {
  userId: PropTypes.string.isRequired,
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    postedBy: PropTypes.exact({
      pic: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
    photo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.exact({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        postedBy: PropTypes.exact({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  makeComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default HomeCard;
