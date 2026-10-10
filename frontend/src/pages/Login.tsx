import AuthHeader from "../components/auth/AuthHeader";
import AuthLink from "../components/auth/AuthLink";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LoginFormValues } from "../types/user.types";
import ErrorMessage from "../components/ErrorMessage";
import { loginInitialValues } from "../utils/formInitialValues";
import { loginSchema } from "../utils/schemas";
import { useLogin } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useToggleShow } from "../hooks/useToggleShow";

const LoginPage = () => {
  const { show, toggleVisibility } = useToggleShow();
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin()
  const { setUser } = useAuthStore()

  const onSubmit = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    mutate(values, {
      onSuccess: (data) => {
        const { id, name, bio, profilePicture } = data.data
        setUser({
          id,
          name,
          bio,
          photoProfile: profilePicture?.secureUrl ?? ""
        })
        toast.success(data.message)
        navigate('/')
        actions.resetForm()
      },
      onError: (error: unknown) => {
        if (Array.isArray(error)) {
          error.forEach(err => toast.error(err))
        } else if (typeof error === "string") {
          toast.error(error)
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred. Login");
        }
        actions.resetForm()
      }
    })
  };
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <AuthHeader
          title="Welcome back"
          subtitle="Log in to continue chatting"
        />
        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div className="space-y-4">
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
                    autoComplete="current-password"
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
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3"
                disabled={isPending}
              >
                {isPending ? <Spinner small size="sm" /> : "Log in"}
              </button>

              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="inline-block text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </Form>
          )}
        </Formik>
        <AuthLink
          to="/register"
          link="Create an account"
          text="Don't have an account?"
        />
      </div>
    </div>
  );
};

export default LoginPage;