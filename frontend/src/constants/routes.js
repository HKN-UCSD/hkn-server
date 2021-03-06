// export const LANDING = '/'
export const SIGN_UP = '/signup';
export const SIGN_IN = '/login';
export const CALENDAR = '/calendar';
export const HOME = '/';
export const EVENTS = '/events';
export const POINTS = '/points/:id';
export const RESUME = '/resume';
export const INDUCTEES = '/inductees';
export const EVENT_EDIT = '/events/:eventId/edit';
export const EVENT_DETAILS = '/events/:id';
export const EVENT_CREATION = '/events?create=true';
export const TEST = '/test';
export const PROFILE = '/profile/:id';
export const PROFILE_EDIT = '/profile/:id/edit';
export const EVENT_SIGN_IN = '/events/:id/signin';
export const EVENT_RSVP = '/events/:id/rsvp';
export const INTERVIEW_SCHEDULING = '/interview-scheduling';

export const PROFILE_WITH_ID = id => `/profile/${id}`;
export const PROFILE_EDIT_WITH_ID = id => `/profile/${id}/edit`;
export const POINTS_WITH_ID = id => `/points/${id}`;

export const CURR_USER_ID_ALIAS = 'me';
