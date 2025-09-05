// Security middleware to prevent unauthorized access to protected features
export const checkProfileCompletion = () => {
  const userProfile = localStorage.getItem('userProfile');
  const userRequirements = localStorage.getItem('userRequirements');
  
  return {
    hasProfile: !!userProfile,
    hasRequirements: !!userRequirements,
    isComplete: !!userProfile && !!userRequirements,
    profileData: userProfile ? JSON.parse(userProfile) : null,
    requirementsData: userRequirements ? JSON.parse(userRequirements) : null
  };
};

// Prevent access to university data without completed profile
export const secureUniversityAccess = (callback) => {
  const { isComplete } = checkProfileCompletion();
  
  if (!isComplete) {
    console.warn('Unauthorized access attempt to university data');
    window.location.href = '/profile';
    return null;
  }
  
  return callback();
};

// Secure localStorage operations
export const secureLocalStorage = {
  getProfile: () => {
    const { hasProfile, profileData } = checkProfileCompletion();
    return hasProfile ? profileData : null;
  },
  
  getRequirements: () => {
    const { hasRequirements, requirementsData } = checkProfileCompletion();
    return hasRequirements ? requirementsData : null;
  },
  
  getUserData: () => {
    const { isComplete, profileData, requirementsData } = checkProfileCompletion();
    return isComplete ? { ...profileData, ...requirementsData } : null;
  }
};

// API call interceptor for security
export const secureApiCall = async (apiFunction, ...args) => {
  const { isComplete } = checkProfileCompletion();
  
  if (!isComplete) {
    throw new Error('Profile completion required for API access');
  }
  
  return await apiFunction(...args);
};
