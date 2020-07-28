import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import Button from '../../buttons';

const BaseModal = ({
  title,
  contentText,
  openButtonProps,
  actionButtonsProps,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    openButtonName,
    openButtonOnClick,
    ...openButtonOtherProps
  } = openButtonProps;

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleOnClickOpen = onClickFunc => {
    handleOpen();

    if (onClickFunc != null) {
      onClickFunc();
    }
  };

  const handleOnClickClose = onClickFunc => {
    handleClose();

    if (onClickFunc != null) {
      onClickFunc();
    }
  };

  return (
    <div>
      <Button
        onClick={() => handleOnClickOpen(openButtonOnClick)}
        {...openButtonOtherProps}
      >
        {openButtonName}
      </Button>

      <Dialog open={isModalOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>

        <DialogActions>
          {actionButtonsProps.map(buttonProps => {
            const { buttonName, onClick, ...otherProps } = buttonProps;

            return (
              <Button
                key={buttonName}
                onClick={() => handleOnClickClose(onClick)}
                {...otherProps}
              >
                {buttonName}
              </Button>
            );
          })}
        </DialogActions>
      </Dialog>
    </div>
  );
};

BaseModal.propTypes = {
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  openButtonProps: PropTypes.shape({
    openButtonName: PropTypes.string.isRequired,
    openButtonOnClick: PropTypes.func,
    openButtonOtherProps: PropTypes.object,
  }),
  actionButtonsProps: PropTypes.arrayOf(
    PropTypes.shape({
      buttonName: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      otherProps: PropTypes.object,
    })
  ).isRequired,
};

BaseModal.defaultProps = {
  openButtonProps: {
    openButtonOnClick: null,
    openButtonOtherProps: {},
  },
};

export default BaseModal;
