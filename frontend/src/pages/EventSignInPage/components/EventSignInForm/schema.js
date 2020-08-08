import * as Yup from 'yup';

const schema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Your inputted email is invalid!')
    .matches('^.*(ucsd)\\.edu$', 'Your inputted email is not a UCSD email!')
    .required('Required'),
  major: Yup.string().required('Required'),
  hknAffiliation: Yup.string().required('Required'),
  agreeToPhotoRelease: Yup.bool().required('Required'),
});

export default schema;
