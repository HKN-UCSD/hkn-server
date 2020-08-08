import * as React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';
import { TextField as FormikTextField } from 'formik-material-ui';
import { Field } from 'formik';

const GenericDropdownField = props => {
  const { name, label, selections, readOnly, ...otherProps } = props;

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
      {selections.map(selection => (
        <MenuItem key={selection} value={selection}>
          {selection}
        </MenuItem>
      ))}
    </Field>
  );
};

GenericDropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  selections: PropTypes.arrayOf(PropTypes.node).isRequired,
};

GenericDropdownField.defaultProps = {
  readOnly: false,
};

export default GenericDropdownField;
