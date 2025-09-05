import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Linkedin, Mail, Code, Brain, Palette } from 'lucide-react';

const About = () => {
  const creators = [
    {
      name: "Alex Chen",
      role: "Full Stack Developer & AI Engineer",
      contribution: "AI recommendation engine, backend architecture, and Firebase integration",
      avatar: "AC",
      skills: ["React", "Node.js", "Firebase", "AI/ML"],
      github: "https://github.com/alexchen",
      linkedin: "https://linkedin.com/in/alexchen",
      email: "alex@aiportal.com",
      icon: <Brain className="h-6 w-6" />
    },
    {
      name: "Sarah Johnson",
      role: "Frontend Developer & UX Designer",
      contribution: "User interface design, component development, and user experience optimization",
      avatar: "SJ",
      skills: ["React", "Tailwind CSS", "UI/UX", "Figma"],
      github: "https://github.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      email: "sarah@aiportal.com",
      icon: <Palette className="h-6 w-6" />
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager & Data Analyst",
      contribution: "Product strategy, university data curation, and analytics implementation",
      avatar: "MR",
      skills: ["Product Strategy", "Data Analysis", "Python", "SQL"],
      github: "https://github.com/michaelrodriguez",
      linkedin: "https://linkedin.com/in/michaelrodriguez",
      email: "michael@aiportal.com",
      icon: <Code className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate developers and designers behind AI Admission Portal
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Project Overview */}
        <div className="card mb-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            AI Admission Portal was built during a 48-hour buildathon to revolutionize the university 
            admission process. Our mission is to make higher education more accessible by providing 
            personalized, AI-powered guidance to students worldwide.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">48</div>
              <div className="text-sm text-gray-600">Hours to Build</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">8</div>
              <div className="text-sm text-gray-600">Universities Integrated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">7</div>
              <div className="text-sm text-gray-600">Step User Journey</div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Creators</h2>
          
          {creators.map((creator, index) => (
            <div key={index} className="card">
              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {creator.avatar}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {creator.icon}
                    <h3 className="text-2xl font-bold text-gray-900 ml-3">{creator.name}</h3>
                  </div>
                  <p className="text-lg text-primary-600 font-medium mb-3">{creator.role}</p>
                  <p className="text-gray-600 mb-4">{creator.contribution}</p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {creator.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-4">
                    <a
                      href={creator.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Github className="h-5 w-5 mr-2" />
                      <span className="text-sm">GitHub</span>
                    </a>
                    <a
                      href={creator.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 mr-2" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                    <a
                      href={`mailto:${creator.email}`}
                      className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      <span className="text-sm">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="card mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technology Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚛️</span>
              </div>
              <h3 className="font-semibold text-gray-900">React</h3>
              <p className="text-sm text-gray-600">Frontend Framework</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="font-semibold text-gray-900">Firebase</h3>
              <p className="text-sm text-gray-600">Backend & Auth</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold text-gray-900">Tailwind CSS</h3>
              <p className="text-sm text-gray-600">Styling</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold text-gray-900">AI Engine</h3>
              <p className="text-sm text-gray-600">Recommendations</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="card mt-12 bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200 text-center">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Get In Touch</h2>
          <p className="text-primary-700 mb-6">
            Have questions about the project or want to collaborate? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:team@aiportal.com"
              className="btn-primary"
            >
              Contact Our Team
            </a>
            <a
              href="https://github.com/ai-admission-portal"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center"
            >
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
