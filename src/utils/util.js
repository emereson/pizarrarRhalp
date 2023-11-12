import constants from '../enums/constants.enum';

export const isTeacher = email => {
  return constants.TEACHER_REGEX.test(email);
};

export const getAdminSecret = email => {
  return 'admin secret';
};

export const getDateFromTimestamp = timestamp => {
  const date = new Date(timestamp);
  return {
    date: `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }/${date.getFullYear()}`,
    hour: `${
      date.getHours() > 12
        ? `0${date.getHours() - 12}`
        : `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}`
    }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}${
      date.getHours() > 12 ? 'pm' : 'am'
    }`
  };
};
