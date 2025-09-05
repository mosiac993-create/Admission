import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, User, MapPin, DollarSign, Target, GraduationCap, Globe, BookOpen } from 'lucide-react';

const ProfileCreation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Mandatory fields
    email: '',
    intake_year: '',
    degree_level_target: '',
    intended_majors: [''],
    preferred_countries: [''],
    budget_total_per_year: '',
    currency: 'USD',
    highest_education: '',
    gpa_status: '',
    
    // English proficiency (one required)
    english_test_type: '',
    toefl_score: '',
    ielts_score: '',
    duolingo_score: '',
    english_exempt_reason: '',
    
    // Conditional mandatory
    gpa_value: '',
    gpa_scale: '',
    grading_system: '',
    language_of_instruction_preference: '',
    
    // Optional standardized tests
    sat_total: '',
    act_composite: '',
    gre_total: '',
    gmat_total: '',
    test_status: '',
    test_policy: '',
    
    // Optional documents & links
    transcript_upload_url: '',
    resume_url: '',
    portfolio_url: '',
    github_url: '',
    
    // Optional preferences
    need_scholarship: false,
    allow_high_cost_of_living: false,
    ranking_priority: '',
    co_op_or_internship_required: false,
    post_study_work_priority: false,
    university_shortlist: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store profile data in localStorage for demo
    localStorage.setItem('userProfile', JSON.stringify(formData));
    navigate('/requirements');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Profile</h1>
          <p className="text-gray-600">Tell us about yourself to get personalized recommendations</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Step 1 of 2</span>
            <span>Profile Creation</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full w-1/2"></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="card">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intake Year *
                </label>
                <select
                  name="intake_year"
                  value={formData.intake_year}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select intake year</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Degree Level *
              </label>
              <select
                name="degree_level_target"
                value={formData.degree_level_target}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select degree level</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="masters">Masters</option>
                <option value="mba">MBA</option>
                <option value="phd">PhD</option>
                <option value="diploma">Diploma</option>
              </select>
            </div>
          </div>

          {/* Academic Preferences */}
          <div className="card">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Academic Preferences</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intended Majors (1-3) *
                </label>
                {formData.intended_majors.map((major, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={major}
                      onChange={(e) => handleArrayChange('intended_majors', index, e.target.value)}
                      placeholder={`Major ${index + 1}`}
                      className="form-input flex-1"
                      required={index === 0}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('intended_majors', index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {formData.intended_majors.length < 3 && (
                  <button
                    type="button"
                    onClick={() => addArrayField('intended_majors')}
                    className="text-primary-600 hover:text-primary-800 text-sm"
                  >
                    + Add another major
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Countries *
                </label>
                {formData.preferred_countries.map((country, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <select
                      value={country}
                      onChange={(e) => handleArrayChange('preferred_countries', index, e.target.value)}
                      className="form-input flex-1"
                      required={index === 0}
                    >
                      <option value="">Select country</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Singapore">Singapore</option>
                      <option value="France">France</option>
                      <option value="Switzerland">Switzerland</option>
                    </select>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('preferred_countries', index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayField('preferred_countries')}
                  className="text-primary-600 hover:text-primary-800 text-sm"
                >
                  + Add another country
                </button>
              </div>
            </div>
          </div>

          {/* Budget & Financial */}
          <div className="card">
            <div className="flex items-center mb-4">
              <DollarSign className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Budget & Financial</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget per Year *
                </label>
                <input
                  type="number"
                  name="budget_total_per_year"
                  value={formData.budget_total_per_year}
                  onChange={handleInputChange}
                  placeholder="e.g., 50000"
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency *
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (C$)</option>
                  <option value="AUD">AUD (A$)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Academic Background */}
          <div className="card">
            <div className="flex items-center mb-4">
              <Target className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Academic Background</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Highest Education Completed *
                </label>
                <select
                  name="highest_education"
                  value={formData.highest_education}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select highest education</option>
                  <option value="high_school">High School</option>
                  <option value="associate">Associate Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPA Status *
                </label>
                <select
                  name="gpa_status"
                  value={formData.gpa_status}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select GPA status</option>
                  <option value="known">I know my exact GPA</option>
                  <option value="estimating">I'm estimating my GPA</option>
                  <option value="unknown">I don't know my GPA</option>
                </select>
              </div>

              {/* Conditional GPA fields */}
              {formData.gpa_status === 'known' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GPA Value *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="gpa_value"
                      value={formData.gpa_value}
                      onChange={handleInputChange}
                      placeholder="e.g., 3.75"
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GPA Scale *
                    </label>
                    <select
                      name="gpa_scale"
                      value={formData.gpa_scale}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select scale</option>
                      <option value="4.0">4.0 Scale</option>
                      <option value="10.0">10.0 Scale</option>
                      <option value="100">Percentage (100)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* English Proficiency */}
          <div className="card">
            <div className="flex items-center mb-4">
              <Globe className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">English Proficiency</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  English Test Type *
                </label>
                <select
                  name="english_test_type"
                  value={formData.english_test_type}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select test type</option>
                  <option value="toefl">TOEFL</option>
                  <option value="ielts">IELTS</option>
                  <option value="duolingo">Duolingo English Test</option>
                  <option value="exempt">English Exempt</option>
                </select>
              </div>

              {/* Conditional English test scores */}
              {formData.english_test_type === 'toefl' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TOEFL Score *
                  </label>
                  <input
                    type="number"
                    name="toefl_score"
                    value={formData.toefl_score}
                    onChange={handleInputChange}
                    placeholder="e.g., 100"
                    min="0"
                    max="120"
                    className="form-input"
                    required
                  />
                </div>
              )}

              {formData.english_test_type === 'ielts' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IELTS Score *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    name="ielts_score"
                    value={formData.ielts_score}
                    onChange={handleInputChange}
                    placeholder="e.g., 7.5"
                    min="0"
                    max="9"
                    className="form-input"
                    required
                  />
                </div>
              )}

              {formData.english_test_type === 'duolingo' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duolingo English Test Score *
                  </label>
                  <input
                    type="number"
                    name="duolingo_score"
                    value={formData.duolingo_score}
                    onChange={handleInputChange}
                    placeholder="e.g., 125"
                    min="10"
                    max="160"
                    className="form-input"
                    required
                  />
                </div>
              )}

              {formData.english_test_type === 'exempt' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exemption Reason *
                  </label>
                  <select
                    name="english_exempt_reason"
                    value={formData.english_exempt_reason}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select reason</option>
                    <option value="native_speaker">Native English Speaker</option>
                    <option value="english_degree">Degree from English-speaking Institution</option>
                    <option value="english_instruction">Previous Education in English</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}

              {/* Language of instruction preference for non-English countries */}
              {formData.preferred_countries.some(country => ['Germany', 'France', 'Netherlands', 'Switzerland'].includes(country)) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language of Instruction Preference *
                  </label>
                  <select
                    name="language_of_instruction_preference"
                    value={formData.language_of_instruction_preference}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select preference</option>
                    <option value="english_only">English Only</option>
                    <option value="english_or_local">English or Local Language</option>
                    <option value="local_language_ok">Local Language OK</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Optional Standardized Tests */}
          <div className="card">
            <div className="flex items-center mb-4">
              <BookOpen className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Standardized Tests (Optional)</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SAT Total Score
                </label>
                <input
                  type="number"
                  name="sat_total"
                  value={formData.sat_total}
                  onChange={handleInputChange}
                  placeholder="e.g., 1450"
                  min="400"
                  max="1600"
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ACT Composite Score
                </label>
                <input
                  type="number"
                  name="act_composite"
                  value={formData.act_composite}
                  onChange={handleInputChange}
                  placeholder="e.g., 32"
                  min="1"
                  max="36"
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GRE Total Score
                </label>
                <input
                  type="number"
                  name="gre_total"
                  value={formData.gre_total}
                  onChange={handleInputChange}
                  placeholder="e.g., 320"
                  min="260"
                  max="340"
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GMAT Total Score
                </label>
                <input
                  type="number"
                  name="gmat_total"
                  value={formData.gmat_total}
                  onChange={handleInputChange}
                  placeholder="e.g., 680"
                  min="200"
                  max="800"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Documents & Links */}
          <div className="card">
            <div className="flex items-center mb-4">
              <Upload className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Documents & Links (Optional)</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transcript Upload URL
                </label>
                <input
                  type="url"
                  name="transcript_upload_url"
                  value={formData.transcript_upload_url}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume URL
                </label>
                <input
                  type="url"
                  name="resume_url"
                  value={formData.resume_url}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  name="portfolio_url"
                  value={formData.portfolio_url}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleInputChange}
                  placeholder="https://github.com/..."
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Preferences & Constraints */}
          <div className="card">
            <div className="flex items-center mb-4">
              <Target className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Preferences & Constraints (Optional)</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="need_scholarship"
                    checked={formData.need_scholarship}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">I need scholarship/financial aid</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="allow_high_cost_of_living"
                    checked={formData.allow_high_cost_of_living}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">OK with high cost of living areas</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="co_op_or_internship_required"
                    checked={formData.co_op_or_internship_required}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">Co-op/internship opportunities required</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="post_study_work_priority"
                    checked={formData.post_study_work_priority}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">Post-study work opportunities priority</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ranking Priority
                </label>
                <select
                  name="ranking_priority"
                  value={formData.ranking_priority}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select priority level</option>
                  <option value="very_high">Very High - Only top-ranked schools</option>
                  <option value="high">High - Prefer well-ranked schools</option>
                  <option value="medium">Medium - Ranking is somewhat important</option>
                  <option value="low">Low - Ranking is not very important</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University Shortlist (Optional)
                </label>
                <textarea
                  name="university_shortlist"
                  value={formData.university_shortlist}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="List any specific universities you're interested in..."
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Typeform Integration Placeholder */}
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Enhanced Profile (Optional)
            </h3>
            <p className="text-blue-700 mb-4">
              Complete our detailed questionnaire for more personalized recommendations
            </p>
            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-blue-300">
              <p className="text-center text-blue-600">
                📝 Typeform Integration Placeholder
                <br />
                <span className="text-sm">Advanced profile questions would appear here</span>
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Continue to Requirements
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreation;
