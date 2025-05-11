import { ChangeEvent, ReactNode } from "react";
import { IconType } from "react-icons";

type InputType = 'text' | 'email' | 'password';

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