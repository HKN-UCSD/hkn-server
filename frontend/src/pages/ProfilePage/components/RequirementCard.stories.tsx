import React from 'react';
import { Story, Meta } from '@storybook/react';

import {
  PointRequirementCardProps,
  PointRequirementCard,
} from './RequirementCard';

export default {
  title: 'ProfilePage/Point Requirement',
  component: PointRequirementCard,
} as Meta;

const Template: Story<PointRequirementCardProps> = args => {
  const { points, isSatisfied } = args;
  return <PointRequirementCard points={points} isSatisfied={isSatisfied} />;
};

export const SamplePointRequirementCard = Template.bind({});
SamplePointRequirementCard.args = {
  points: 10,
  isSatisfied: true,
};
