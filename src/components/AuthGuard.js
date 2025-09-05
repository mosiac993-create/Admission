import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Security component that checks authentication and profile completion
const AuthGuard = ({ children, requireProfile = true, requireRequirements = true }) => {
  const { currentUser } = useAuth();

  // Check if user is authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check profile completion if required
  if (requireProfile) {
    const userProfile = localStorage.getItem('userProfile');
    if (!userProfile) {
      return <Navigate to="/profile" replace />;
    }
  }

  // Check requirements completion if required
  if (requireRequirements) {
    const userRequirements = localStorage.getItem('userRequirements');
    if (!userRequirements) {
      return <Navigate to="/requirements" replace />;
    }
  }

  return children;
};

// Higher-order component for profile completion check
export const withProfileCheck = (Component) => {
  return (props) => (
    <AuthGuard requireProfile={true} requireRequirements={false}>
      <Component {...props} />
    </AuthGuard>
  );
};

// Higher-order component for full completion check
export const withFullCheck = (Component) => {
  return (props) => (
    <AuthGuard requireProfile={true} requireRequirements={true}>
      <Component {...props} />
    </AuthGuard>
  );
};

export default AuthGuard;
