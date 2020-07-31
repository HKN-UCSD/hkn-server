import React from 'react';

import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import AttachmentIcon from '@material-ui/icons/Attachment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventIcon from '@material-ui/icons/Event';
import HomeIcon from '@material-ui/icons/Home';
import * as ROUTES from '@Constants/routes';

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

export const OfficerTabs = [
  HomeTab,
  CalendarTab,
  ResumeTab,
  InducteesTab,
  PointsTab,
];

export const InducteeTabs = [HomeTab, CalendarTab, ResumeTab, PointsTab];
