import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../buttons';

import BaseModal from './BaseModal';

const ButtonWithModal = props => {
  const [open, setOpen] = useState(false);

  const { title, contentText, children, name, ...otherProps } = props;

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
  name: PropTypes.string.isRequired,
  children: PropTypes.func,
};

ButtonWithModal.defaultProps = {
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  children: () => {},
};

export default ButtonWithModal;
