import { ErrorMessageProps } from "../types/errorMessage.types";

const ErrorMessage = <T extends Record<string, any>>({
  errors,
  touched,
  name,
}: ErrorMessageProps<T>) => {
  return (
    <div>
      {errors[name] && touched[name] && (
        <p className="text-red-500 text-sm -mt-3">{errors[name] as string}</p>
      )}
    </div>
  );
};

export default ErrorMessage;
