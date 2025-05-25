import axios from "axios";
import { ProfileInfo } from "../types/profile.types";

export const updateProfileInfoApi = async (
  data: ProfileInfo,
  token: string,
  id: string
) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/profile/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return res.data
  } catch (error) {
    console.log(error)
  }
};

export const updateProfilePhotoApi = async (
  file: File,
  token: string,
  id: string
) => {
  try {
    const formData = new FormData()
    formData.append("image", file)
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/profile/${id}/profile-photo`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return res.data
  } catch (error) {
    console.log(error)
  }
};