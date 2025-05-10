import { FormField } from "../types/user.types";

export const registerFields: FormField[] = [
  {
    type: "text",
    name: "name",
    placeholder: "Full name ...",
    icon: "name",
  },
  {
    type: "email",
    name: "email",
    placeholder: "Email address ...",
    icon: "email",
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password ...",
    icon: "password",
  }
];

export const loginFields: FormField[] = [
  {
    type: "email",
    name: "email",
    placeholder: "Email address ...",
    icon: "email",
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password ...",
    icon: "password",
  }
];