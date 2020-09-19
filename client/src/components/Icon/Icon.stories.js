import React from 'react';
import Icon from './Icon';

export default { component: Icon, title: 'Components/Icon' };

const Template = (args) => <Icon {...args} />;

export const Icon1 = Template.bind({});
Icon1.storyName = 'Menu Icon';
Icon1.args = { label: 'menu' };

export const Icon2 = Template.bind({});
Icon2.storyName = 'Delete Icon';
Icon2.args = { label: 'delete' };

export const Icon3 = Template.bind({});
Icon3.storyName = 'Edit Icon';
Icon3.args = { label: 'edit' };

export const Icon4 = Template.bind({});
Icon4.storyName = 'Favorite Icon';
Icon4.args = { label: 'favorite' };

export const Icon5 = Template.bind({});
Icon5.storyName = 'Favorite Border Icon';
Icon5.args = { label: 'favorite_border' };

export const Icon6 = Template.bind({});
Icon6.storyName = 'Search Icon';
Icon6.args = { label: 'search' };