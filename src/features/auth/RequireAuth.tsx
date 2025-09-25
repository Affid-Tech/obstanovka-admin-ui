import { Navigate, useLocation } from 'react-router-dom';


export function RequireAuth({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem('token');
    const location = useLocation();
    if (!token) return <Navigate to="/signin" replace state={{ from: location }} />;
    return children;
}