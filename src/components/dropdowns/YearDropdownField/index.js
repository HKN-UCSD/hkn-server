import * as React from 'react';
import PropTypes from 'prop-types';
import { getYear } from 'date-fns';

import GenericDropdownField from '../base';

const yearDropdownChoices = (minYear, maxYear) => {
  const yearChoices = [];

  for (let year = 0; year <= maxYear - minYear; year += 1) {
    yearChoices.push(year + minYear);
  }

  return yearChoices;
};

const YearDropdownField = props => {
  const { name, label, minYear, maxYear, ...otherProps } = props;

  return (
    <GenericDropdownField
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
  minYear: parseInt(getYear(new Date()), 10),
  maxYear: parseInt(getYear(new Date()), 10) + 5,
};

export default YearDropdownField;
