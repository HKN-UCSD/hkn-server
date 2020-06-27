import * as React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import { getIn } from 'formik';

import ELIGIBLE_MAJORS from '../../../constants/eligibleMajors';

const createFullMajorTitle = (department, major) => {
  let fullMajorTitle = '';

  if (ELIGIBLE_MAJORS[department][major] === 'Computer Engineering') {
    if (department === 'CSE')
      fullMajorTitle = `${ELIGIBLE_MAJORS[department][major]} - CSE`;
    else if (department === 'ECE')
      fullMajorTitle = `${ELIGIBLE_MAJORS[department][major]} - ECE`;
  } else fullMajorTitle = ELIGIBLE_MAJORS[department][major];

  return fullMajorTitle;
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

const MajorDropdown = props => {
  return (
    <TextField select {...fieldToTextField(props)}>
      {Object.keys(ELIGIBLE_MAJORS).map(department =>
        Object.keys(ELIGIBLE_MAJORS[department]).map(major => {
          const fullMajorTitle = createFullMajorTitle(department, major);
          return <MenuItem value={fullMajorTitle}>{fullMajorTitle}</MenuItem>;
        })
      )}
    </TextField>
  );
};

export default MajorDropdown;
