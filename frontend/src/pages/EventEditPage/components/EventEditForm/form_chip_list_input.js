import React from 'react';
import PropTypes from 'prop-types';

import ChipListInput from '../ChipListInput';

const FormikChipListInput = ({
  field: { name, value },
  form: { setFieldValue },
  ...props
}) => {
  const { label, className } = props;
  return (
    <div className={className}>
      <ChipListInput
        label={label}
        selections={value}
        onChange={newValue => setFieldValue(name, newValue)}
      />
    </div>
  );
};

FormikChipListInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.array,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

FormikChipListInput.defaultProps = {
  label: '',
  className: '',
};

export default FormikChipListInput;
