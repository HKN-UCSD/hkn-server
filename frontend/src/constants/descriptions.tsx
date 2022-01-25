import React from 'react';
import { Typography } from '@material-ui/core';

import { Link } from '@SharedComponents';

export const DescriptionText = () => (
  <Typography>
    Info Session 1: Thursday, Jan. 27th at 5PM <br />
    Info Session 2: Wednesday, Feb. 2nd at 7PM <br />
    Zoom Link: <Link
      href='https://ucsd.zoom.us/j/91836877195'
      openInNewTab
    />{' '}
    <br />
  </Typography>
);
