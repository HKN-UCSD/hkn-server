import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Card, CardProps } from './Card';

export default {
  title: 'Cards/Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = args => {
  const { children, title } = args;
  return <Card title={title}>{children}</Card>;
};

export const SampleCard = Template.bind({});
SampleCard.args = {
  children: <h3>Put stuff here!</h3>,
};

export const SampleCardWithTitle = Template.bind({});
SampleCardWithTitle.args = {
  children: <h3>This is the body</h3>,
  title: 'Title',
};
