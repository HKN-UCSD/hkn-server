import React from 'react';
import { Story, Meta } from '@storybook/react';

import { UserInfoCard, UserInfoCardProps } from './UserInfoCard';

import { AppUserResponse, AppUserResponseRoleEnum } from '@Services/api/models';

export default {
  title: 'ProfilePage/User Info Card',
  component: UserInfoCard,
} as Meta;

const Template: Story<UserInfoCardProps> = args => {
  const { profile } = args;
  return <UserInfoCard profile={profile} />;
};

export const SampleUserInfoCard = Template.bind({});
SampleUserInfoCard.args = {
  profile: {
    id: 0, // unused
    firstName: 'First',
    lastName: 'Last',
    role: AppUserResponseRoleEnum.Officer,
    email: 'officer@ucsd.edu',
    major: 'Computer Engineering',
    graduationYear: '2021',
    inductionClass: {
      quarter: 'FA20',
    },
  } as AppUserResponse,
};
