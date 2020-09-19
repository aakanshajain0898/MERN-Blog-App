import React from 'react';
import Button from './Button';

export default { component: Button, title: 'Components/Button' };

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Normal Button';

export const Button1 = Template.bind({});
Button1.storyName = 'Danger Button';
Button1.args = { type: 'danger' };

export const Button2 = Template.bind({});
Button2.storyName = 'Button for Modal';
Button2.args = { type: 'modal' };

export const Button3 = Template.bind({});
Button3.storyName = 'Transparent Button';
Button3.args = { type: 'transparent' };
