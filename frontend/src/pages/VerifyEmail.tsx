import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import { useVerifyEmail } from '../hooks/useAuth'
import { useEffect } from 'react'
import Spinner from '../components/Spinner'
import { AxiosError } from 'axios'

const VerifyEmail = () => {
  const { token, userId } = useParams()
  const { mutate, data, isPending, error, isError } = useVerifyEmail()
  const axiosError = error as AxiosError<{ message: string }>
  const errorMessage = axiosError?.response?.data.message

  useEffect(() => {
    if (userId && token) {
      mutate({ userId, token })
    }
  }, [userId, token, mutate])

  if (!token || !userId) return null

  if (isPending) {
    return (
      <div className="auth-layout">
        <div className="auth-card text-center">
          <Spinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <section className="auth-layout">
      <div className="auth-card text-center animate-in">
        {isError ? (
          <>
            <AiOutlineWarning className="text-error-500 dark:text-error-400 text-6xl mx-auto animate-pulse mb-4" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Verification failed
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {errorMessage || "The verification link is invalid or has expired."}
            </p>
            <Link
              to="/forgot-password"
              className="btn-secondary inline-flex"
            >
              Request new link
            </Link>
          </>
        ) : (
          <>
            <AiOutlineCheckCircle className="text-primary-600 dark:text-primary-400 text-6xl mx-auto animate-bounce mb-4" />
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {data?.message || "Email verified successfully"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Your account is now active. You can sign in to start chatting.
            </p>
            <Link
              to="/login"
              className="btn-primary inline-flex"
            >
              Go to login
            </Link>
          </>
        )}
      </div>
    </section>
  )
}

export default VerifyEmail