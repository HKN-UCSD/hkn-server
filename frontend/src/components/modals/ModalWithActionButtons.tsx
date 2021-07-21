import React from 'react';

import { Button, ButtonProps } from '../buttons/Button';

import { BaseModal } from './BaseModal';

export interface ModalProps {
  title: string;
  contentText?: string;
  open: boolean;
  handleClose: () => void;
}

interface ModalWithActionButtonProps {
  modalProps: ModalProps;
  actionButtonPropsList: ButtonProps[];
  children?: React.ReactNode;
}

export const ModalWithActionButtons = ({
  modalProps,
  actionButtonPropsList,
  children,
}: ModalWithActionButtonProps) => {
  const actionButtons = actionButtonPropsList.map((buttonProps: ButtonProps) => {
    const { name, onClick, ...otherProps } = buttonProps;

    const onClickFunction = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (onClick !== undefined) {
        onClick(event);
      }

      modalProps.handleClose();
    };

    return (
      <Button key={name} onClick={onClickFunction} {...otherProps}>
        {name}
      </Button>
    );
  });

  return (
    <BaseModal {...modalProps} actionButtons={actionButtons}>
      {children}
    </BaseModal>
  );
};