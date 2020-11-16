import React, { useState, useEffect } from 'react';

import useStyles from './styles';

import { Table } from '@SharedComponents';
import { getAllInducteePoints, InducteePoint } from '@Services/PointsService';

const columns = [
  { title: 'Email', field: 'email' },
  { title: 'Total Points', field: 'points' },
  {
    title: 'Mentorship Requirement',
    field: 'hasMentorshipRequirement',
    lookup: { Complete: 'Complete', Incomplete: 'Incomplete' },
  },
  {
    title: 'Professional Requirement',
    field: 'hasProfessionalRequirement',
    lookup: { Complete: 'Complete', Incomplete: 'Incomplete' },
  },
];

export default function InducteePointsPage() {
  const [inducteePoints, setInducteePoints] = useState<
    InducteePoint[] | undefined
  >(undefined);

  const classes = useStyles();

  useEffect(() => {
    const getInducteePoints = async () => {
      const points = await getAllInducteePoints();
      setInducteePoints(points);
    };
    getInducteePoints();
  }, []);

  return (
    <div className={classes.root}>
      <Table
        columns={columns}
        data={inducteePoints}
        title='Inductee Points'
        options={{ filtering: true }}
      />
    </div>
  );
}
