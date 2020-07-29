import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../buttons';
import BaseModal from './BaseModal';

const ButtonWithModal = props => {
  const [open, setOpen] = useState(false);

  const { title, contentText, openButtonProps, children } = props;
  const { name, ...otherProps } = openButtonProps;

  return (
    <>
      <Button onClick={() => setOpen(true)} {...otherProps}>
        {name}
      </Button>

      <BaseModal
        title={title}
        contentText={contentText}
        open={open}
        handleClose={() => setOpen(false)}
      >
        {children}
      </BaseModal>
    </>
  );
};

ButtonWithModal.propTypes = {
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  openButtonProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    otherProps: PropTypes.object,
  }),
  children: PropTypes.func,
};

ButtonWithModal.defaultProps = {
  openButtonProps: {
    otherProps: {},
  },
  children: () => {},
};

export default ButtonWithModal;
