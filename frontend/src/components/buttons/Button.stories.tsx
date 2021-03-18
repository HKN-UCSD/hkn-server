import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args}>Button</Button>;

export const PrimaryPositive = Template.bind({});
PrimaryPositive.args = {
  primary: true,
  positive: true,
};

export const PrimaryNegative = Template.bind({});
PrimaryNegative.args = {
  primary: true,
  negative: true,
};

export const SecondaryPositive = Template.bind({});
SecondaryPositive.args = {
  secondary: true,
  positive: true,
};

export const SecondaryNegative = Template.bind({});
SecondaryNegative.args = {
  secondary: true,
  negative: true,
};
