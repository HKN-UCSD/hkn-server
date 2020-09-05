import * as React from 'react';

import GenericDropdownField from '@SharedComponents/dropdowns/base';
import { EventTypeEnum } from '@Services/EventService';

type EventTypeFieldProp = {
  name: string;
  label: string;
  fullWidth: boolean;
};

const EventTypeDropdownField = (props: EventTypeFieldProp) => {
  const { name, label, fullWidth } = props;

  return (
    <GenericDropdownField
      name={name}
      label={label}
      fullWidth={fullWidth}
      capitalizeLabel
      selections={Object.values(EventTypeEnum)}
    />
  );
};

export default EventTypeDropdownField;
