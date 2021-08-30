import * as React from 'react';
import PropTypes from 'prop-types';

import GenericDropdownField from '../base';

import PRONOUNS from '@Constants/pronouns';


const PronounDropdownField = props => {
  const { name, label, ...otherProps } = props;

  return (
    <GenericDropdownField
      name={name}
      label={label}
      {...otherProps}
      selections={Object.values(PRONOUNS)}
    />
  );
};

PronounDropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default PronounDropdownField;
