import * as React from 'react';
import { MenuItem } from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

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

const MajorDropdown = () => (
  <Field component={TextField} select fullWidth name='major' label='Major'>
    {Object.keys(ELIGIBLE_MAJORS).map(department =>
      Object.keys(ELIGIBLE_MAJORS[department]).map(major => {
        const fullMajorTitle = createFullMajorTitle(department, major);
        return <MenuItem value={fullMajorTitle}>{fullMajorTitle}</MenuItem>;
      })
    )}
  </Field>
);

export default MajorDropdown;
