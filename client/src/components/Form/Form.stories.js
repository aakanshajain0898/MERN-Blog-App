import React from 'react';
import Form from './Form';
import * as InputStories from './Input/Input.stories';

export default { component: Form, title: 'Components/Form' };

const Template = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
  controls: {
    email: { ...InputStories.Input1.args },
    password: { ...InputStories.Input2.args },
    name: { ...InputStories.Input3.args },
    image: { ...InputStories.Input4.args },
  },
  heading: <h2>My Blogging Site</h2>,
  btnMsg: 'Submit!',
};
