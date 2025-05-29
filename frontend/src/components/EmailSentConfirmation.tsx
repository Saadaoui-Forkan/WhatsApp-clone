import { MdMarkEmailRead } from "react-icons/md";


const EmailSentConfirmation = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 sm:p-8 max-w-md w-full text-center border border-gray-200 dark:border-gray-700 animate-fade-in">
        <div className="flex justify-center mb-4">
          <MdMarkEmailRead className="text-5xl text-emerald-600 dark:text-emerald-400 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Check your email
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          We've sent a verification link to your email address.
          <br />
          Please click the link in the email to complete your registration.
        </p>
      </div>
    </div>
  );
};

export default EmailSentConfirmation;
