import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  if (user === undefined) return <div>Loading...</div>;
  
  if (!user) {
    return <Navigate to="/" replace />; // no user - redirect to Home
  }
  return children; // logged-in user - allow access to dashboard
}
