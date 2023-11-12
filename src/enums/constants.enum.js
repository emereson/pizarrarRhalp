export default {
  CLASSROOM_NOT_ASSIGNED: 'CLASSROOM_NOT_ASSIGNED',
  TEACHER_REGEX: /-teacher$/i,
  POLL_INTERVAL: 5000
};

export const CLASS_COLORS = {
  EMPTY: 'white',
  DISABLED: 'red',
  WITH_ONLY_TEACHER_HEADER: 'rgb(147,255,127)',
  WITH_ONLY_STUDENTS_HEADER: 'rgb(255,151,250)',
  WITH_STUDENTS_AND_TEACHER_BODY: 'rgb(21,231,255)',
  WITH_ONLY_STUDENTS_BODY: 'rgb(180,127,255)'
};

export const USER_STATUS = {
  NOT_ASSIGNED: 'none',
  ASSIGNED: '#8B8E9F',
  IN_CLASS: '#0CDB3C'
};

export const USER_ROLES = {
  ADMINS: 'ADMIN',
  TEACHERS: 'TEACHER',
  STUDENTS: 'STUDENT'
};

export const ICONS_COLORS = {
  BLACK: 'black',
  WHITE: 'white',
  GREY: 'grey'
};

export const LOCK_CLASS_COLOR = 'rgba(997,97,97, 0.1)';

export const SLIDE_ELEMENT_TYPES = {
  IMAGE: 'IMAGE',
  TEXT: 'TEXT'
};
