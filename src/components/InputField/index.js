import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { TextField as FormikTextField } from 'formik-material-ui';
import { Field } from 'formik';

const InputField = props => {
  const { label, readOnly, ...otherProps } = props;

  if (readOnly) {
    const readOnlyProps = {
      disableUnderline: true,
      readOnly: true,
    };
    return (
      <TextField label={label} InputProps={readOnlyProps} {...otherProps} />
    );
  }
  return <Field component={FormikTextField} label={label} {...otherProps} />;
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

InputField.defaultProps = {
  readOnly: false,
};

export default InputField;
