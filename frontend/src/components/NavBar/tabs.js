import React from 'react';

import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import AttachmentIcon from '@material-ui/icons/Attachment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventIcon from '@material-ui/icons/Event';
import HomeIcon from '@material-ui/icons/Home';
import * as ROUTES from '../../constants/routes';

const CalendarTab = {
  route: ROUTES.CALENDAR,
  icon: <EventIcon />,
  text: 'Calendar',
};

const ResumeTab = {
  route: ROUTES.RESUME,
  icon: <AttachmentIcon />,
  text: 'Resume',
};

const HomeTab = {
  route: ROUTES.HOME,
  icon: <HomeIcon />,
  text: 'Get Involved',
};

const InducteesTab = {
  route: ROUTES.INDUCTEES,
  icon: <ListAltIcon />,
  text: 'Inductee Points',
};

const PointsTab = {
  route: ROUTES.POINTS,
  icon: <AssessmentOutlinedIcon />,
  text: 'Points',
};

const ProfileTabWithUid = uid => ({
  route: ROUTES.PROFILEWITHID(uid),
  icon: <AccountCircleIcon />,
  text: 'Profile',
});

// TODO encapsulate tab logic within this file later on.
export const GetOfficerTabs = uid => [
  HomeTab,
  ProfileTabWithUid(uid),
  CalendarTab,
  ResumeTab,
  InducteesTab,
  PointsTab,
];

export const GetInducteeTabs = uid => [
  HomeTab,
  ProfileTabWithUid(uid),
  CalendarTab,
  ResumeTab,
  PointsTab,
];
