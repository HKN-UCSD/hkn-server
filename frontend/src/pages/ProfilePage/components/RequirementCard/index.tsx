import React from 'react';
import { Tooltip, makeStyles } from '@material-ui/core';

import { Card } from '@SharedComponents';

const useStyles = makeStyles(() => ({
  satisfiedCard: { borderTop: `5px solid green`, height: '100%' },
  unsatisfiedCard: { borderTop: `5px solid red`, height: '100%' },
}));

function makeRequirementCard(satisfiedText: string, unsatisfiedText: string) {
  return (props: RawRequirementCardProps) => {
    const classes = useStyles();

    const { title, isSatisfied } = props;
    if (isSatisfied) {
      return (
        <Tooltip title={<p style={{ fontSize: '16px' }}> {satisfiedText}</p>}>
          <div>
            <Card
              className={classes.satisfiedCard}
              title={title}
              elevation={2}
            />
          </div>
        </Tooltip>
      );
    }
    return (
      <Tooltip title={<p style={{ fontSize: '16px' }}> {unsatisfiedText}</p>}>
        <div>
          <Card
            className={classes.unsatisfiedCard}
            title={title}
            elevation={2}
          />
        </div>
      </Tooltip>
    );
  };
}

interface RawRequirementCardProps {
  title: string;
  isSatisfied: boolean;
}

export interface RequirementCardProps {
  isSatisfied: boolean;
}

const RawPointRequirementCard = makeRequirementCard(
  'You have satisfied the 10 point requirement for induction.',
  'You have not satisfied the 10 point requirement for induction.'
);

export interface PointRequirementCardProps {
  points: number;
  isSatisfied: boolean;
}

export function PointRequirementCard({
  points,
  isSatisfied,
}: PointRequirementCardProps): JSX.Element {
  return (
    <RawPointRequirementCard
      title={`Points: ${points}`}
      isSatisfied={isSatisfied}
    />
  );
}

const RawProfessionalRequirementCard = makeRequirementCard(
  'You have satisfied the professional event requirement for induction.',
  'You have not satisfied the professional event requirement for induction.'
);

export function ProfessionalRequirementCard({
  isSatisfied,
}: RequirementCardProps): JSX.Element {
  const title = isSatisfied
    ? 'Professional: Complete'
    : 'Professional: Incomplete';
  return (
    <RawProfessionalRequirementCard title={title} isSatisfied={isSatisfied} />
  );
}

const RawMentorshipRequirementCard = makeRequirementCard(
  'You have satisfied the mentorship requirement for induction.',
  'You have not satisfied the mentorship requirement for induction.'
);

export function MentorshipRequirementCard({
  isSatisfied,
}: RequirementCardProps): JSX.Element {
  const title = isSatisfied ? 'Mentorship: Complete' : 'Mentorship: Incomplete';
  return (
    <RawMentorshipRequirementCard title={title} isSatisfied={isSatisfied} />
  );
}
