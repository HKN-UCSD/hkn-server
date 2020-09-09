import React from 'react';
import {
  Card as MuiCard,
  CardHeader as MuiCardHeader,
  CardContent as MuiCardContent,
} from '@material-ui/core';

export interface CardProps {
  title?: string;
  children: JSX.Element;
  className?: string;
}

export function Card({ children, title, className }: CardProps): JSX.Element {
  return (
    <MuiCard elevation={3} className={className}>
      {title ? <MuiCardHeader title={title} /> : null}
      <MuiCardContent>{children}</MuiCardContent>
    </MuiCard>
  );
}
