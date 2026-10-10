import axios from "axios";

// Get conversation messages (cursor-based)
export const getConversationMessagesApi = async (
  userId: string,
  token: string,
  cursor?: string
) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/messages/${userId}`,
      {
        params: cursor ? { cursor } : {},
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { messages: [], nextCursor: null, hasMore: false };
  }
};

// Get all conversations for current user
export const getConversationsApi = async (token: string) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/messages/conversations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { conversations: [] };
  }
};
