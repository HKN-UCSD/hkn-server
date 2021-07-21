import * as Yup from 'yup';

const schema = Yup.object({
  email: Yup.string()
    .email('Invalid email.')
    .required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  major: Yup.string().required('Required'),
  gradYear: Yup.number().required('Required'),
});

export default schema;
