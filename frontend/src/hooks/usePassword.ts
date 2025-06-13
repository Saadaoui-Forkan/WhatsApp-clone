import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi, resetPasswordApi } from "../api/password.api";
import { ResetPasswordTypes } from "../types/password.types";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordApi,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({
      values,
      userId,
      token,
    }: {
      values: ResetPasswordTypes;
      userId: string;
      token: string ;
    }) => resetPasswordApi(values, userId, token),
  });
};