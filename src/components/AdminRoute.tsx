import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  console.log("AdminRoute receiving:", { user, isLoading });

  // 1. If the auth state is still loading, show a temporary message.
  if (isLoading) {
    return <div>Loading user...</div>;
  }

  // 2. If loading is finished and there's no user, redirect to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If loading is finished and the user is not an admin, redirect to home.
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  // 4. If loading is finished and the user IS an admin, show the page.
  return <>{children}</>;
};

export default AdminRoute;