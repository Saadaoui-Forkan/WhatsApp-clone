import { useInfiniteQuery } from "@tanstack/react-query";
import { getConversationMessagesApi } from "../api/message.api";

export const useFetchConversationMessages = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ["messages", userId],
    queryFn: ({ pageParam }) => getConversationMessagesApi(userId, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!userId,
    initialPageParam: undefined,
  });
};
