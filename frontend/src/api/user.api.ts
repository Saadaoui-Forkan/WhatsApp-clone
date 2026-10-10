import api from "./axios";
import { LoginFormValues, RegisterFormValues } from "../types/user.types";
import { AxiosError } from "axios";

const handleError = (error: unknown) => {
  const err = error as AxiosError<{ message: string | string[] }>;
  const errorMsg = err?.response?.data?.message;
  if (Array.isArray(errorMsg)) {
    throw errorMsg;
  }
  throw errorMsg ?? "An unexpected error occurred.";
};

// Login User
export const loginApi = async (data: LoginFormValues) => {
  try {
    const res = await api.post("/users/login", data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// Register User
export const registerApi = async (data: RegisterFormValues) => {
  try {
    const res = await api.post("/users/register", data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// Logout User
export const logoutApi = async () => {
  try {
    await api.post("/users/logout");
  } catch (error) {
    handleError(error);
  }
};

// Verify Email
export const verifyEmailApi = async ({ userId, token }: { userId: string; token: string }) => {
  try {
    const res = await api.get(`/users/${userId}/verify/${token}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// Get conversations (replaces fetchFriendsApi)
export const fetchConversationsApi = async () => {
  try {
    const res = await api.get("/messages/conversations");
    return res.data;
  } catch (error) {
    handleError(error);
  }
};