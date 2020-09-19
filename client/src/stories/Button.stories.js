// YourComponent.stories.js

import React from 'react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';
import { Button } from './Button';

// This default export determines where you story goes in the story list
export default {
  title: 'Example/Button',
  component: Button,
  parameters: {
    options: {
      storySort: (a, b) =>
        a[1].kind === b[1].kind
          ? 0
          : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    },
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ],
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    backgroundColor: { control: 'color' },
  },
};

// We create a “template” of how args map to rendering
const Template = (args) => <Button {...args} />;

export const FirstStory = () => <Button primary label='Click me!' />;
FirstStory.storyName = 'I am the primary';
FirstStory.parameters = { docs: { page: null } };

export const Secondary = () => <Button background='#ff0' label='😄👍😍💯' />;

// Each story then reuses that template
export const Tertiary = Template.bind({});
Tertiary.args = {
  /* the args you need here will depend on your component */
  label: '📚📕📈🤓',
  background: '#ff0',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};

export const PrimaryLongName = Template.bind({});
PrimaryLongName.args = {
  ...FirstStory.args,
  label: 'Primary with a really long name',
};
