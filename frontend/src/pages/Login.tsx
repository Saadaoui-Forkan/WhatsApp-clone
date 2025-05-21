import AuthHeader from "../components/auth/AuthHeader";
import AuthLink from "../components/auth/AuthLink";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LoginFormValues } from "../types/user.types";
import ErrorMessage from "../components/ErrorMessage";
import { loginInitialValues } from "../utils/formInitialValues";
import { loginSchema } from "../utils/schemas";
import { BtnClass, IconBtnClass, InputClass } from "../utils/classNames";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import useToggleShow from "../hooks/useToggleShow";

const LoginPage = () => {
  const { show, toggleVisibility } = useToggleShow();
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin()
  const { setToken, setUser } = useAuthStore()

  const onSubmit = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    mutate(values, {
      onSuccess: (data) => {
        setUser(data.data.name)
        setToken(data.data.token)
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
          toast.error("An unexpected error occurred.");
        }
        actions.resetForm()
      }
    })
  };
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-2rem)] px-4">
      <div className="w-full max-w-md">
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
                <Field
                  type="text"
                  name="email"
                  className={`${InputClass}`}
                  placeholder="Email address ..."
                />
                <ErrorMessage errors={errors} touched={touched} name="email" />
                <div className="relative">
                  <Field
                    type={show ? "text" : "password"}
                    name="password"
                    className={`${InputClass}`}
                    placeholder="Password ..."
                  />
                  <div
                    onClick={toggleVisibility}
                    className={`${IconBtnClass}`}
                  >
                    {show ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </div>
                </div>
                <ErrorMessage errors={errors} touched={touched} name="password" />
              </div>
              <button
                type="submit"
                className={`${BtnClass} ${isPending ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={isPending}
              >
                {isPending ? <Spinner small /> : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <AuthLink to="/register" link="Register" text="Don't have an account?"/>
      </div>
    </div>
  );
};

export default LoginPage;
