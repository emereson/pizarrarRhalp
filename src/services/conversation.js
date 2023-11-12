import HTTP from 'services/conn';

export const createConv = async ({ visitorId }) => {
  const conversation = await HTTP.post('conversation/', { visitorId });
  console.log(conversation.data);
  return conversation.data;
};

export const attendConversation = async ({ user, conversation }) => {
  const res = await HTTP.post('conversation/attend-conversation', { user, conversation });
  console.log(res.data);
  return res.data;
};

export const getConversations = async user => {
  const res = await HTTP.get('conversation/all', { params: { atendeeId: user.id } });

  console.log(res.data);
  return res.data;
};
