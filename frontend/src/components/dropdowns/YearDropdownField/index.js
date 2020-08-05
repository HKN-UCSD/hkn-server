import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
  const { classes, label, minYear, maxYear, name, ...otherProps } = props;

  return (
    <Field
      className={classes.root}
      component={TextField}
      name={name}
      label={label}
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
  label: PropTypes.string.isRequired,
  maxYear: PropTypes.number,
  minYear: PropTypes.number,
  name: PropTypes.string.isRequired,
};

YearDropdownField.defaultProps = {
  minYear: parseInt(moment().year(), 10),
  maxYear: parseInt(moment().year(), 10) + 5,
};

export default withStyles(styles)(YearDropdownField);
