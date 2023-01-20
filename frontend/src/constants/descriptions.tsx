import React from 'react';
import { Typography } from '@material-ui/core';

import { Link } from '@SharedComponents';

export const DescriptionText = () => (
  <Typography>
    <br />
    <br />
    *Pick one of these two sessions to attend*
    <br />
    <br />
    Info Session: February 3rd, 2023 from 6:00pm to 7:00pm PDT <br />
    Location: <Link href='https://ucsd.zoom.us/j/94211715966' openInNewTab />
    <br />
    <br />
    Induction kickoff: February 9th, 2023 from 5:00pm to 7:00pm PDT
    <br />
    Location: Henry Booker Room
    <br />
  </Typography>
);
