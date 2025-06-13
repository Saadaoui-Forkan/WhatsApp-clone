import { Formik, Form, Field, FormikHelpers } from "formik";
import AuthHeader from "../components/auth/AuthHeader";
import { BtnClass, InputClass } from "../utils/classNames";
import ErrorMessage from "../components/ErrorMessage";
import { ForgetPasswordSchema } from "../utils/schemas";
import { useForgotPassword } from "../hooks/usePassword";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { ForgotPasswordTypes } from "../types/password.types";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const { mutate, isPending } = useForgotPassword()
  const navigate = useNavigate()

  const handleSubmit = (
    values: ForgotPasswordTypes,
    actions: FormikHelpers<ForgotPasswordTypes>
  ) => {
    mutate(values.email, {
      onSuccess: (data) => {
        toast.success(data.message);
        actions.resetForm();
        navigate('/login')
      },
      onError: (error) => {
        if (Array.isArray(error)) {
          error.forEach((err) => toast.error(err));
        } else if (typeof error === "string") {
          toast.error(error);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
        actions.resetForm();
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md space-y-6">
      <AuthHeader title="Forgot Password" subtitle=""/>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={ForgetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div className="space-y-3">
                  <Field
                    type="text"
                    name="email"
                    className={`${InputClass}`}
                    placeholder="Enter your email address ..."
                  />
                  <ErrorMessage errors={errors} touched={touched} name="email" />
                </div>
                <button
                  type="submit"
                  className={`${BtnClass}`}
                  disabled={isPending}
                >
                  {isPending ? <Spinner small /> : "Send Reset Link"}
                </button>
              </Form>
            )}
          </Formik>
      </div>
    </div>
  );
}
