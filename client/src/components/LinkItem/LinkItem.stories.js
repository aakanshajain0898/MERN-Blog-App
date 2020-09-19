import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LinkItem from './LinkItem';

export default { component: LinkItem, title: 'Components/LinkItem' };

const Template = (args) => (
  <BrowserRouter>
    <LinkItem {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
