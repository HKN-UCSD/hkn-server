import React, { useState, useEffect } from 'react';

import { BaseAutocomplete } from '../base';

import { getMultipleUsers, getUserNames } from '@Services/UserService';

export type OfficerNameData = {
  id: number;
  firstName: string;
  lastName: string;
};

type OfficerAutocompleteProp = {
  name: string;
  label: string;
  fullWidth?: boolean;
};

export const OfficerNameAutocomplete = (props: OfficerAutocompleteProp) => {
  const { name, label, fullWidth = false } = props;
  const [officerNames, setOfficerNames] = useState<OfficerNameData[]>([]);

  useEffect(() => {
    getMultipleUsers({
      officers: true,
      names: true,
    }).then(officerNameArr => {
      setOfficerNames(getUserNames(officerNameArr));
    });
  }, []);

  return (
    <BaseAutocomplete
      name={name}
      label={label}
      multiple
      filterSelectedOptions
      options={officerNames}
      getOptionLabel={option => `${option.firstName} ${option.lastName}`}
      getOptionSelected={(option, value) =>
        option.id === value.id &&
        option.firstName === value.firstName &&
        option.lastName === value.lastName
      }
      fullWidth={fullWidth}
    />
  );
};

OfficerNameAutocomplete.defaultProps = {
  fullWidth: false,
};
