import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUniversitiesByCategory } from '../data/mockUniversities';
import { Target, MapPin, DollarSign, Calendar, ExternalLink, Star } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState({ safe: [], moderate: [], ambitious: [] });
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Load user data
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const requirements = JSON.parse(localStorage.getItem('userRequirements') || '{}');
    setUserProfile({ ...profile, ...requirements });

    // Load university recommendations
    setUniversities(getUniversitiesByCategory());
  }, []);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Ambitious': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const UniversityCard = ({ university }) => (
    <div className="card hover:shadow-lg transition-shadow cursor-pointer" 
         onClick={() => navigate(`/university/${university.id}`)}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{university.name}</h3>
          <p className="text-sm text-gray-600 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {university.country} • {university.ranking}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(university.category)}`}>
          {university.matchScore}% Match
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <DollarSign className="h-4 w-4 mr-2" />
          <span>{university.fees} per year</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Deadline: {university.deadline}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{university.description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Acceptance: {university.acceptanceRate}</span>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
          View Details
          <ExternalLink className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );

  const CategorySection = ({ title, universities, icon, description }) => (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        {icon}
        <div className="ml-3">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map(university => (
          <UniversityCard key={university.id} university={university} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {userProfile?.name || 'Student'}!
              </h1>
              <p className="text-gray-600">Here are your personalized university recommendations</p>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="btn-secondary"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">8</div>
            <div className="text-sm text-gray-600">Universities Recommended</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">2</div>
            <div className="text-sm text-gray-600">Applications Started</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">6</div>
            <div className="text-sm text-gray-600">Requirements Pending</div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="card mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">AI Recommendations</h3>
              <p className="text-blue-800 mb-3">
                Based on your profile (GPA: {userProfile?.gpa}, Target: {userProfile?.targetCourse}), 
                we've categorized universities to maximize your admission success.
              </p>
              <div className="text-sm text-blue-700">
                <strong>Strategy:</strong> Apply to 2-3 Safe, 2-3 Moderate, and 1-2 Ambitious universities
              </div>
            </div>
          </div>
        </div>

        {/* University Categories */}
        <CategorySection
          title="Safe Universities"
          universities={universities.safe}
          icon={<div className="p-2 bg-green-100 rounded-lg"><Target className="h-6 w-6 text-green-600" /></div>}
          description="High probability of admission based on your profile"
        />

        <CategorySection
          title="Moderate Universities"
          universities={universities.moderate}
          icon={<div className="p-2 bg-yellow-100 rounded-lg"><Target className="h-6 w-6 text-yellow-600" /></div>}
          description="Good match with competitive but achievable requirements"
        />

        <CategorySection
          title="Ambitious Universities"
          universities={universities.ambitious}
          icon={<div className="p-2 bg-red-100 rounded-lg"><Target className="h-6 w-6 text-red-600" /></div>}
          description="Reach schools that would be excellent achievements"
        />

        {/* Next Steps */}
        <div className="card bg-gray-900 text-white">
          <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">1. Review Requirements</h4>
              <p className="text-gray-300 text-sm">Click on universities to see detailed requirements and deadlines</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">2. Self-Assessment</h4>
              <p className="text-gray-300 text-sm">Complete prerequisite forms to get personalized feedback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
