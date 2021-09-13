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
  graduationYear: Yup.number().required('Required'),
  preferredName: Yup.string(),
  pronoun: Yup.string(),
  customPronoun: Yup.string(),
  infoSession: Yup.string().required('Required'),
  courseRequirement: Yup.boolean().required('Required'),
  newsletter: Yup.boolean().required('Required'),
});

export default schema;
