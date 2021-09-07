import * as React from 'react';

import GenericDropdownField from '@SharedComponents/dropdowns/base';
import PRONOUNS from '@Constants/pronouns';

type PronounFieldProp = {
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

PronounDropdownField.defaultProps = {
  fullWidth: false,
};

export default PronounDropdownField;


// import * as React from 'react';
// import PropTypes from 'prop-types';

// import GenericDropdownField from '../base';

// import PRONOUNS from '@Constants/pronouns';


// const PronounDropdownField = props => {
//   const { name, label, ...otherProps } = props;

//   return (
//     <GenericDropdownField
//       name={name}
//       label={label}
//       {...otherProps}
//       selections={Object.values(PRONOUNS)}
//     />
//   );
// };

// PronounDropdownField.propTypes = {
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
// };

// export default PronounDropdownField;
