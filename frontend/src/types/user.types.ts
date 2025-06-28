import { ReactNode } from "react";

export interface AuthHeaderProps {
  title: string;
  subtitle: string | ReactNode;
  className?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string,
}

export interface AuthLinkProps {
  to: string;
  text: string;
  link: string;
}

export interface IUser {
  id: string;
  name: string;
  bio?: string;
  photoProfile?: string;
  isAccountVerified?: boolean
}

export interface IFriend {
  id: string;
  name: string;
  bio?: string;
  profilePicture: {
    publicId: string;
    secureUrl: string;
  };
}

export interface IAuth {
  user: IUser | null
  token: string
  setUser: (user: IUser | null) => void
  setToken: (token: string) => void
  friends: IFriend[]
  setFriends: (friends: IFriend[]) => void
  addFriend: (friend: IFriend) => void
  typing: boolean;
  setTyping: (typing: boolean) => void;
}
