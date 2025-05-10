import React, { useState } from 'react';
import AuthHeader from '../components/AuthHeader';
import { loginFields } from '../utils/formConfig';
import InputWithIcon from '../components/InputWithIcon';
import { Link } from 'react-router-dom';

const RegisterPage = () => {

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="w-full max-w-md">
        <AuthHeader title="Welcome back" subtitle="Log in to continue chatting" />

        <form className="space-y-6">
          <div className="space-y-4">
            {loginFields.map((field) => (
              <InputWithIcon
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                icon={field.icon}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-purple-600 dark:to-purple-800 text-white font-semibold rounded-lg shadow hover:opacity-90 transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-700 dark:text-purple-300 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;