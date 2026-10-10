import api from "./axios";
import { ProfileInfo } from "../types/profile.types";
import { AxiosError } from "axios";

const handleError = (error: unknown) => {
  const err = error as AxiosError<{ message: string | string[] }>;
  const errorMsg = err?.response?.data?.message;
  if (Array.isArray(errorMsg)) {
    throw errorMsg;
  }
  throw errorMsg ?? "An unexpected error occurred.";
};

export const updateProfileInfoApi = async (data: ProfileInfo, id: string) => {
  try {
    const res = await api.put(`/profile/${id}`, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateProfilePhotoApi = async (file: File, id: string) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const res = await api.put(`/profile/${id}/profile-photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};