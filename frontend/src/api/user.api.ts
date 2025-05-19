import axios, { AxiosError } from "axios";
import { LoginFormValues, RegisterFormValues } from "../types/user.types";

export const loginApi = async (data: LoginFormValues) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/users/login`, data);
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

export const registerApi = async (data: RegisterFormValues) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/users/register`, data);
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
