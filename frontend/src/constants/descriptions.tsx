import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from '@SharedComponents';
 

export const DescriptionText = () => (
  <Typography>
    Info Session 1: Friday, Oct. 8th at 4PM <br />
    Info Session 2: Tuesday, Oct. 12th at 7PM <br />
	Zoom Link: <Link href='https://ucsd.zoom.us/j/94709541216' openInNewTab /> <br />
  </Typography>
);