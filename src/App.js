import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import TestAuth from './pages/TestAuth';
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
            <Route path="/profile" element={<ProfileCreation />} />
            <Route path="/requirements" element={<RequirementForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/university/:id" element={<UniversityDetail />} />
            <Route path="/assessment/:universityId" element={<SelfAssessment />} />
            <Route path="/feedback/:universityId" element={<AIFeedback />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
