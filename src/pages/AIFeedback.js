import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUniversityById } from '../data/mockUniversities';
import { ArrowLeft, Brain, TrendingUp, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

const AIFeedback = () => {
  const { universityId } = useParams();
  const navigate = useNavigate();
  const [university, setUniversity] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const uni = getUniversityById(universityId);
    setUniversity(uni);
    
    const savedAssessment = localStorage.getItem(`assessment_${universityId}`);
    if (savedAssessment) {
      const assessmentData = JSON.parse(savedAssessment);
      setAssessment(assessmentData);
      generateFeedback(uni, assessmentData);
    }
  }, [universityId]);

  const generateFeedback = (uni, assessmentData) => {
    // AI Feedback Generation Logic (Mock)
    const feedbackItems = [];
    
    // IELTS Feedback
    if (assessmentData.ielts.score) {
      const userScore = parseFloat(assessmentData.ielts.score);
      const requiredScore = parseFloat(uni.requirements.ielts);
      const averageScore = uni.averageProfile.ielts;
      
      if (userScore < requiredScore) {
        feedbackItems.push({
          type: 'critical',
          category: 'IELTS',
          title: 'IELTS Score Below Requirement',
          message: `Your IELTS score (${userScore}) is below ${uni.name}'s minimum requirement (${requiredScore}). You must retake the exam.`,
          action: 'Retake IELTS exam',
          priority: 'high'
        });
      } else if (userScore < averageScore) {
        feedbackItems.push({
          type: 'warning',
          category: 'IELTS',
          title: 'IELTS Score Below Average',
          message: `Your IELTS score (${userScore}) meets the minimum but is below the average admitted student (${averageScore}). Consider retaking for a stronger application.`,
          action: 'Consider retaking IELTS',
          priority: 'medium'
        });
      } else {
        feedbackItems.push({
          type: 'success',
          category: 'IELTS',
          title: 'Strong IELTS Score',
          message: `Your IELTS score (${userScore}) is competitive and above the average admitted student score.`,
          action: 'Maintain current score',
          priority: 'low'
        });
      }
    }

    // GRE/GMAT Feedback
    const testScore = assessmentData.gre.score || assessmentData.gmat.score;
    const testType = assessmentData.gre.score ? 'GRE' : 'GMAT';
    const requiredTest = assessmentData.gre.score ? uni.requirements.gre : uni.requirements.gmat;
    const averageTest = assessmentData.gre.score ? uni.averageProfile.gre : 650; // Mock GMAT average

    if (testScore) {
      const userTestScore = parseFloat(testScore);
      const requiredTestScore = parseFloat(requiredTest.replace(/[^\d]/g, ''));
      
      if (userTestScore < requiredTestScore) {
        feedbackItems.push({
          type: 'critical',
          category: testType,
          title: `${testType} Score Below Requirement`,
          message: `Your ${testType} score (${userTestScore}) is below the minimum requirement (${requiredTestScore}). Retake recommended.`,
          action: `Retake ${testType} exam`,
          priority: 'high'
        });
      } else if (userTestScore < averageTest) {
        feedbackItems.push({
          type: 'warning',
          category: testType,
          title: `${testType} Score Below Average`,
          message: `Your ${testType} score (${userTestScore}) meets minimum requirements but is below average (${averageTest}).`,
          action: `Consider retaking ${testType}`,
          priority: 'medium'
        });
      }
    }

    // Letters of Recommendation Feedback
    const requiredLORs = parseInt(uni.requirements.lors);
    const currentLORs = assessmentData.lors.count;
    
    if (currentLORs < requiredLORs) {
      const needed = requiredLORs - currentLORs;
      feedbackItems.push({
        type: 'critical',
        category: 'LORs',
        title: 'Missing Letters of Recommendation',
        message: `You need ${needed} more letter(s) of recommendation. Start reaching out to professors, managers, or mentors now.`,
        action: `Secure ${needed} more LOR(s)`,
        priority: 'high'
      });
    } else {
      feedbackItems.push({
        type: 'success',
        category: 'LORs',
        title: 'Letters of Recommendation Complete',
        message: `You have secured all required letters of recommendation (${currentLORs}/${requiredLORs}).`,
        action: 'Follow up on submission',
        priority: 'low'
      });
    }

    // Statement of Purpose Feedback
    if (assessmentData.sop.status === 'not_started') {
      feedbackItems.push({
        type: 'critical',
        category: 'SOP',
        title: 'Statement of Purpose Not Started',
        message: 'Your SOP is a critical component. Start drafting immediately to allow time for multiple revisions.',
        action: 'Begin SOP draft',
        priority: 'high'
      });
    } else if (assessmentData.sop.status === 'in_progress') {
      feedbackItems.push({
        type: 'warning',
        category: 'SOP',
        title: 'Complete Your Statement of Purpose',
        message: 'Your SOP draft is in progress. Get feedback from mentors and finalize it soon.',
        action: 'Finalize SOP',
        priority: 'medium'
      });
    }

    // Overall Application Strength
    const completedItems = Object.values(assessmentData).filter(item => item.status === 'completed').length;
    const totalItems = Object.keys(assessmentData).length;
    const completionRate = (completedItems / totalItems) * 100;

    feedbackItems.push({
      type: completionRate > 70 ? 'success' : completionRate > 40 ? 'warning' : 'critical',
      category: 'Overall',
      title: 'Application Readiness',
      message: `Your application is ${Math.round(completionRate)}% complete. ${completionRate > 70 ? 'You\'re on track!' : 'Focus on completing remaining requirements.'}`,
      action: completionRate > 70 ? 'Review and submit' : 'Complete missing items',
      priority: completionRate > 70 ? 'low' : 'high'
    });

    setFeedback({
      items: feedbackItems,
      overallScore: Math.round(completionRate),
      recommendedActions: feedbackItems.filter(item => item.priority === 'high').length
    });
  };

  const getFeedbackIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case 'critical': return <AlertTriangle className="h-6 w-6 text-red-600" />;
      default: return <Brain className="h-6 w-6 text-blue-600" />;
    }
  };

  const getFeedbackBg = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'critical': return 'bg-red-50 border-red-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  if (!university || !feedback) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Generating AI Feedback...</h2>
        <p className="text-gray-600">Analyzing your profile and requirements</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(`/assessment/${universityId}`)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Assessment
          </button>
          
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Feedback</h1>
              <p className="text-gray-600">Personalized recommendations for {university.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Score */}
        <div className="card mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Application Readiness Score</h2>
              <p className="text-blue-700">Based on your current profile and {university.name}'s requirements</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1">{feedback.overallScore}%</div>
              <div className="text-sm text-blue-700">Complete</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${feedback.overallScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Priority Actions */}
        <div className="card mb-8">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-orange-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Priority Actions</h2>
          </div>
          
          <div className="text-sm text-gray-600 mb-4">
            You have {feedback.recommendedActions} high-priority items that need immediate attention.
          </div>
          
          <div className="space-y-3">
            {feedback.items
              .filter(item => item.priority === 'high')
              .map((item, index) => (
                <div key={index} className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-red-900">{item.action}</div>
                    <div className="text-sm text-red-700">{item.category}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Detailed Feedback */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Detailed Analysis</h2>
          
          {feedback.items.map((item, index) => (
            <div key={index} className={`card ${getFeedbackBg(item.type)}`}>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  {getFeedbackIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{item.message}</p>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">
                      Recommended Action: {item.action}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.priority === 'high' ? 'bg-red-100 text-red-800' :
                      item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.priority} priority
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="card mt-8 bg-gray-900 text-white">
          <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">1. Address Priority Items</h4>
              <p className="text-gray-300 text-sm mb-4">
                Focus on high-priority feedback items first to strengthen your application.
              </p>
              <button
                onClick={() => navigate(`/assessment/${universityId}`)}
                className="btn-secondary text-sm"
              >
                Update Assessment
              </button>
            </div>
            <div>
              <h4 className="font-medium mb-2">2. Apply to University</h4>
              <p className="text-gray-300 text-sm mb-4">
                Once you've addressed the feedback, proceed with your application.
              </p>
              <button
                onClick={() => window.open('#', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg text-sm flex items-center"
              >
                Apply Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeedback;
