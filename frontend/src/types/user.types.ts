import { ChangeEvent, ReactNode } from "react";

type InputType = 'text' | 'email' | 'password';
type IconType = 'name' | 'email' | 'password';

export interface InputWithIconProps {
  type?: InputType,
  name: string;
  // value: string;
  // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon: IconType;
}

export interface FormField {
  type: 'text' | 'email' | 'password';
  name: string;
  placeholder: string;
  icon: IconType; 
}

export interface AuthHeaderProps {
  title: string;
  subtitle: string | ReactNode;
  className?: string;
}