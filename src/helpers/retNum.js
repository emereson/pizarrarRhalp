export const retnum = str => {
  const num = str.replace(/[^0-9]/g, '');
  return num === '' ? 0 : parseInt(num, 10);
};
