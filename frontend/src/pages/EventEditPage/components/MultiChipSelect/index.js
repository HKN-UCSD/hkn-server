import React from 'react';
import PropTypes from 'prop-types';
import { Chip, Select, MenuItem, Input, InputLabel } from '@material-ui/core';

class MultiChipSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value || [] };
  }

  handleChange = event => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(event);
    }

    this.setState({ value: event.target.value });
  };

  render() {
    const { selections, label } = this.props;
    const { value } = this.state;

    return (
      <div>
        <InputLabel id={label} shrink>
          {label}
        </InputLabel>
        <Select
          labelId={label}
          multiple
          value={value}
          onChange={this.handleChange}
          input={<Input />}
          renderValue={selected => (
            <div>
              {selected.map(sel => (
                <Chip key={sel} label={sel} />
              ))}
            </div>
          )}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
        >
          {selections.map(select => (
            <MenuItem key={select} value={select}>
              {select}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }
}

MultiChipSelect.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

MultiChipSelect.defaultProps = {
  label: '',
  value: [],
  onChange: null,
};

export default MultiChipSelect;
