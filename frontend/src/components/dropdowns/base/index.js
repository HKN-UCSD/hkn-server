import * as React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';
import { TextField as FormikTextField } from 'formik-material-ui';
import { Field } from 'formik';

const GenericDropdownField = props => {
  const { name, label, children, readOnly, ...otherProps } = props;

  if (readOnly) {
    const readOnlyProps = {
      disableUnderline: true,
      readOnly: true,
    };

    return (
      <TextField label={label} InputProps={readOnlyProps} {...otherProps} />
    );
  }

  return (
    <Field
      component={FormikTextField}
      select
      name={name}
      label={label}
      {...otherProps}
    >
      {React.Children.map(children, child => (
        <MenuItem key={child} value={child}>
          {child}
        </MenuItem>
      ))}
    </Field>
  );
};

GenericDropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  children: PropTypes.node,
};

GenericDropdownField.defaultProps = {
  readOnly: false,
  children: <></>,
};

export default GenericDropdownField;
