import { FormikErrors, FormikTouched } from "formik";

export interface ErrorMessageProps<T> {
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
  name: keyof T;
}