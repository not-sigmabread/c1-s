import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';

const App: React.FC = () => {
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const currentUser = 'not-sigmabread';

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="app-info">
            <div>Current Date and Time (UTC): {currentDate}</div>
            <div>Current User's Login: {currentUser}</div>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
