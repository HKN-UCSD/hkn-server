import React from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';

import EventCreationPage from '../EventCreationPage';

import { OfficerRoutingPermission } from '@HOCs/RoutingPermissions';

/*
 * This is for conditional rendering of component(s) at /events endpoint based on
 * the endpoint's query parameters
 */
function QueriedEventPage(): JSX.Element {
  const location = useLocation();
  const values = queryString.parse(location.search);
  const { create } = values;

  let PageToReturn = <></>;

  if (create === 'true') {
    PageToReturn = OfficerRoutingPermission(EventCreationPage)({});
  }

  return PageToReturn;
}

export default QueriedEventPage;
