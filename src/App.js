import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthGuard from './components/AuthGuard';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import TestAuth from './pages/TestAuth';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProfileCreation from './pages/ProfileCreation';
import RequirementForm from './pages/RequirementForm';
import Dashboard from './pages/Dashboard';
import UniversityDetail from './pages/UniversityDetail';
import SelfAssessment from './pages/SelfAssessment';
import AIFeedback from './pages/AIFeedback';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/test-auth" element={<TestAuth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<AuthGuard requireProfile={false} requireRequirements={false}><ProfileCreation /></AuthGuard>} />
            <Route path="/requirements" element={<AuthGuard requireProfile={true} requireRequirements={false}><RequirementForm /></AuthGuard>} />
            <Route path="/dashboard" element={<AuthGuard requireProfile={true} requireRequirements={true}><Dashboard /></AuthGuard>} />
            <Route path="/university/:id" element={<AuthGuard requireProfile={true} requireRequirements={true}><UniversityDetail /></AuthGuard>} />
            <Route path="/assessment/:universityId" element={<AuthGuard requireProfile={true} requireRequirements={true}><SelfAssessment /></AuthGuard>} />
            <Route path="/feedback/:universityId" element={<AuthGuard requireProfile={true} requireRequirements={true}><AIFeedback /></AuthGuard>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
