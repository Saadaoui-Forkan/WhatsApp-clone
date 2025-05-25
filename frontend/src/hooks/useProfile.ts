import { useMutation } from "@tanstack/react-query";
import { updateProfileInfoApi, updateProfilePhotoApi } from "../api/profile.api";
import { ProfileInfo } from "../types/profile.types";

export const useUpdateProfileInfo = () => {
  return useMutation({
    mutationFn: ({
      data,
      token,
      id,
    }: {
      data: ProfileInfo;
      token: string;
      id: string;
    }) => updateProfileInfoApi(data, token, id),
  });
};

export const useUpdateProfilePhoto = () => {
  return useMutation({
    mutationFn: ({
      file,
      token,
      id,
    }: {
      file: File;
      token: string;
      id: string;
    }) => updateProfilePhotoApi(file, token, id),
  });
};