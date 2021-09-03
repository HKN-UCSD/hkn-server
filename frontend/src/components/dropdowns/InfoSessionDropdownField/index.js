import * as React from 'react';
import PropTypes from 'prop-types';

import GenericDropdownField from '../base';

import INFO_SESSIONS from '@Constants/infoSessions';


const InfoSessionDropdownField = props => {
  const { name, label, ...otherProps } = props;

  return (
    <GenericDropdownField
      name={name}
      label={label}
      {...otherProps}
      selections={Object.values(INFO_SESSIONS)}
    />
  );
};

InfoSessionDropdownField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default InfoSessionDropdownField;
