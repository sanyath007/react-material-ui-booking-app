import jwt from 'jwt-decode';

const isAuthExpired = () => {
  const now = new Date();
  const exp = localStorage.getItem('access_token')
    ? jwt(localStorage.getItem('access_token'))?.exp
    : null;

  console.log(`${exp * 1000} < ${now.getTime()}`);

  return exp * 1000 < now.getTime();
};

export default isAuthExpired;
