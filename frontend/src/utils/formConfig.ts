import { FormField } from "../types/user.types";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export const registerFields: FormField[] = [
  {
    type: "text",
    name: "name",
    placeholder: "Full name ...",
    icon: FaUser, 
  },
  {
    type: "email",
    name: "email",
    placeholder: "Email address ...",
    icon: FaEnvelope,
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password ...",
    icon: FaLock,
  }
];

export const loginFields: FormField[] = [
  {
    type: "email",
    name: "email",
    placeholder: "Email address ...",
    icon: FaEnvelope,
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password ...",
    icon: FaLock,
  }
];