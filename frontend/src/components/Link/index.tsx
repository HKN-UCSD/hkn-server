import React from 'react';
import { Link as MuiLink } from '@material-ui/core';

interface LinkProps {
  href: string;
  displayName?: string;
  openInNewTab?: boolean;
}

export const Link = ({ href, displayName = href, openInNewTab = true }: LinkProps) => {
  const newTabProps = {};

  if (openInNewTab) {
    newTabProps['target'] = '_blank';
    newTabProps['rel'] = 'noreferrer';
  }

  return <MuiLink href={href} {...newTabProps}>{displayName}</MuiLink>
}