import { useMutation } from "@tanstack/react-query";
import { loginApi, logoutApi, registerApi, verifyEmailApi } from "../api/user.api";
import { useAuthStore } from "../store/auth.store";

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