import { useQuery } from "@tanstack/react-query"
import { getMessagesApi } from "../api/message.api"

export const useFetchMessages = (token: string) => {
  return useQuery({
    queryKey: ['messages', token],
    queryFn: () => getMessagesApi(token!),
    enabled: !!token, 
  })
}