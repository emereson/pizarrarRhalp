import HTTP from 'services/conn';

export const login = async ({ email, password }) => {
  const loginResponse = await HTTP.post('login/', { email, password });
  return loginResponse.data;
};

export const chatUser = async body => {
  const newUserChatResponse = await HTTP.post('user/chat', body);
  return newUserChatResponse.data;
};

export const checkToken = async body => {
  const checkTokenResponse = await HTTP.post('login/check', body);
  return checkTokenResponse.data;
};
