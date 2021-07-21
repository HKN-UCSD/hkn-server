import React from 'react';

import { ButtonProps } from '../buttons/Button';

import { ButtonWithModal, ModalTitleContentProps } from './ButtonWithModal';

export interface AlertModalProps extends ModalTitleContentProps {
  closeButtonProps: ButtonProps;
}

export interface ButtonWithAlertModalProps extends ButtonProps {
  alertModalProps: AlertModalProps;
}

export const ButtonWithAlertModal = ({
  alertModalProps,
  name,
  ...otherButtonProps
}: ButtonWithAlertModalProps) => {
  const { closeButtonProps, ...modalTitleContentProps }: AlertModalProps =
    alertModalProps;

  return (
    <ButtonWithModal
      modalTitleContentProps={modalTitleContentProps}
      name={name}
      actionButtonPropsList={[{ name: 'Close', ...closeButtonProps }]}
      {...otherButtonProps}
    />
  );
};
