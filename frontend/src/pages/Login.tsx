import AuthHeader from "../components/AuthHeader";
import AuthLink from "../components/AuthLink";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useTogglePassword from "../hooks/useTogglePassword";
import { LoginFormValues } from "../types/user.types";
import ErrorMessage from "../components/ErrorMessage";
import { loginInitialValues } from "../utils/formInitialValues";
import { loginSchema } from "../utils/schemas";
import { BtnClass, IconBtnClass, InputClass } from "../utils/classNames";

const LoginPage = () => {
  const { showPassword, togglePasswordVisibility } = useTogglePassword();

  const onSubmit = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    console.log(values);
    actions.resetForm();
  };
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`${InputClass}`}
                    placeholder="Password ..."
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className={`${IconBtnClass}`}
                  >
                    {showPassword ? (
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
                className={`${BtnClass}`}
              >
                Login
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
