import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { Story, Meta } from '@storybook/react';

import PublicPageLayout, { PublicPageLayoutProps } from './PublicPageLayout';

export default {
  title: 'Layouts/PublicPageLayout',
  component: PublicPageLayout,
} as Meta;

const Template: Story<PublicPageLayoutProps> = args => {
  const { children } = args;
  return <PublicPageLayout>{children}</PublicPageLayout>;
};

export const SamplePublicPageLayout = Template.bind({});
SamplePublicPageLayout.args = {
  children: (
    <Card>
      <CardContent>
        <h1>Title</h1>
      </CardContent>
    </Card>
  ),
};
