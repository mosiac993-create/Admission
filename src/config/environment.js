// Environment configuration for different deployment environments
export const getEnvironmentConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Get the current origin dynamically
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  
  return {
    isDevelopment,
    isProduction,
    baseUrl: origin,
    authRedirectUrl: `${origin}/profile`,
    // Add your Vercel domain here when you know it
    allowedDomains: [
      'http://localhost:3000',
      'https://localhost:3000',
      // Add your Vercel domain like: 'https://your-app-name.vercel.app'
    ]
  };
};

// Helper to get the correct redirect URL for auth
export const getAuthRedirectUrl = () => {
  const config = getEnvironmentConfig();
  return config.authRedirectUrl;
};
