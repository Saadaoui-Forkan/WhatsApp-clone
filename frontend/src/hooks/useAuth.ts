import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi } from "../api/user.api";

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