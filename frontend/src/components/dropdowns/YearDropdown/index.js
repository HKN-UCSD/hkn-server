import * as React from 'react';
import PropTypes from 'prop-types';

import { MenuItem } from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

const yearDropdownChoices = (minYear, maxYear) => {
  const yearChoices = [];

  for (let year = 0; year <= maxYear - minYear; year += 1) {
    yearChoices.push(year + minYear);
  }

  return yearChoices;
};

const YearDropdown = props => {
  const { minYear, maxYear } = props;

  return (
    <Field
      component={TextField}
      select
      fullWidth
      name='gradYear'
      label='Grad Year'
    >
      {yearDropdownChoices(minYear, maxYear).map(year => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Field>
  );
};

YearDropdown.propTypes = {
  minYear: PropTypes.number.isRequired,
  maxYear: PropTypes.number.isRequired,
};

export default YearDropdown;
