import * as Yup from 'yup';

const schema = Yup.object({
  startDate: Yup.string().required('Required'),
  endDate: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  hosts: Yup.array().required('Required'),
  fbURL: Yup.string(),
  canvaURL: Yup.string(),
});

export default schema;
