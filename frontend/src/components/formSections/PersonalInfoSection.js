import React from 'react';
import { Grid } from '@material-ui/core';

import InputField from '../InputField';
import { MajorDropdownField, YearDropdownField } from '../dropdowns';

const getPersonalInfoSection = params => {
  let readOnly;
  if (params === undefined) {
    readOnly = false;
  } else {
    readOnly = params.readOnly;
  }

  const { firstName, lastName, major, graduationYear } = params || {};

  return {
    title: 'Personal Info',
    Content: () => (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <InputField
                readOnly={readOnly}
                value={firstName || ''}
                name='firstName'
                label='First Name'
              />
            </Grid>
            <Grid item>
              <InputField
                readOnly={readOnly}
                value={lastName || ''}
                name='lastName'
                label='Last Name'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              {/* TODO: fix this when we add support for readonly custom dropdownfields to maintain constant width */}
              {readOnly ? (
                <InputField readOnly label='Major' value={major} />
              ) : (
                <MajorDropdownField name='major' label='Major' />
              )}
            </Grid>
            <Grid item>
              {readOnly ? (
                <InputField readOnly label='Grad Year' value={graduationYear} />
              ) : (
                <YearDropdownField name='gradYear' label='Grad Year' />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    ),
  };
};

export default getPersonalInfoSection;
