import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ButtonProps } from '../buttons/Button';

import { ButtonWithModal, ButtonWithModalProps } from './ButtonWithModal';

export default {
  title: 'Modals/Button With Modal',
  component: ButtonWithModal,
} as Meta;

const Template: Story<ButtonWithModalProps> = (args) => (
  <ButtonWithModal {...args} />
);

const confirmButtonProps: ButtonProps = {
  name: 'Confirm',
  onClick: () => alert('You just clicked the confirm button!'),
  primary: true,
  positive: true,
};

const cancelButtonProps: ButtonProps = {
  name: 'Cancel',
  primary: true,
  negative: true,
};

export const ButtonWithConfirmationModal = Template.bind({});
ButtonWithConfirmationModal.args = {
  modalTitleContentProps: {
    title: 'Sample Button With Confirmation Modal',
    contentText: 'Put any text you want here.',
  },
  name: 'Click on me!',
  actionButtonPropsList: [cancelButtonProps, confirmButtonProps],
  primary: true,
  positive: true,
};

const closeButtonProps: ButtonProps = {
  name: 'Close',
};

export const ButtonWithAlertModal = Template.bind({});
ButtonWithAlertModal.args = {
  modalTitleContentProps: {
    title: 'Sample Button With Alert Modal',
    contentText: 'Put any text you want here.',
  },
  name: 'Click on me!',
  actionButtonPropsList: [closeButtonProps],
  primary: true,
  negative: true,
};
