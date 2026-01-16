import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
    const { token, loading } = useAuth();

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>; // Or a spinner
    }

    if (!token) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};
