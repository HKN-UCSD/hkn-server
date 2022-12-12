import React from 'react';
import { Typography } from '@material-ui/core';

import { Link } from '@SharedComponents';

export const DescriptionText = () => (
  <Typography>
    Info Session 1: TBD <br />
    Info Session 2: TBD <br />
    {/* Location: Zoom (Check invite email for link) <br /> */}
    Zoom Link: <Link
      href='https://ucsd.zoom.us/j/94648277244'
      openInNewTab
    />{' '}
    <br />
  </Typography>
);
