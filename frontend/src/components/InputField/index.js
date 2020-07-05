import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

const InputField = props => {
  const { label, readOnly, ...otherProps } = props;
  let readOnlyProps = {};

  if (readOnly) {
    readOnlyProps = {
      disableUnderline: true,
      readOnly: true,
    };
  } else {
    readOnlyProps = {};
  }

  return <TextField label={label} InputProps={readOnlyProps} {...otherProps} />;
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

InputField.defaultProps = {
  readOnly: false,
};

export default InputField;
