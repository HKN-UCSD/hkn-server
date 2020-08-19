export const GENERIC_400_MSG =
  'The request object received had invalid syntax or missing information.';
export const USER_NOT_WHITELISTED =
  'Cannot create an account since the email id provided does not have any affiliation with HKN. Visit hkn.ucsd.edu to know more.';
export const USER_ALREADY_EXISTS =
  'The provided email is aready linked to an account. Please check the email you have entered.';
export const GENERIC_INTERNAL_ERROR = 'There was an internal error. Please try again later.';

// Auth Error Responses
export const USER_NOT_AUTHORIZED = 'The user is not authorized for this action.';
export const USER_NOT_AUTHENTICATED = 'The user is unauthenticated.';
export const INVALID_ROLE = 'The user has an invalid role.';

// Validation Error Responses
export const INVALID_REQUEST_BODY = (errMsgArray: Array<string>): string => {
  const baseAccumulator = '';
  const reducer = (accumulator: string, currentValue: string) => {
    return accumulator + '- ' + currentValue + '.\n';
  };

  return (
    'The provided request body does not match with the validation schema.\n' +
    'Error messages for key-value pairs that did not match the schema (only keys are shown):\n' +
    `${errMsgArray.reduce(reducer, baseAccumulator)}`
  );
};
