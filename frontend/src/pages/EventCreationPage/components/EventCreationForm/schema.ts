import * as Yup from 'yup';

const schema = Yup.object({
  startDate: Yup.string().required('Required'),
  endDate: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  hosts: Yup.array().required('Required'),
  fbURL: Yup.string().url('Please either enter a valid URL or leave it blank'),
  canvaURL: Yup.string().url(
    'Please either enter a valid URL or leave it blank'
  ),
});

export default schema;
