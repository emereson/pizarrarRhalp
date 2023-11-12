export const checkUserinfo = userInfo => {
  const { name, email, tel, country } = userInfo;
  return name !== '' && email !== '' && country !== '' && tel !== '';
};
