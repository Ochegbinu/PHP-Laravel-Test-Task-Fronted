import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AdminRoute() {
  const { currentUser } = useAuth();

  return currentUser?.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default AdminRoute;
