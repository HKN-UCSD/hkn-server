import React from 'react';

import { ButtonProps } from '../buttons/Button';

import { ButtonWithModal, ModalTitleContentProps } from './ButtonWithModal';

export interface ConfirmationModalProps extends ModalTitleContentProps {
  confirmButtonProps: ButtonProps;
  cancelButtonProps: ButtonProps;
}

export interface ButtonWithConfirmationModalProps extends ButtonProps {
  confirmationModalProps: ConfirmationModalProps;
}

export const ButtonWithConfirmationModal = ({
  confirmationModalProps,
  name,
  onClick,
  ...otherButtonProps
}: ButtonWithConfirmationModalProps) => {
  const {
    cancelButtonProps,
    confirmButtonProps,
    ...modalTitleContentProps
  }: ConfirmationModalProps = confirmationModalProps;

  return (
    <ButtonWithModal
      modalTitleContentProps={modalTitleContentProps}
      name={name}
      actionButtonPropsList={[
        { name: 'Cancel', ...cancelButtonProps },
        { name: 'Confirm', onClick, ...confirmButtonProps },
      ]}
      {...otherButtonProps}
    />
  );
};
