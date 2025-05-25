import { useMutation } from "@tanstack/react-query";
import { loginApi, logoutApi, registerApi } from "../api/user.api";

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