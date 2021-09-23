import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string().required('Required'),
  startDate: Yup.string().required('Required'),
  endDate: Yup.string().required('Required'),
  interviewStartDateWeekOne: Yup.string().required('Required'),
  interviewStartDateWeekTwo: Yup.string().required('Required'),
});

export default schema;
