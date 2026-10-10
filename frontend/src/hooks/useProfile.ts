import { useMutation } from "@tanstack/react-query";
import { updateProfileInfoApi, updateProfilePhotoApi } from "../api/profile.api";
import { ProfileInfo } from "../types/profile.types";

export const useUpdateProfileInfo = () => {
  return useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: ProfileInfo;
      id: string;
    }) => updateProfileInfoApi(data, id),
  });
};

export const useUpdateProfilePhoto = () => {
  return useMutation({
    mutationFn: ({
      file,
      id,
    }: {
      file: File;
      id: string;
    }) => updateProfilePhotoApi(file, id),
  });
};