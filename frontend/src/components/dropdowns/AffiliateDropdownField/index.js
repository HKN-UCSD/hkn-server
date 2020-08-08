import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import GenericDropdownField from '../base';

import styles from './styles';

import HKN_AFFILIATIONS from '@Constants/hknAffiliations';

const AffiliateDropdownField = props => {
  const { classes, name, label, ...otherProps } = props;

  return (
    <GenericDropdownField
      className={classes.root}
      name={name}
      label={label}
      {...otherProps}
    >
      {Object.values(HKN_AFFILIATIONS)}
    </GenericDropdownField>
  );
};

AffiliateDropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default withStyles(styles)(AffiliateDropdownField);
