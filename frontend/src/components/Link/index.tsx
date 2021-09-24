import React from 'react';
import { Link as MuiLink } from '@material-ui/core';

interface LinkProps {
  url: string;
  displayName?: string;
  openInNewTab?: boolean;
}

export const Link = ({ url, displayName = url, openInNewTab = true }: LinkProps) => {
  const newTabProps = {};

  if (openInNewTab) {
    newTabProps['target'] = '_blank';
    newTabProps['rel'] = 'noreferrer';
  }

  return <MuiLink href={url} {...newTabProps}>{displayName}</MuiLink>
}