import React from 'react';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventIcon from '@material-ui/icons/Event';
import HomeIcon from '@material-ui/icons/Home';
import AlarmIcon from '@material-ui/icons/Alarm';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import * as ROUTES from '@Constants/routes';

const CalendarTab = {
  route: ROUTES.CALENDAR,
  icon: <EventIcon />,
  text: 'Calendar',
};

const InterviewTab = {
  route: ROUTES.INTERVIEW_SCHEDULING,
  icon: <AlarmIcon />,
  text: 'Interview Availability',
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

/* const PointsTab = {
  route: ROUTES.POINTS_WITH_ID(ROUTES.CURR_USER_ID_ALIAS),
  icon: <AssessmentOutlinedIcon />,
  text: 'Points',
}; */

const InductionClassTab = {
  route: ROUTES.INDUCTION_CLASS_GENERAL,
  icon: <LibraryBooksOutlinedIcon />,
  text: 'Induction Class',
};

const ProfileTab = {
  route: ROUTES.PROFILE_WITH_ID(ROUTES.CURR_USER_ID_ALIAS),
  icon: <AssignmentIndIcon />,
  text: 'Profile',
};

export const OfficerTabs = [
  HomeTab,
  CalendarTab,
  ProfileTab,
  InductionClassTab,
  InducteesTab,
  InterviewTab,
];

export const InducteeTabs = [HomeTab, CalendarTab, ProfileTab, InterviewTab];
