import * as React from 'react';

import GenericDropdownField from '@SharedComponents/dropdowns/base';
import INFO_SESSIONS from '@Constants/infoSessions';

type InfoSessionFieldProp = {
  name: string;
  label: string;
  fullWidth?: boolean;
};

const InfoSessionDropdownField = (props: InfoSessionFieldProp) => {
  const { name, label, fullWidth = false } = props;

  return (
    <GenericDropdownField
      name={name}
      label={label}
      fullWidth={fullWidth}
      capitalizeLabel
      selections={Object.values(INFO_SESSIONS)}
    />
  );
};

export default InfoSessionDropdownField;
