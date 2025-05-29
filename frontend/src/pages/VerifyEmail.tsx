import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import { useVerifyEmail } from '../hooks/useAuth'
import { useEffect } from 'react'
import { useAuthStore } from '../store/auth.store'
import Spinner from '../components/Spinner'
import { AxiosError } from 'axios'

const VerifyEmail = () => {
  const { user } = useAuthStore()
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
    return <Spinner />
  }

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-2rem)] px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 text-center transition-all duration-300">
        {isError ? (
          <>
            <AiOutlineWarning className="text-red-500 dark:text-red-400 text-6xl mx-auto animate-pulse mb-4" />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {errorMessage}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Please check your verification link or request a new one.
            </p>
          </>
        ) : (
          <>
            <AiOutlineCheckCircle className="text-teal-600 dark:text-teal-400 text-6xl mx-auto animate-bounce mb-4" />
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              {data?.message}
            </h1>
            <Link
              to="/login"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </section>
  )
}

export default VerifyEmail