import { Formik, Form, Field, FormikHelpers } from "formik";
import AuthHeader from "../components/auth/AuthHeader";
import AuthLink from "../components/auth/AuthLink";
import ErrorMessage from "../components/ErrorMessage";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useShowConfirmPassword, useToggleShow } from "../hooks/useToggleShow";
import { ResetPasswordSchema } from "../utils/schemas";
import { ResetPasswordTypes } from "../types/password.types";
import { useResetPassword } from "../hooks/usePassword";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export default function ResetPasswordPage() {
  const { userId, token } = useParams()
  const { show, toggleVisibility } = useToggleShow();
  const { showConfirmPassword, toggleShowConfirmPassword } = useShowConfirmPassword();
  const { mutate, isPending } = useResetPassword()
  const navigate = useNavigate()

  const handleSubmit = (
    values: ResetPasswordTypes,
    actions: FormikHelpers<ResetPasswordTypes>
  ) => {
    if (!userId || !token) {
      toast.error("User ID or token is missing");
      return;
    }
    mutate(
      { values, userId, token },
      {
        onSuccess: (data) => {
          toast.success(data.message)
          navigate('/login')
        },
        onError: (error) => {
          if (Array.isArray(error)) {
            error.forEach(err => toast.error(err))
          } else if (typeof error === "string") {
            toast.error(error)
          } else if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("An unexpected error occurred.");
          }
        }
      }
    )
    actions.resetForm()
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <AuthHeader title="Reset your password" subtitle="Enter your new password below" />
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={ResetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div className="relative">
                <label htmlFor="password" className="sr-only">New password</label>
                <Field
                  id="password"
                  type={show ? "text" : "password"}
                  name="password"
                  className="input-field pr-12"
                  placeholder="New password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
                <ErrorMessage errors={errors} touched={touched} name="password" />
              </div>

              <div className="relative">
                <label htmlFor="confirmPassword" className="sr-only">Confirm new password</label>
                <Field
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="input-field pr-12"
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
                <ErrorMessage errors={errors} touched={touched} name="confirmPassword" />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3"
                disabled={isPending}
              >
                {isPending ? <Spinner small size="sm" /> : "Reset password"}
              </button>
            </Form>
          )}
        </Formik>
        <AuthLink to="/login" link="Back to login" text="" />
      </div>
    </div>
  );
}