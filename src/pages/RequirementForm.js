import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const RequirementForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    workExperience: '',
    startDate: '',
    priorities: []
  });
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Check if user has completed profile
    const profile = localStorage.getItem('userProfile');
    
    if (!profile) {
      navigate('/profile');
      return;
    }
    
    // Load profile data to display user's previous selections
    const parsedProfile = JSON.parse(profile);
    setProfileData(parsedProfile);
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriorityChange = (priority) => {
    setFormData(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store requirements data
    localStorage.setItem('userRequirements', JSON.stringify(formData));
    navigate('/dashboard');
  };

  const priorities = [
    'Low tuition fees',
    'High ranking',
    'Scholarship opportunities',
    'Good job prospects',
    'Research opportunities',
    'Diverse student body'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Requirements</h1>
          <p className="text-gray-600">Help us understand what you're looking for</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Step 2 of 3</span>
            <span>Requirements Form</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full w-2/3"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Study Preferences */}
          <div className="card">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Study Preferences</h2>
            </div>
            
            {/* Display user's profile selections */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Your Profile Summary</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700 font-medium">Target Degree:</span>
                  <span className="ml-2 text-blue-800">{profileData?.degree_level_target || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">Preferred Countries:</span>
                  <span className="ml-2 text-blue-800">{profileData?.preferred_countries?.join(', ') || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">Intended Majors:</span>
                  <span className="ml-2 text-blue-800">{profileData?.intended_majors?.filter(m => m).join(', ') || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">University Shortlist:</span>
                  <span className="ml-2 text-blue-800">{profileData?.university_shortlist || 'Not specified'}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Start Date *
              </label>
              <select
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select intake</option>
                <option value="Fall 2024">Fall 2024</option>
                <option value="Spring 2025">Spring 2025</option>
                <option value="Fall 2025">Fall 2025</option>
                <option value="Spring 2026">Spring 2026</option>
              </select>
            </div>
          </div>

          {/* Experience */}
          <div className="card">
            <div className="flex items-center mb-4">
              <Briefcase className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Experience
              </label>
              <select
                name="workExperience"
                value={formData.workExperience}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select experience level</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
          </div>

          {/* Priorities */}
          <div className="card">
            <div className="flex items-center mb-4">
              <BookOpen className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">What's Important to You?</h2>
            </div>
            
            <p className="text-gray-600 mb-4">Select all that apply:</p>
            
            <div className="grid md:grid-cols-2 gap-3">
              {priorities.map((priority) => (
                <label key={priority} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.priorities.includes(priority)}
                    onChange={() => handlePriorityChange(priority)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">{priority}</span>
                </label>
              ))}
            </div>
          </div>


          {/* Submit Button */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="btn-secondary"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Get My Recommendations
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequirementForm;
