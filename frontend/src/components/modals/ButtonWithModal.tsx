import React, { useState } from 'react';

import { Button, ButtonProps } from '../buttons/Button';

import { ModalProps, ModalWithActionButtons } from './ModalWithActionButtons';

export interface ModalTitleContentProps {
  title: string;
  contentText: string;
}

export interface ButtonWithModalProps extends ButtonProps {
  modalTitleContentProps: ModalTitleContentProps;
  actionButtonPropsList: ButtonProps[];
  children?: React.ReactNode;
}

export const ButtonWithModal = ({
  modalTitleContentProps,
  name,
  actionButtonPropsList,
  children,
  ...otherButtonProps
}: ButtonWithModalProps) => {
  const [open, setOpen] = useState(false);
  const modalProps: ModalProps = {
    ...modalTitleContentProps,
    open,
    handleClose: () => setOpen(false),
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} {...otherButtonProps}>
        {name}
      </Button>

      <ModalWithActionButtons
        modalProps={modalProps}
        actionButtonPropsList={actionButtonPropsList}
      >
        {children}
      </ModalWithActionButtons>
    </>
  );
};