export const conversationSelector = state =>
  state.conversation.conversations.find(conversation => conversation.current);
export const conversationsSelector = state => state.conversation.conversations;
