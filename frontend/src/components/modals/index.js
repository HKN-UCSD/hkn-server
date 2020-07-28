import React from 'react';
import PropTypes from 'prop-types';

import BaseModal from './base';

export const ConfirmModal = props => {
  const {
    title,
    contentText,
    openButtonProps,
    confirmButtonProps,
    cancelButtonProps,
  } = props;

  const actionButtonsProps = [confirmButtonProps, cancelButtonProps];

  return (
    <BaseModal
      title={title}
      contentText={contentText}
      openButtonProps={openButtonProps}
      actionButtonsProps={actionButtonsProps}
    />
  );
};

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  openButtonProps: PropTypes.shape({
    openButtonName: PropTypes.string.isRequired,
    openButtonOnClick: PropTypes.func,
    openButtonOtherProps: PropTypes.object,
  }),
  confirmButtonProps: PropTypes.shape({
    buttonName: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    otherProps: PropTypes.object,
  }),
  cancelButtonProps: PropTypes.shape({
    buttonName: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    otherProps: PropTypes.object,
  }),
};

ConfirmModal.defaultProps = {
  openButtonProps: {
    openButtonOnClick: null,
    openButtonOtherProps: {},
  },
  confirmButtonProps: {
    onClick: null,
    otherProps: {},
  },
  cancelButtonProps: {
    onClick: null,
    otherProps: {},
  },
};

export const AlertModal = props => {
  const { title, contentText, openButtonProps, closeButtonProps } = props;

  const actionButtonsProps = [closeButtonProps];

  return (
    <BaseModal
      title={title}
      contentText={contentText}
      openButtonProps={openButtonProps}
      actionButtonsProps={actionButtonsProps}
    />
  );
};

AlertModal.propTypes = {
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  openButtonProps: PropTypes.shape({
    openButtonName: PropTypes.string.isRequired,
    openButtonOnClick: PropTypes.func,
    openButtonOtherProps: PropTypes.object,
  }),
  closeButtonProps: PropTypes.shape({
    buttonName: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    otherProps: PropTypes.object,
  }),
};

AlertModal.defaultProps = {
  openButtonProps: {
    openButtonOnClick: null,
    openButtonOtherProps: {},
  },
  closeButtonProps: {
    onClick: null,
    otherProps: {},
  },
};
