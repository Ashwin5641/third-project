import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";

export default function ProtectedRoute({children, role}) {
    const {token, user, loading} = useAuth();

    if (loading) {
        return <p>Checking.....</p>
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if ( role && user?.role !== role) {
        return <Navigate to={'/unauthorized'} replace />
    }

    return children;
}