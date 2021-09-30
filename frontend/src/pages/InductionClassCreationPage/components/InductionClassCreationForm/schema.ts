import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string().required('Required'),
  quarter: Yup.string()
    .matches(
      RegExp('((FA)|(WI))(\\d\\d)'),
      'Quarter must be in the format (FA/WI)(yy) i.e. FA21'
    )
    .required('Required'),
  startDate: Yup.string().required('Required'),
  endDate: Yup.string().required('Required'),
  interviewStartDateWeekOne: Yup.string().required('Required'),
  interviewStartDateWeekTwo: Yup.string().required('Required'),
});

export default schema;
