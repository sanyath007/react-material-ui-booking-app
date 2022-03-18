import moment from 'moment';
import isAuthExpired from './auth';
import initials from './getInitials';
import fileReader from './fileReader';
import responsedErrorHandler from './responsedErrorHandler';

const currencyFormater = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'THB',
  maximumFractionDigits: 0
});

const calcAge = (birthday) => {
  const now = moment();
  const birth = moment(birthday, 'YYYY');

  return now.diff(birth, 'years');
};

const currencyFormat = (value) => {
  return currencyFormater.format(value);
};

export {
  calcAge,
  currencyFormat,
  isAuthExpired,
  initials,
  fileReader,
  responsedErrorHandler
};
