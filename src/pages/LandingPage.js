import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Users, Target, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Matching",
      description: "AI-powered recommendations based on your profile"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Requirement Tracking",
      description: "Never miss a deadline or requirement again"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Personalized Feedback",
      description: "Get specific advice to improve your application"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Admission Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/about')}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                About
              </button>
              <button
                onClick={() => navigate('/login')}
                className="btn-secondary"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Start Your
            <span className="text-primary-600"> Admission Journey</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get personalized university recommendations, track requirements, and receive AI-powered feedback 
            to maximize your admission success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate('/signup')}
              className="btn-primary text-lg px-8 py-3 flex items-center justify-center"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="btn-secondary text-lg px-8 py-3"
            >
              Meet Our Team
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary-100 rounded-full text-primary-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Create Profile", desc: "Upload your documents and academic data" },
              { step: "2", title: "Get Recommendations", desc: "AI suggests Safe, Moderate & Ambitious universities" },
              { step: "3", title: "Track Requirements", desc: "View detailed checklists for each university" },
              { step: "4", title: "Receive Feedback", desc: "Get personalized improvement suggestions" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 AI Admission Portal. Built for Buildathon.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
