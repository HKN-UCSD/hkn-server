import * as React from 'react';

import GenericDropdownField from '@SharedComponents/dropdowns/base';
import { EventStatusEnum } from '@Services/EventService';

type EventStatusFieldProp = {
  name: string;
  label: string;
  fullWidth?: boolean;
};

const EventStatusDropdownField = (props: EventStatusFieldProp) => {
  const { name, label, fullWidth = false } = props;

  return (
    <GenericDropdownField
      name={name}
      label={label}
      fullWidth={fullWidth}
      capitalizeLabel
      selections={Object.values(EventStatusEnum)}
    />
  );
};

EventStatusDropdownField.defaultProps = {
  fullWidth: false,
};

export default EventStatusDropdownField;
