import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchFriendsApi, loginApi, logoutApi, registerApi, verifyEmailApi } from "../api/user.api";

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

export const useFetchFriends = (token: string) => {
  return useQuery({
    queryKey: ['friends', token],
    queryFn: () => fetchFriendsApi(token!),
    enabled: !!token, 
  })
}