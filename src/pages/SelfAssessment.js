import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUniversityById } from '../data/mockUniversities';
import { ArrowLeft, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const SelfAssessment = () => {
  const { universityId } = useParams();
  const navigate = useNavigate();
  const [university, setUniversity] = useState(null);
  const [assessment, setAssessment] = useState({
    gmat: { score: '', status: 'not_started' },
    gre: { score: '', status: 'not_started' },
    ielts: { score: '', status: 'not_started' },
    toefl: { score: '', status: 'not_started' },
    lors: { count: 0, status: 'not_started' },
    sop: { status: 'not_started' },
    transcripts: { status: 'not_started' },
    workExperience: { years: '', status: 'not_started' }
  });

  useEffect(() => {
    const uni = getUniversityById(universityId);
    setUniversity(uni);
    
    // Load existing assessment if any
    const saved = localStorage.getItem(`assessment_${universityId}`);
    if (saved) {
      setAssessment(JSON.parse(saved));
    }
  }, [universityId]);

  const handleInputChange = (field, key, value) => {
    setAssessment(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [key]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save assessment
    localStorage.setItem(`assessment_${universityId}`, JSON.stringify(assessment));
    navigate(`/feedback/${universityId}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_progress': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'not_started': return <AlertCircle className="h-5 w-5 text-red-600" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const AssessmentItem = ({ title, field, type, required, children }) => (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {getStatusIcon(assessment[field]?.status)}
          <h3 className="text-lg font-semibold text-gray-900 ml-3">{title}</h3>
          {required && <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Required</span>}
        </div>
      </div>
      {children}
    </div>
  );

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(`/university/${universityId}`)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {university.name}
          </button>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Self-Assessment</h1>
            <p className="text-gray-600">Track your current status for {university.name} requirements</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Test Scores */}
          <AssessmentItem title="GMAT Score" field="gmat" required={university.requirements.gmat !== 'Not required'}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Score (Required: {university.requirements.gmat})
                </label>
                <input
                  type="text"
                  value={assessment.gmat.score}
                  onChange={(e) => handleInputChange('gmat', 'score', e.target.value)}
                  placeholder="e.g., 680"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={assessment.gmat.status}
                  onChange={(e) => handleInputChange('gmat', 'status', e.target.value)}
                  className="form-input"
                >
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">Preparing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </AssessmentItem>

          <AssessmentItem title="GRE Score" field="gre" required={university.requirements.gre !== 'Not required'}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Score (Required: {university.requirements.gre})
                </label>
                <input
                  type="text"
                  value={assessment.gre.score}
                  onChange={(e) => handleInputChange('gre', 'score', e.target.value)}
                  placeholder="e.g., 320"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={assessment.gre.status}
                  onChange={(e) => handleInputChange('gre', 'status', e.target.value)}
                  className="form-input"
                >
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">Preparing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </AssessmentItem>

          <AssessmentItem title="IELTS Score" field="ielts" required={true}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Score (Required: {university.requirements.ielts})
                </label>
                <input
                  type="text"
                  value={assessment.ielts.score}
                  onChange={(e) => handleInputChange('ielts', 'score', e.target.value)}
                  placeholder="e.g., 7.5"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={assessment.ielts.status}
                  onChange={(e) => handleInputChange('ielts', 'status', e.target.value)}
                  className="form-input"
                >
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">Preparing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </AssessmentItem>

          {/* Letters of Recommendation */}
          <AssessmentItem title="Letters of Recommendation" field="lors" required={true}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Letters Secured (Required: {university.requirements.lors})
                </label>
                <select
                  value={assessment.lors.count}
                  onChange={(e) => handleInputChange('lors', 'count', parseInt(e.target.value))}
                  className="form-input"
                >
                  <option value={0}>0 Letters</option>
                  <option value={1}>1 Letter</option>
                  <option value={2}>2 Letters</option>
                  <option value={3}>3 Letters</option>
                  <option value={4}>4+ Letters</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={assessment.lors.status}
                  onChange={(e) => handleInputChange('lors', 'status', e.target.value)}
                  className="form-input"
                >
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">Requesting</option>
                  <option value="completed">All Secured</option>
                </select>
              </div>
            </div>
          </AssessmentItem>

          {/* Statement of Purpose */}
          <AssessmentItem title="Statement of Purpose" field="sop" required={true}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={assessment.sop.status}
                onChange={(e) => handleInputChange('sop', 'status', e.target.value)}
                className="form-input"
              >
                <option value="not_started">Not Started</option>
                <option value="in_progress">Draft Ready</option>
                <option value="completed">Final Version Ready</option>
              </select>
            </div>
          </AssessmentItem>

          {/* Transcripts */}
          <AssessmentItem title="Official Transcripts" field="transcripts" required={true}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={assessment.transcripts.status}
                onChange={(e) => handleInputChange('transcripts', 'status', e.target.value)}
                className="form-input"
              >
                <option value="not_started">Not Requested</option>
                <option value="in_progress">Requested</option>
                <option value="completed">Received</option>
              </select>
            </div>
          </AssessmentItem>

          {/* Work Experience */}
          <AssessmentItem title="Work Experience" field="workExperience" required={false}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="text"
                  value={assessment.workExperience.years}
                  onChange={(e) => handleInputChange('workExperience', 'years', e.target.value)}
                  placeholder="e.g., 2.5"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={assessment.workExperience.status}
                  onChange={(e) => handleInputChange('workExperience', 'status', e.target.value)}
                  className="form-input"
                >
                  <option value="not_started">No Experience</option>
                  <option value="in_progress">Currently Working</option>
                  <option value="completed">Experience Documented</option>
                </select>
              </div>
            </div>
          </AssessmentItem>

          {/* Submit Button */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => navigate(`/university/${universityId}`)}
              className="btn-secondary"
            >
              Save & Continue Later
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Get AI Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SelfAssessment;
