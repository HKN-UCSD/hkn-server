import React from 'react';

import InputField from '../InputField';

const getAccountSection = params => {
  const { readOnly, email } = params || {};

  return {
    title: 'Account',
    Content: () => (
      <InputField
        name='email'
        label='Email'
        readOnly={readOnly || false}
        value={email || ''}
      />
    ),
  };
};

export default getAccountSection;
