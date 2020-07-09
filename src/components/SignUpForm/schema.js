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
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
  major: Yup.string()
    .min(2, 'Your major is too short!')
    .required('Required'),
  gradYear: Yup.number().required('Required'),
});

export default schema;
