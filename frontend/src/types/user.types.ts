import { ReactNode } from "react";
import { IConversation } from "./message.types";

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

export interface EmailSentConfirmationProps {
  onClose: () => void;
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
  profilePicture?: {
    publicId: string;
    secureUrl: string;
  } | null;
}

export interface IAuth {
  user: IUser | null
  setUser: (user: IUser | null) => void
  clearAuth: () => void
  friends: IFriend[]
  setFriends: (friends: IFriend[]) => void
  addFriend: (friend: IFriend) => void
  conversations: IConversation[]
  setConversations: (conversations: IConversation[]) => void
  typing: boolean;
  setTyping: (typing: boolean) => void;
}
