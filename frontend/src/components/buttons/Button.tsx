import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@material-ui/core';

export interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  positive?: boolean;
  negative?: boolean;
}

export function Button({
  primary = false,
  secondary = false,
  positive = false,
  negative = false,
  ...props
}: ButtonProps): JSX.Element {
  const buttonProps: MuiButtonProps = {};
  if (primary) {
    buttonProps.variant = 'contained';
  } else if (secondary) {
    buttonProps.variant = 'outlined';
  }

  if (positive) {
    buttonProps.color = 'primary';
  } else if (negative) {
    buttonProps.color = 'secondary';
  }

  return <MuiButton {...props} {...buttonProps} />;
}
