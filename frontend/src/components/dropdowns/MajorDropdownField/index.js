import * as React from 'react';
import PropTypes from 'prop-types';

import GenericDropdownField from '../base';

import ELIGIBLE_MAJORS from '@Constants/eligibleMajors';

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

const MajorDropdownField = props => {
  const { classes, name, label, includeOthers, ...otherProps } = props;

  const listOfMajors = [];
  Object.keys(ELIGIBLE_MAJORS).forEach(department =>
    Object.keys(ELIGIBLE_MAJORS[department]).forEach(major => {
      listOfMajors.push(createFullMajorTitle(department, major));
    })
  );

  if (includeOthers) {
    listOfMajors.push('Others');
  }

  return (
    <GenericDropdownField
      name={name}
      label={label}
      selections={listOfMajors}
      {...otherProps}
    />
  );
};

MajorDropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  includeOthers: PropTypes.bool,
};

MajorDropdownField.defaultProps = {
  includeOthers: false,
};

export default MajorDropdownField;
