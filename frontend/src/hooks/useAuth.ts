import { useMutation, useQuery } from "@tanstack/react-query";
import { loginApi, logoutApi, registerApi, verifyEmailApi, fetchConversationsApi } from "../api/user.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutApi,
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmailApi
  })
}

export const useFetchConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversationsApi,
  })
}