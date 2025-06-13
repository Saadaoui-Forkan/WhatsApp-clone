import { Formik, Form, Field, FormikHelpers } from "formik";
import AuthHeader from "../components/auth/AuthHeader";
import { BtnClass, IconBtnClass, InputClass } from "../utils/classNames";
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
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md space-y-6">
        <AuthHeader title="Reset your password" subtitle="" />
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div className="relative">
                  <Field
                    type={!show ? "password" : "text"}
                    name="password"
                    className={`${InputClass}`}
                    placeholder="Enter your new password ..."
                  />
                  <div onClick={toggleVisibility} className={`${IconBtnClass}`}>
                    {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                </div>
                  <ErrorMessage errors={errors} touched={touched} name="password" />

                <div className="relative">
                  <Field
                    type={!showConfirmPassword ? "password" : "text"}
                    name="confirmPassword"
                    className={`${InputClass}`}
                    placeholder="Confirm your new password ..."  
                  />
                  <div onClick={toggleShowConfirmPassword} className={`${IconBtnClass}`}>
                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                </div>
                  <ErrorMessage errors={errors} touched={touched} name="confirmPassword" />

                <button
                  type="submit"
                  className={`${BtnClass}`}
                  disabled={isPending}
                >
                  {isPending ? <Spinner small /> : "Reset Password"} 
                </button>
              </Form>
            )}
          </Formik>
      </div>
    </div>
  );
}