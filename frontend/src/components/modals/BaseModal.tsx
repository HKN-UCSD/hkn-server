import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

interface BaseModalProps {
  title: string;
  contentText?: string;
  open: boolean;
  handleClose: () => void;
  actionButtons: JSX.Element[] | JSX.Element;
  children?: React.ReactNode;
}

export const BaseModal = ({
  title,
  contentText = '',
  open,
  handleClose,
  actionButtons,
  children = <></>,
}: BaseModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        {children}
      </DialogContent>

      <DialogActions>{actionButtons}</DialogActions>
    </Dialog>
  );
};
