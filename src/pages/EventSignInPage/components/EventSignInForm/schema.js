import * as Yup from 'yup';

const schema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Your inputted email is invalid!')
    .required('Required'),
  major: Yup.string().required('Required'),
  hknAffilication: Yup.string().required('Required'),
  consentForPhotos: Yup.string().required('Required'),
});

export default schema;
