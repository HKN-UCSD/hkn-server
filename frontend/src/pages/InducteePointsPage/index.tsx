import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';

import useStyles from './styles';

import { POINTS_WITH_ID } from '@Constants/routes';
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
  const history = useHistory();

  useEffect(() => {
    const getInducteePoints = async () => {
      const points = await getAllInducteePoints();
      setInducteePoints(points);
    };
    getInducteePoints();
  }, []);

  const actions = [
    {
      icon: () => <PersonIcon />,
      tooltip: 'See more',
      onClick: (_: unknown, row: InducteePoint) =>
        history.push(POINTS_WITH_ID(row.user)),
    },
  ];

  return (
    <div className={classes.root}>
      <Table
        columns={columns}
        data={inducteePoints}
        actions={actions}
        title='Inductee Points'
        options={{
          filtering: true,
          exportButton: true,
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
}
