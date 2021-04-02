import React from 'react';
import { Story, Meta } from '@storybook/react';

import {
  InducteeRequirementsCardProps,
  InducteeRequirementsCard,
} from './InducteeRequirementsCard';

export default {
  title: 'ProfilePage/Inductee Requirements Card',
  component: InducteeRequirementsCard,
} as Meta;

const Template: Story<InducteeRequirementsCardProps> = args => {
  const { inducteeRequirementStatus } = args;
  return (
    <InducteeRequirementsCard
      inducteeRequirementStatus={inducteeRequirementStatus}
    />
  );
};

export const SampleInducteeRequirementsCard = Template.bind({});
SampleInducteeRequirementsCard.args = {
  inducteeRequirementStatus: {
    user: 1,
    points: 6,
    hasProfessionalRequirement: true,
    hasMentorshipRequirement: false,
    attendance: [
      {
        points: 1,
        attendee: 1,
        isInductee: true,
        startTime: '2020-11-13T01:00:00.000Z',
        event: {
          type: 'professional',
          startDate: '2020-11-13T01:00:00.000Z',
          name: 'Tech Talk',
        },
      },
      {
        points: 1.5,
        attendee: 1,
        isInductee: true,
        startTime: '2020-11-13T01:00:00.000Z',
        event: {
          type: 'social',
          startDate: '2020-11-13T01:00:00.000Z',
          name: 'Pizza',
        },
      },
    ],
  },
};
