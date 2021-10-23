import * as Yup from 'yup';

const schema = Yup.object({
  email: Yup.string()
    .email('Your inputted email is invalid!')
    .matches(
      RegExp('^.*(ucsd)\\.edu$'),
      'Your inputted email is not a UCSD email!'
    )
    .required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  major: Yup.string().required('Required'),
  graduationYear: Yup.number().required('Required'),
  preferredName: Yup.string(),
  pronoun: Yup.string(),
  customPronoun: Yup.string(),
  infoSession: Yup.string().required('Required'),
});

export default schema;
