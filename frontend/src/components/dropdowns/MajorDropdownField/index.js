import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import GenericDropdownField from '../base';

import styles from './styles';

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
      className={classes.root}
      name={name}
      label={label}
      defaultValue=''
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

export default withStyles(styles)(MajorDropdownField);
