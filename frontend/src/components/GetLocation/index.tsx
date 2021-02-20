import React from 'react';
import { Link, Typography } from '@material-ui/core';

interface GetLocationProps {
    location: string
}

const GetLocation = (props: GetLocationProps) => {
    const { location } = props;
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const _ = new URL(location);
    } catch (_) {
        return <Typography>{location}</Typography>;
    }
    return <Link href={location}>{location}</Link>;
}

export default GetLocation;