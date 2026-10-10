import api from "./axios";
import { AxiosError } from "axios";

const handleError = (error: unknown) => {
  const err = error as AxiosError<{ message: string | string[] }>;
  const errorMsg = err?.response?.data?.message;
  if (Array.isArray(errorMsg)) {
    throw errorMsg;
  }
  throw errorMsg ?? "An unexpected error occurred.";
};

// Get conversation messages (cursor-based)
export const getConversationMessagesApi = async (userId: string, cursor?: string) => {
  try {
    const res = await api.get(`/messages/${userId}`, {
      params: cursor ? { cursor } : {},
    });
    return res.data;
  } catch (error) {
    handleError(error);
    return { messages: [], nextCursor: null, hasMore: false };
  }
};

// Get all conversations for current user
export const getConversationsApi = async () => {
  try {
    const res = await api.get("/messages/conversations");
    return res.data;
  } catch (error) {
    handleError(error);
    return { conversations: [] };
  }
};

// Upload message attachment (image)
export const uploadAttachmentApi = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const res = await api.post("/messages/attachment", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};