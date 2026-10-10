import { Formik, Form, Field, FormikHelpers } from "formik";
import AuthHeader from "../components/auth/AuthHeader";
import AuthLink from "../components/auth/AuthLink";
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
    <div className="auth-layout">
      <div className="auth-card">
        <AuthHeader title="Forgot password" subtitle="Enter your email to receive a reset link" />
        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="Email address"
                  autoComplete="email"
                />
                <ErrorMessage errors={errors} touched={touched} name="email" />
              </div>
              <button
                type="submit"
                className="btn-primary w-full py-3"
                disabled={isPending}
              >
                {isPending ? <Spinner small size="sm" /> : "Send reset link"}
              </button>
            </Form>
          )}
        </Formik>
        <AuthLink to="/login" link="Back to login" text="Remember your password?" />
      </div>
    </div>
  );
}