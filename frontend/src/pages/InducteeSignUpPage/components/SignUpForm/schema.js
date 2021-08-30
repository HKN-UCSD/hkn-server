import * as Yup from 'yup';

const PW_MIN_LENGTH = 6;

const schema = Yup.object({
  email: Yup.string()
    .email('Your inputted email is invalid!')
    .required('Required'),
  password: Yup.string()
    .min(PW_MIN_LENGTH, 'Your password is too short!')
    .required('Required'),
  confirmPW: Yup.string().when('password', {
    is: value => value && value.length > 0,
    then: Yup.string()
      .oneOf([Yup.ref('password')], 'Both passwords need to be the same')
      .required('Required'),
  }),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  major: Yup.string()
    .min(2, 'Your major is too short!')
    .required('Required'),
  gradYear: Yup.number().required('Required'),
  preferName: Yup.string(),
  pronoun: Yup.string(),
  customPronoun: Yup.string(),
  coursework: Yup.bool().required('Required'),
  info1: Yup.bool(),
  info2: Yup.bool(),
  info3: Yup.bool(),
  newsletter: Yup.bool().required('Required'),
});

export default schema;
