import React from 'react';
import { Grid } from '@material-ui/core';

import {
  PointRequirementCard,
  ProfessionalRequirementCard,
  MentorshipRequirementCard,
  TechnicalRequirementCard,
  SocialRequirementCard,
} from '../RequirementCard';
import { AttendanceTable } from '../AttendanceTable/AttendanceTable';

import { Card } from '@SharedComponents';
import { AppUserInducteePointsResponse } from '@Services/api/models';

export interface InducteeRequirementsCardProps {
  inducteeRequirementStatus: AppUserInducteePointsResponse;
}

export function InducteeRequirementsCard({
  inducteeRequirementStatus,
}: InducteeRequirementsCardProps) {
  const {
    points,
    attendance,
    hasMentorshipRequirement,
    hasProfessionalRequirement,
    hasTechnicalRequirement,
    hasSocialRequirement,
  } = inducteeRequirementStatus;

  return (
    <Card title='Induction Requirements'>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <PointRequirementCard points={points} isSatisfied={points >= 10} />
        </Grid>

        <Grid item sm={4} xs={12}>
          <MentorshipRequirementCard isSatisfied={hasMentorshipRequirement} />
        </Grid>

        <Grid item sm={4} xs={12}>
          <ProfessionalRequirementCard
            isSatisfied={hasProfessionalRequirement}
          />
        </Grid>

        <Grid item sm={4} xs={12}>
          <TechnicalRequirementCard isSatisfied={hasTechnicalRequirement} />
        </Grid>

        <Grid item sm={4} xs={12}>
          <SocialRequirementCard isSatisfied={hasSocialRequirement} />
        </Grid>

        <Grid item xs={12}>
          <AttendanceTable attendances={attendance} />
        </Grid>
      </Grid>
    </Card>
  );
}
