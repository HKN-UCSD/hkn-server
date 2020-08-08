import * as React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import GenericDropdownField from '../base';

import styles from './styles';

const yearDropdownChoices = (minYear, maxYear) => {
  const yearChoices = [];

  for (let year = 0; year <= maxYear - minYear; year += 1) {
    yearChoices.push(year + minYear);
  }

  return yearChoices;
};

const YearDropdownField = props => {
  const { classes, name, label, minYear, maxYear, ...otherProps } = props;

  return (
    <GenericDropdownField
      className={classes.root}
      name={name}
      label={label}
      {...otherProps}
      selections={yearDropdownChoices(minYear, maxYear)}
    />
  );
};

YearDropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  minYear: PropTypes.number,
  maxYear: PropTypes.number,
};

YearDropdownField.defaultProps = {
  minYear: parseInt(moment().year(), 10),
  maxYear: parseInt(moment().year(), 10) + 5,
};

export default withStyles(styles)(YearDropdownField);
