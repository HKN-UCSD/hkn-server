import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  InputLabel,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import styles from './styles';

class ChipListInput extends React.Component {
  constructor(props) {
    super(props);
    const { selections } = props;

    this.state = {
      selections: selections.sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }),
      addField: false,
      selectAddition: '',
    };
  }

  handleDelete = entry => {
    const { onChange } = this.props;

    const { selections } = this.state;
    const newSelections = selections.filter(option => option !== entry);

    if (onChange) {
      onChange(newSelections);
    }

    this.setState({ selections: newSelections });
  };

  toggleAddition = () => {
    this.setState(prevState => ({ addField: !prevState.addField }));
  };

  addSelection = () => {
    const { onChange } = this.props;
    const { selections, selectAddition } = this.state;

    const candidate = selectAddition.trim();
    if (candidate === '' || selections.includes(candidate)) {
      this.setState({ selectAddition: '' });
      return;
    }
    const newSelections = selections.concat(candidate).sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    if (onChange) {
      onChange(newSelections);
    }
    this.setState({ selections: newSelections, selectAddition: '' });
  };

  handleAdditionChange = e => {
    this.setState({
      selectAddition: e.target.value,
    });
  };

  render() {
    const { classes, label } = this.props;

    const { selections, addField, selectAddition } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <InputLabel shrink>{label}</InputLabel>
          <Paper>
            {selections.map(entry => {
              return (
                <Chip
                  key={entry}
                  label={entry}
                  onDelete={() => this.handleDelete(entry)}
                  variant='outlined'
                  className={classes.chip}
                />
              );
            })}

            {addField ? null : (
              <IconButton onClick={() => this.toggleAddition()}>
                <AddCircleOutlineIcon />
              </IconButton>
            )}
          </Paper>
        </div>

        {addField ? (
          <div>
            <TextField
              className={classes.addSelection}
              autoFocus
              value={selectAddition}
              fullWidth
              variant='outlined'
              placeholder='Add another host'
              onChange={e => this.handleAdditionChange(e)}
              onKeyPress={ev => {
                if (ev.key === 'Enter') {
                  this.addSelection();
                  ev.preventDefault();
                }
              }}
              InputProps={{
                // InputProps is correctly capitalized, material ui is jank
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => this.addSelection()}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ChipListInput.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

ChipListInput.defaultProps = {
  label: '',
  onChange: null,
};

export default withStyles(styles)(ChipListInput);
