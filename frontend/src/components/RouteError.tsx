import { isRouteErrorResponse, useRouteError, Navigate, Link } from "react-router-dom";

const RouteError = () => {
  const error = useRouteError();

  // A 401 returned by a loader means the visitor has no active session.
  // Redirect to the login page instead of showing the default error screen.
  if (isRouteErrorResponse(error) && error.status === 401) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">
        {isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : "Une erreur est survenue"}
      </h1>
      <p className="text-gray-500">
        {isRouteErrorResponse(error)
          ? error.data || "La page demandée est introuvable ou a rencontré un problème."
          : (error as Error)?.message || "Erreur inattendue."}
      </p>
      <Link to="/" className="text-primary-600 underline">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default RouteError;
