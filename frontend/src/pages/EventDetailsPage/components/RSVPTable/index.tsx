import React, { useEffect, useState } from 'react';

import { useInterval } from '@Hooks';
import { Table } from '@SharedComponents';
import {
  RSVPResponse,
  MultipleRSVPResponse,
  AppUserEventResponse,
} from '@Services/api/models';

interface RSVPTableProps {
  getRSVPs: () => Promise<MultipleRSVPResponse>;
}

function RSVPTable(props: RSVPTableProps) {
  const { getRSVPs } = props;
  const [rsvps, setRSVPs] = useState<RSVPResponse[]>([]);

  const columns = [
    { title: 'Full Name', field: 'name' },
    { title: 'Role', field: 'role' },
  ];

  useEffect(() => {
    const getEventRSVPs = async () => {
      const { rsvps: incomingRSVPs } = await getRSVPs();
      setRSVPs(incomingRSVPs);
    };

    getEventRSVPs();
  }, [getRSVPs]);

  useInterval({
    callback: async () => {
      const { rsvps: incomingRSVPs } = await getRSVPs();
      setRSVPs(incomingRSVPs);
    },
    delay: 1000,
  });

  const rsvpData = rsvps.map(rsvp => {
    const {
      firstName,
      lastName,
      role: appUserRole,
    }: AppUserEventResponse = rsvp.appUser;
    const fullName = `${firstName} ${lastName}`;
    const role = appUserRole.charAt(0).toUpperCase() + appUserRole.slice(1);

    const rsvpToDisplay = {
      ...rsvp,
      name: fullName,
      role,
    };

    return rsvpToDisplay;
  });

  return (
    <Table
      columns={columns}
      data={rsvpData}
      title=''
      options={{ exportButton: true }}
    />
  );
}

export default RSVPTable;
