import React from 'react';
import PropTypes from 'prop-types';

import MultiChipSelect from '../../components/MultiChipSelect';

const FormikMultiChipSelect = ({
  field: { name, value },
  form: { setFieldValue },
  ...props
}) => {
  const { label, className, selections } = props;
  return (
    <div className={className}>
      <MultiChipSelect
        label={label}
        selections={selections}
        value={value}
        onChange={e => setFieldValue(name, e.target.value)}
      />
    </div>
  );
};

FormikMultiChipSelect.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.array,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  selections: PropTypes.arrayOf(PropTypes.string).isRequired,
};

FormikMultiChipSelect.defaultProps = {
  label: '',
  className: '',
};

export default FormikMultiChipSelect;
