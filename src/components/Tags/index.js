import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

// Tags can probably take in a map later from tagname to colors
// or specify the configuration they'd like to take in
function Tags({ classes, tags }) {
  return (
    <div className={classes.root}>
      {tags.map(tag => (
        <Chip key={tag} label={tag} className={classes.tag} />
      ))}
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Tags);
