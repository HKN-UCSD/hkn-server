import * as React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import { getIn } from 'formik';

const yearDropdownChoices = (minYear, maxYear) => {
  const yearChoices = [];

  for (let year = 0; year <= maxYear - minYear; year += 1) {
    yearChoices.push(year + minYear);
  }

  return yearChoices;
};

/*
 * From https://github.com/stackworx/formik-material-ui/tree/master/packages/formik-material-ui/src (TextField) :p
 * This essentially takes the props received at the top-level <Field /> as well
 * as the default props for that <Field /> (field, form, meta) and transforms
 * all that into a props that is suitable for MUI's <TextField />
 */
export function fieldToTextField({
  disabled,
  field,
  form: { isSubmitting, touched, errors },
  ...props
}) {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    ...props,
    ...field,
    error: showError,
    helperText: showError ? fieldError : props.helperText,
    disabled: disabled ?? isSubmitting,
    variant: props.variant,
  };
}

const YearDropdown = props => {
  const { minyear, maxyear } = fieldToTextField(props);

  return (
    <TextField select {...fieldToTextField(props)}>
      {yearDropdownChoices(minyear, maxyear).map(year => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default YearDropdown;
