import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

const CustomTextField = props => {
  const { label, readOnly, ...otherProps } = props;
  const readOnlyProps = {};

  if (readOnly) {
    readOnlyProps.InputProps = {
      disableUnderline: true,
      readOnly: true,
    };
  } else {
    readOnlyProps.InputProps = {};
  }

  return <TextField label={label} {...readOnlyProps} {...otherProps} />;
};

CustomTextField.propTypes = {
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

CustomTextField.defaultProps = {
  readOnly: false,
};

export default CustomTextField;
