# 🏫 AI Admission Portal

An AI-powered university admission companion that guides students through their admission journey with personalized recommendations and feedback.

## Features

- **Smart Profile Creation** - Upload documents and academic data
- **AI University Matching** - Get Safe/Moderate/Ambitious recommendations
- **Requirement Checklist** - View prerequisites, deadlines, and fees
- **Gap Analysis** - Self-assess current status vs requirements
- **Personalized Feedback** - AI-powered improvement suggestions
- **Seamless Redirect** - Direct links to university portals

## Tech Stack

- **Frontend**: React with Tailwind CSS
- **Backend**: Firebase Functions
- **Database**: Firestore
- **Auth**: Firebase Auth
- **AI**: Vibe Coding API integration
- **Forms**: Typeform integration

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the app

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── services/           # Firebase and API services
├── utils/              # Helper functions
├── data/               # Mock data for development
└── styles/             # Global styles and Tailwind config
```

## Demo Flow

1. Landing Page → "Start Your Admission Journey"
2. Profile Creation → Upload resume, scores, budget
3. Requirements Form → Academic background input
4. AI Recommendations → Safe/Moderate/Ambitious universities
5. University Selection → View detailed requirements
6. Self-Assessment → Current status vs requirements
7. AI Feedback → Personalized improvement suggestions
8. Apply → Redirect to university portal

## Environment Setup

Create a `.env` file with your Firebase configuration:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_VIBE_CODING_API_KEY=your_vibe_coding_key
```
