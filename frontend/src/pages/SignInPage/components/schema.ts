import * as Yup from 'yup';

const schema = Yup.object({
  email: Yup.string()
    .email('Your inputted email is invalid!')
    .required('Required'),
  password: Yup.string().required('Required'),
  keepSignedIn: Yup.boolean(),
});

export default schema;
