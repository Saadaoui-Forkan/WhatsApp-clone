import AuthHeader from "../components/auth/AuthHeader";
import AuthLink from "../components/auth/AuthLink";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { RegisterFormValues } from "../types/user.types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ErrorMessage from "../components/ErrorMessage";
import { registerInitialValues } from "../utils/formInitialValues";
import { registerSchema } from "../utils/schemas";
import { BtnClass, IconBtnClass, InputClass } from "../utils/classNames";
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
    <div className="flex items-center justify-center p-4">
      {openVerifyEmailModel && (
        <EmailSentConfirmation/>
      )}
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
                    type={show ? "text" : "password"}
                    name="password"
                    className={`${InputClass}`}
                    placeholder="Password ..."
                  />
                  <div onClick={toggleVisibility} className={`${IconBtnClass}`}>
                    {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                </div>
                <ErrorMessage
                  errors={errors}
                  touched={touched}
                  name="password"
                />
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className={`${InputClass}`}
                    placeholder="Confirm password ..."
                  />
                  <div onClick={toggleShowConfirmPassword} className={`${IconBtnClass}`}>
                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                </div>
                <ErrorMessage
                  errors={errors}
                  touched={touched}
                  name="confirmPassword"
                />
              </div>
              <button
                type="submit"
                className={`${BtnClass} ${
                  isPending ? "opacity-60 cursor-not-allowed" : ""
                }`}
                disabled={isPending}
              >
                {isPending ? <Spinner small /> : "Register"}
              </button>
            </Form>
          )}
        </Formik>
        <AuthLink to="/login" link="Login" text="Already have an account?" />
      </div>
    </div>
  );
};

export default Register;
