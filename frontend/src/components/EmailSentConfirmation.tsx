import { MdMarkEmailRead } from "react-icons/md";
import { EmailSentConfirmationProps } from "../types/user.types";

const EmailSentConfirmation = ({ onClose }: EmailSentConfirmationProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-fade-in">
      <div className="card p-6 sm:p-8 max-w-md w-full text-center animate-slide-up">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <MdMarkEmailRead className="text-3xl text-primary-600 dark:text-primary-400 animate-pulse" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Check your email
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
          We've sent a verification link to your email address.
          <br />
          Please click the link in the email to complete your registration.
        </p>
        <button
          onClick={onClose}
          className="btn-secondary"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EmailSentConfirmation;