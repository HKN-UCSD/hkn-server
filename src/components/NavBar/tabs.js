import React from 'react';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import AttachmentIcon from '@material-ui/icons/Attachment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventIcon from '@material-ui/icons/Event';
import HomeIcon from '@material-ui/icons/Home';
import AlarmIcon from '@material-ui/icons/Alarm';

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

const InterviewTab = {
  route: ROUTES.INTERVIEW_SCHEDULING,
  icon: <AlarmIcon />,
  text: 'Interview Availability',
};

// const ProfileTab = {
//   route: ROUTES.PROFILE_WITH_ID(ROUTES.CURR_USER_ID_ALIAS),
//   icon: <AccountBoxIcon />,
//   text: 'Profile',
// };

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
  route: ROUTES.POINTS_WITH_ID(ROUTES.CURR_USER_ID_ALIAS),
  icon: <AssessmentOutlinedIcon />,
  text: 'Points',
};

export const OfficerTabs = [
  HomeTab,
  // ProfileTab,
  CalendarTab,
  ResumeTab,
  InducteesTab,
  PointsTab,
  InterviewTab,
];

export const InducteeTabs = [
  HomeTab,
  // ProfileTab,
  CalendarTab,
  ResumeTab,
  PointsTab,
  InterviewTab,
];
