import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="auth-layout">
      <div className="auth-card text-center animate-in">
        <div className="text-7xl md:text-9xl font-extrabold text-primary-600 dark:text-primary-400 mb-6">404</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Page not found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex"
        >
          Go to home page
        </Link>
      </div>
    </section>
  )
}

export default NotFound