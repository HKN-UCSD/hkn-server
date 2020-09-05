import * as React from 'react';
import PropTypes from 'prop-types';

import GenericDropdownField from '../base';

import HKN_AFFILIATIONS from '@Constants/hknAffiliations';

const AffiliateDropdownField = props => {
  const { name, label, ...otherProps } = props;

  return (
    <GenericDropdownField
      name={name}
      label={label}
      selections={Object.values(HKN_AFFILIATIONS)}
      {...otherProps}
    />
  );
};

AffiliateDropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default AffiliateDropdownField;
