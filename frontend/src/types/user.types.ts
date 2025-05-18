import { ChangeEvent, ReactNode } from "react";

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
