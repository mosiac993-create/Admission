import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUniversityById } from '../data/mockUniversities';
import { useSecurityCheck } from '../hooks/useProfileCheck';
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users, 
  BookOpen, 
  CheckCircle, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const UniversityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [university, setUniversity] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  
  // Security check - ensure user has completed profile and requirements
  useSecurityCheck();

  useEffect(() => {
    const uni = getUniversityById(id);
    setUniversity(uni);
    
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setUserProfile(profile);
  }, [id]);

  if (!university) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">University not found</h2>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    </div>;
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Ambitious': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRequirementStatus = (requirement, userValue) => {
    if (!userValue) return 'missing';
    
    // Simple comparison logic for demo
    const reqNum = parseFloat(requirement.replace(/[^\d.]/g, ''));
    const userNum = parseFloat(userValue.toString().replace(/[^\d.]/g, ''));
    
    if (userNum >= reqNum) return 'met';
    return 'below';
  };

  const RequirementItem = ({ label, requirement, userValue, type = 'score' }) => {
    const status = getRequirementStatus(requirement, userValue);
    
    const getStatusIcon = () => {
      switch (status) {
        case 'met': return <CheckCircle className="h-5 w-5 text-green-600" />;
        case 'below': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
        case 'missing': return <AlertCircle className="h-5 w-5 text-red-600" />;
        default: return null;
      }
    };

    const getStatusText = () => {
      switch (status) {
        case 'met': return `✓ Your ${type}: ${userValue}`;
        case 'below': return `⚠ Your ${type}: ${userValue} (Below average)`;
        case 'missing': return `✗ ${type} not provided`;
        default: return '';
      }
    };

    return (
      <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
        <div>
          <div className="font-medium text-gray-900">{label}</div>
          <div className="text-sm text-gray-600">Required: {requirement}</div>
        </div>
        <div className="flex items-center">
          {getStatusIcon()}
          <span className="ml-2 text-sm text-gray-600">{getStatusText()}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{university.name}</h1>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{university.country} • {university.ranking}</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(university.category)}`}>
              {university.matchScore}% Match • {university.category}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-600 mb-4">{university.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Acceptance Rate</div>
                    <div className="font-medium">{university.acceptanceRate}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Annual Tuition</div>
                    <div className="font-medium">{university.fees}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements Checklist */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Admission Requirements</h2>
              
              <div className="space-y-1">
                <RequirementItem
                  label="GPA"
                  requirement={university.requirements.gpa}
                  userValue={userProfile?.gpa}
                  type="GPA"
                />
                <RequirementItem
                  label="GRE Score"
                  requirement={university.requirements.gre}
                  userValue={userProfile?.testScores?.gre}
                  type="GRE"
                />
                <RequirementItem
                  label="IELTS Score"
                  requirement={university.requirements.ielts}
                  userValue={userProfile?.testScores?.ielts}
                  type="IELTS"
                />
                <RequirementItem
                  label="TOEFL Score"
                  requirement={university.requirements.toefl}
                  userValue={userProfile?.testScores?.toefl}
                  type="TOEFL"
                />
                
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">Letters of Recommendation</div>
                    <div className="text-sm text-gray-600">Required: {university.requirements.lors}</div>
                  </div>
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">Statement of Purpose</div>
                    <div className="text-sm text-gray-600">{university.requirements.sop}</div>
                  </div>
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium text-gray-900">Work Experience</div>
                    <div className="text-sm text-gray-600">{university.requirements.workExp}</div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            {/* Average Admitted Profile */}
            <div className="card bg-blue-50 border-blue-200">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Average Admitted Student Profile</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{university.averageProfile.gpa}</div>
                  <div className="text-sm text-blue-700">Average GPA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{university.averageProfile.gre}</div>
                  <div className="text-sm text-blue-700">Average GRE</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{university.averageProfile.ielts}</div>
                  <div className="text-sm text-blue-700">Average IELTS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/assessment/${university.id}`)}
                  className="w-full btn-primary"
                >
                  Complete Self-Assessment
                </button>
                <button
                  onClick={() => window.open('#', '_blank')}
                  className="w-full btn-secondary flex items-center justify-center"
                >
                  Visit University Website
                  <ExternalLink className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>

            {/* Important Dates */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Dates</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Application Deadline</div>
                    <div className="font-medium">{university.deadline}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Decision Release</div>
                    <div className="font-medium">March 15, 2024</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Status */}
            <div className="card bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Not Started</div>
                <button
                  onClick={() => window.open('#', '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  Apply Now
                  <ExternalLink className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail;
