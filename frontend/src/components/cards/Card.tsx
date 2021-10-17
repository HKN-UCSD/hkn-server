import React from 'react';
import {
  Card as MuiCard,
  CardHeader as MuiCardHeader,
  CardContent as MuiCardContent,
} from '@material-ui/core';

export interface CardProps {
  title?: string;
  children?: JSX.Element;
  className?: string;
  elevation?: number;
}

export function Card({
  children,
  title,
  className,
  elevation = 3,
}: CardProps): JSX.Element {
  return (
    <MuiCard elevation={elevation} className={className}>
      {title ? <MuiCardHeader title={title} /> : null}
      {children ? <MuiCardContent>{children}</MuiCardContent> : <></>}
    </MuiCard>
  );
}
