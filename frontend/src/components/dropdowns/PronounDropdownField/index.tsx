import * as React from 'react';

import GenericDropdownField from '@SharedComponents/dropdowns/base';
import PRONOUNS from '@Constants/pronouns';

interface PronounFieldProp {
  name: string;
  label: string;
  fullWidth?: boolean;
};

const PronounDropdownField = (props: PronounFieldProp) => {
  const { name, label, fullWidth = false } = props;

  return (
    <GenericDropdownField
      name={name}
      label={label}
      fullWidth={fullWidth}
      capitalizeLabel
      selections={Object.values(PRONOUNS)}
    />
  );
};

export default PronounDropdownField;