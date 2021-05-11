import moment from 'moment';

const calcAge = (birthday) => {
  const now = moment();
  const birth = moment(birthday, 'YYYY');

  return now.diff(birth, 'years');
};

export default calcAge;
