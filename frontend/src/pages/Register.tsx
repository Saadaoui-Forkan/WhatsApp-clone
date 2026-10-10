import AuthHeader from "../components/auth/AuthHeader";
import AuthLink from "../components/auth/AuthLink";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { RegisterFormValues } from "../types/user.types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ErrorMessage from "../components/ErrorMessage";
import { registerInitialValues } from "../utils/formInitialValues";
import { registerSchema } from "../utils/schemas";
import { useRegister } from "../hooks/useAuth";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useShowConfirmPassword, useToggleShow } from "../hooks/useToggleShow";
import { useState } from "react";
import EmailSentConfirmation from "../components/EmailSentConfirmation";

const Register = () => {
  const [openVerifyEmailModel, setOpenVerifyEmailModel] = useState(false);
  const { show, toggleVisibility } = useToggleShow();
  const { showConfirmPassword, toggleShowConfirmPassword } = useShowConfirmPassword();
  const { mutate, isPending } = useRegister();

  const onSubmit = (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>
  ) => {
    mutate(values, {
      onSuccess: (data) => {
        toast.success(data.message);
        setOpenVerifyEmailModel(true);
        
        actions.resetForm();
      },
      onError: (error: unknown) => {
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
      {openVerifyEmailModel && (
        <EmailSentConfirmation onClose={() => setOpenVerifyEmailModel(false)} />
      )}
      <div className="auth-card">
        <AuthHeader title="Join us" subtitle="Create your account in seconds" />

        <Formik
          initialValues={registerInitialValues}
          validationSchema={registerSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">Full name</label>
                  <Field
                    id="name"
                    type="text"
                    name="name"
                    className="input-field"
                    placeholder="Full name"
                    autoComplete="name"
                  />
                  <ErrorMessage errors={errors} touched={touched} name="name" />
                </div>
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
                <div className="relative">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <Field
                    id="password"
                    type={show ? "text" : "password"}
                    name="password"
                    className="input-field pr-12"
                    placeholder="Password"
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
                  <ErrorMessage
                    errors={errors}
                    touched={touched}
                    name="password"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="confirmPassword" className="sr-only">Confirm password</label>
                  <Field
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="input-field pr-12"
                    placeholder="Confirm password"
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
                  <ErrorMessage
                    errors={errors}
                    touched={touched}
                    name="confirmPassword"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn-primary w-full py-3"
                disabled={isPending}
              >
                {isPending ? <Spinner small size="sm" /> : "Create account"}
              </button>
            </Form>
          )}
        </Formik>
        <AuthLink to="/login" link="Log in" text="Already have an account?" />
      </div>
    </div>
  );
};

export default Register;