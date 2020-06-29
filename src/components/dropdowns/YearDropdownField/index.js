import * as React from 'react';
import PropTypes from 'prop-types';

import { MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

import styles from './styles';

const yearDropdownChoices = (minYear, maxYear) => {
  const yearChoices = [];

  for (let year = 0; year <= maxYear - minYear; year += 1) {
    yearChoices.push(year + minYear);
  }

  return yearChoices;
};

const YearDropdownField = props => {
  const { classes, minYear, maxYear, ...otherProps } = props;

  return (
    <Field
      className={classes.root}
      component={TextField}
      select
      {...otherProps}
    >
      {yearDropdownChoices(minYear, maxYear).map(year => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Field>
  );
};

YearDropdownField.propTypes = {
  minYear: PropTypes.number.isRequired,
  maxYear: PropTypes.number.isRequired,
};

export default withStyles(styles)(YearDropdownField);
