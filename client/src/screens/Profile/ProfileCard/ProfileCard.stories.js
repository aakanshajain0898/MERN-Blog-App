import React from 'react';
import ProfileCard from './ProfileCard';

export default { component: ProfileCard, title: 'Components/ProfileCard' };

const Template = (args) => <ProfileCard {...args} />;

export const ProfileCard1 = Template.bind({});
ProfileCard1.storyName = 'ProfileCard for SignedIn User';
ProfileCard1.args = {
  userProfile: {
    posts: [],
    user: {
      _id: 'userId',
      email: 'User Email',
      name: 'User Name',
      pic: '',
      followers: [],
      following: [],
    },
  },
};

export const ProfileCard2 = Template.bind({});
ProfileCard2.storyName = 'ProfileCard to Follow User';
ProfileCard2.args = {
  ...ProfileCard1.args,
  userProfile: {
    ...ProfileCard1.args.userProfile,
    posts: [{ _id: 'postId', title: 'Post Title', photo: '' }],
    user: {
      ...ProfileCard1.args.userProfile.user,
      pic:
        'https://res.cloudinary.com/aakansha/image/upload/v1596197542/bike.jpg',
    },
  },
  type: 'other',
  showFollow: true,
};

export const ProfileCard3 = Template.bind({});
ProfileCard3.storyName = 'ProfileCard to Unfollow User';
ProfileCard3.args = {
  ...ProfileCard2.args,
  userProfile: {
    ...ProfileCard2.args.userProfile,
    posts: [
      {
        ...ProfileCard2.args.userProfile.posts[0],
        photo:
          'https://res.cloudinary.com/aakansha/image/upload/v1596197542/bike.jpg',
      },
    ],
  },
  showFollow: false,
};
