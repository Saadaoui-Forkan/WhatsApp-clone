import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <div className="text-9xl font-extrabold text-rose-600 dark:text-rose-500 mb-4">404</div>
      <h1 className="text-3xl font-bold mb-6">Page Not Found</h1>
      <Link
        to="/"
        className="px-6 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-all duration-300"
      >
        Go to Home Page
      </Link>
    </section>
  )
}

export default NotFound