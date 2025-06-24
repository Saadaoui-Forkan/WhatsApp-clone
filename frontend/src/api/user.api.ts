import axios, { AxiosError } from "axios";
import { LoginFormValues, RegisterFormValues } from "../types/user.types";

// Login User
export const loginApi = async (data: LoginFormValues) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, data);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string | string[] }>;
    // On tente d'accéder au message d'erreur renvoyé par le backend.
    // Ici, on vérifie si `rawMessage` est un tableau.
    // Cela signifie que le backend a renvoyé plusieurs messages d'erreur dans un tablau.
    // Exemple : ["Email is required", "Password must be at least 6 characters"]
    // Dans ce cas, on les relance (throw) tels quels pour qu'ils soient gérés plus tard (par ex. dans `onError` de React Query).
    // Si `rawMessage` est une chaîne de caractères (erreur simple comme "Invalid credentials"),
    // on la relance aussi pour qu'elle soit traitée dans le composant.
    // S'il est `undefined`, on utilise un message par défaut ("An unexpected error occurred").
    const errorMsg = err?.response?.data?.message;
    if (Array.isArray(errorMsg)) {
      throw errorMsg;
    }
    throw errorMsg ?? "An unexpected error occurred.";
  }
};

// Register User
export const registerApi = async (data: RegisterFormValues) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, data);
    return res.data
  } catch (error) {
    const err = error as AxiosError<{ message: string | string[] }>;
    console.log(err)
    const errorMsg = err?.response?.data?.message;
    if (Array.isArray(errorMsg)) {
      throw errorMsg;
    }
    throw errorMsg ?? "An unexpected error occurred.";
  }
}

// Logout User
export const logoutApi = async (token: string) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/users/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Verify Email
export const verifyEmailApi = async ({ userId, token }: { userId: string; token: string }) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/${userId}/verify/${token}`
    )
    return res.data
  } catch (error) {
    throw error
    
  } 
}

//  Get all users except the currently authenticated user (get friends)
export const fetchFriendsApi = async (token: string) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/friends`,
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