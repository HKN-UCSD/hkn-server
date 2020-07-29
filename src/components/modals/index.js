import React from 'react';
import PropTypes from 'prop-types';

import Button from '../buttons';
import ButtonWithModal from './base/ButtonWithModal';

export const ButtonWithConfirmationModal = ({
  title,
  contentText,
  name,
  confirmButtonProps,
  cancelButtonProps,
  ...otherProps
}) => {
  const { name: cancelName, ...otherCancelProps } = cancelButtonProps;
  const {
    name: confirmName,
    onClick: confirmOnClick,
    ...otherConfirmProps
  } = confirmButtonProps;

  return (
    <ButtonWithModal
      title={title}
      contentText={contentText}
      name={name}
      {...otherProps}
    >
      {onClickHOF => (
        <>
          <Button onClick={() => onClickHOF(null)} {...otherCancelProps}>
            {cancelName}
          </Button>

          <Button
            onClick={() => onClickHOF(confirmOnClick)}
            {...otherConfirmProps}
          >
            {confirmName}
          </Button>
        </>
      )}
    </ButtonWithModal>
  );
};

ButtonWithConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  confirmButtonProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    otherConfirmProps: PropTypes.object,
  }),
  cancelButtonProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    otherCancelProps: PropTypes.object,
  }),
};

ButtonWithConfirmationModal.defaultProps = {
  confirmButtonProps: {
    onClick: () => {},
    otherConfirmProps: {},
  },
  cancelButtonProps: {
    onClick: () => {},
    otherCancelProps: {},
  },
};

export const AlertModalWithButton = ({
  title,
  contentText,
  name,
  closeButtonProps,
  ...otherProps
}) => {
  const { name: closeName, ...closeOtherProps } = closeButtonProps;

  return (
    <ButtonWithModal
      title={title}
      contentText={contentText}
      name={name}
      {...otherProps}
    >
      {onClickHOF => (
        <>
          <Button onClick={() => onClickHOF(null)} {...closeOtherProps}>
            {closeName}
          </Button>
        </>
      )}
    </ButtonWithModal>
  );
};

AlertModalWithButton.propTypes = {
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  closeButtonProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    otherProps: PropTypes.object,
  }),
};

AlertModalWithButton.defaultProps = {
  closeButtonProps: {
    onClick: () => {},
    otherProps: {},
  },
};
