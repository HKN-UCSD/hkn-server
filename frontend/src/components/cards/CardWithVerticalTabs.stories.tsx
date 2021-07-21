import React from 'react';
import { Story, Meta } from '@storybook/react';

import {
  CardWithVerticalTabs,
  CardWithVerticalTabsProps,
} from './CardWithVerticalTabs';

export default {
  title: 'Cards/Card with Vertical Tabs',
  component: CardWithVerticalTabs,
} as Meta;

const Template: Story<CardWithVerticalTabsProps> = args => {
  const { items } = args;
  return <CardWithVerticalTabs items={items} />;
};

export const SampleCardWithVerticalTabs = Template.bind({});
SampleCardWithVerticalTabs.args = {
  items: [
    { title: 'Title 1', element: <h1>Title 1</h1> },
    { title: 'Title 2', element: <h1>Title 2</h1> },
    { title: 'Title 3', element: <h1>Title 3</h1> },
  ],
};
