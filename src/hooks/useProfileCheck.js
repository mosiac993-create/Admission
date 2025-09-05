import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Custom hook to enforce profile completion across the app
export const useProfileCheck = (requireProfile = true, requireRequirements = true) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Check profile completion
    if (requireProfile) {
      const userProfile = localStorage.getItem('userProfile');
      if (!userProfile) {
        navigate('/profile');
        return;
      }
    }

    // Check requirements completion
    if (requireRequirements) {
      const userRequirements = localStorage.getItem('userRequirements');
      if (!userRequirements) {
        navigate('/requirements');
        return;
      }
    }
  }, [currentUser, navigate, requireProfile, requireRequirements]);

  // Return profile completion status
  const userProfile = localStorage.getItem('userProfile');
  const userRequirements = localStorage.getItem('userRequirements');
  
  return {
    isAuthenticated: !!currentUser,
    hasProfile: !!userProfile,
    hasRequirements: !!userRequirements,
    isFullyComplete: !!userProfile && !!userRequirements
  };
};

// Hook specifically for dashboard and university features
export const useSecurityCheck = () => {
  return useProfileCheck(true, true);
};
