import AuthHeader from "../components/AuthHeader";
import AuthLink from "../components/AuthLink";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { RegisterFormValues } from "../types/user.types";
import useTogglePassword from "../hooks/useTogglePassword";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ErrorMessage from "../components/ErrorMessage";
import { registerInitialValues } from "../utils/formInitialValues";
import { registerSchema } from "../utils/schemas";
import { BtnClass, IconBtnClass, InputClass } from "../utils/classNames";

const Register = () => {
  const { showPassword, togglePasswordVisibility } = useTogglePassword();
  const onSubmit = (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>
  ) => {
    console.log(values);
    actions.resetForm();
  };
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthHeader title="Join us" subtitle="Create your account in seconds" />

        <Formik
          initialValues={registerInitialValues}
          validationSchema={registerSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div className="space-y-4">
              <Field
                  type="text"
                  name="name"
                  className={`${InputClass}`}
                  placeholder="Full name ..."
                />
                <ErrorMessage errors={errors} touched={touched} name="name" />
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
                    className={`${IconBtnClass}`}                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </div>
                </div>
                <ErrorMessage errors={errors} touched={touched} name="password" />
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    className={`${InputClass}`}
                    placeholder="Confirm password ..."
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
                <ErrorMessage errors={errors} touched={touched} name="confirmPassword" />
              </div>
              <button
                type="submit"
                className={`${BtnClass}`}
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <AuthLink to="/login" link="Login" text="Already have an account?"/>
      </div>
    </div>
  );
};

export default Register;
