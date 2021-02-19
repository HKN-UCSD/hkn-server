import * as React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';
import { TextField as FormikTextField } from 'formik-material-ui';
import { Field } from 'formik';

const GenericDropdownField = props => {
  const {
    name,
    label,
    selections,
    readOnly,
    capitalizeLabel,
    ...otherProps
  } = props;
  const finalSelections = selections;

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
      {finalSelections.map(selection => (
        <MenuItem key={selection} value={selection}>
          {capitalizeLabel
            ? selection
                .toString()
                .charAt(0)
                .toUpperCase() + selection.toString().slice(1)
            : selection}
        </MenuItem>
      ))}
    </Field>
  );
};

GenericDropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  capitalizeLabel: PropTypes.bool,
  fullWidth: PropTypes.bool,
  selections: PropTypes.arrayOf(PropTypes.node).isRequired,
};

GenericDropdownField.defaultProps = {
  readOnly: false,
  capitalizeLabel: false,
  fullWidth: false,
};

export default GenericDropdownField;
