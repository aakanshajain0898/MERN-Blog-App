import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomeCard from './HomeCard';

export default { component: HomeCard, title: 'Components/HomeCard' };

const Template = (args) => (
  <BrowserRouter>
    <HomeCard {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  userId: 'userId',
  post: {
    _id: 'postId',
    postedBy: {
      pic: '',
      name: 'Post User Name',
      _id: 'userID',
    },
    photo: '',
    title: 'Post Title',
    body: 'Post Body',
    likes: [],
    comments: [],
  },
};

export const HomeCard1 = Template.bind({});
HomeCard1.storyName = 'HomeCard for Other User';
HomeCard1.args = {
  ...Default.args,
  post: {
    ...Default.args.post,
    postedBy: {
      ...Default.args.post.postedBy,
      pic:
        'https://res.cloudinary.com/aakansha/image/upload/v1596197542/bike.jpg',
    },
    likes: ['userID'],
    comments: [
      {
        _id: 'commentId',
        text: 'Post Comment',
        postedBy: { _id: 'userID', name: 'User Name' },
      },
    ],
  },
};

export const HomeCard2 = Template.bind({});
HomeCard2.storyName = 'HomeCard for SignedIn User';
HomeCard2.args = {
  ...HomeCard1.args,
  post: {
    ...HomeCard1.args.post,
    postedBy: {
      ...HomeCard1.args.post.postedBy,
      _id: 'userId',
    },
    photo:
      'https://res.cloudinary.com/aakansha/image/upload/v1596197542/bike.jpg',
    likes: ['userId'],
    comments: [
      {
        ...HomeCard1.args.post.comments[0],
        postedBy: {
          ...HomeCard1.args.post.comments[0].postedBy,
          _id: 'userId',
        },
      },
    ],
  },
};
