import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RenderNavList from './RenderNavList';

export default { component: RenderNavList, title: 'Components/RenderNavList' };

const Template = (args) => (
  <BrowserRouter>
    <RenderNavList {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});

export const RenderNavList1 = Template.bind({});
RenderNavList1.storyName = 'RenderNavList with user Login';
RenderNavList1.args = { user: {} };
