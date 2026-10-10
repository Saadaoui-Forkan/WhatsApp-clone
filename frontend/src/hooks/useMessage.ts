import { useInfiniteQuery } from "@tanstack/react-query";
import { getConversationMessagesApi } from "../api/message.api";

export const useFetchConversationMessages = (userId: string, token: string) => {
  return useInfiniteQuery({
    queryKey: ["messages", userId, token],
    queryFn: ({ pageParam }) => getConversationMessagesApi(userId, token, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!userId && !!token,
    initialPageParam: undefined,
  });
};
