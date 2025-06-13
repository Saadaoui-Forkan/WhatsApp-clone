import axios, { AxiosError } from "axios";
import { ResetPasswordTypes } from "../types/password.types";

// Forgot Password
export const forgotPasswordApi = async (email: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/password/reset-password`,
       { email }
    );
    return data;
  } catch (error) {
    const err = error as AxiosError<{ message: string | string[] }>;
    const errorMsg = err?.response?.data?.message;
    if (Array.isArray(errorMsg)) {
      throw errorMsg;
    }
    throw errorMsg ?? "An unexpected error occurred.";
  }
};

// Reset Password
export const resetPasswordApi = async (
  data: ResetPasswordTypes,
  userId: string,
  token: string
) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/password/reset-password/${userId}/${token}`,
      data
    );
    return res.data
  } catch (error) {
    const err = error as AxiosError<{ message: string | string[] }>;
    const errorMsg = err?.response?.data?.message;
    if (Array.isArray(errorMsg)) {
      throw errorMsg;
    }
    throw errorMsg ?? "An unexpected error occurred.";
  }
};