import api from "./axios";
import { ResetPasswordTypes } from "../types/password.types";
import { AxiosError } from "axios";

const handleError = (error: unknown) => {
  const err = error as AxiosError<{ message: string | string[] }>;
  const errorMsg = err?.response?.data?.message;
  if (Array.isArray(errorMsg)) {
    throw errorMsg;
  }
  throw errorMsg ?? "An unexpected error occurred.";
};

// Forgot Password
export const forgotPasswordApi = async (email: string) => {
  try {
    const { data } = await api.post("/users/password/reset-password", { email });
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Reset Password
export const resetPasswordApi = async (
  data: ResetPasswordTypes,
  userId: string,
  token: string
) => {
  try {
    const res = await api.post(`/users/password/reset-password/${userId}/${token}`, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};