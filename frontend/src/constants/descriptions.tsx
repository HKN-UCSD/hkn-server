import React from 'react';
import { Typography } from '@material-ui/core';

import { Link } from '@SharedComponents';

export const DescriptionText = () => (
  <Typography>
    Info Session 1: Friday, Oct. 7th at 7PM <br />
    Info Session 2: Tuesday, Oct. 11th at 4PM <br />
    {/* Location: Zoom (Check invite email for link) <br /> */}
    Zoom Link: <Link
      href='https://ucsd.zoom.us/j/94648277244'
      openInNewTab
    />{' '}
    <br />
  </Typography>
);
