import React, { useState } from 'react';
import {
  Grid,
  Tabs as MuiTabs,
  Tab as MuiTab,
  makeStyles,
  Theme,
} from '@material-ui/core';

import { Card } from './Card';

export interface CardWithVerticalTabsProps {
  items: { title: string; element: JSX.Element }[];
}

const useStyles = makeStyles((theme: Theme) => ({
  tabs: { borderRight: `1px solid ${theme.palette.divider}` },
}));

export function CardWithVerticalTabs({ items }: CardWithVerticalTabsProps) {
  const [index, setIndex] = useState(0);
  const classes = useStyles();

  const handleChange = (_: React.ChangeEvent<unknown>, newValue: number) => {
    setIndex(newValue);
  };

  const tabElements: JSX.Element[] = items.map(item => (
    <MuiTab
      disableRipple
      label={item.title}
      key={item.title}
      wrapped
      style={{ minWidth: 0 }}
    />
  ));

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <MuiTabs
            orientation='vertical'
            value={index}
            onChange={handleChange}
            className={classes.tabs}
          >
            {tabElements}
          </MuiTabs>
        </Grid>
        <Grid item xs>
          {items[index].element}
        </Grid>
      </Grid>
    </Card>
  );
}
