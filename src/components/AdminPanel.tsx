import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { User } from '../App';
import '../styles/AdminPanel.css';

interface AdminPanelProps {
  currentUser: User;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser }) => {
  const [selectedSection, setSelectedSection] = useState('dashboard');

  const sections = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: '📊'
    },
    {
      id: 'users',
      name: 'User Management',
      icon: '👥'
    },
    {
      id: 'content',
      name: 'Content Moderation',
      icon: '📝'
    },
    {
      id: 'channels',
      name: 'Channel Management',
      icon: '📺'
    },
    {
      id: 'logs',
      name: 'Activity Logs',
      icon: '📋'
    },
    {
      id: 'settings',
      name: 'Site Settings',
      icon: '⚙️'
    },
    {
      id: 'customization',
      name: 'Customization',
      icon: '🎨'
    }
  ];

  return (
    <div className="admin-panel">
      <nav className="admin-sidebar">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <span className="admin-role">{currentUser.role.toUpperCase()}</span>
        </div>
        
        <div className="admin-nav">
          {sections.map(section => (
            <Link
              key={section.id}
              to={`/admin/${section.id}`}
              className={`admin-nav-item ${selectedSection === section.id ? 'active' : ''}`}
              onClick={() => setSelectedSection(section.id)}
            >
              <span className="admin-nav-icon">{section.icon}</span>
              {section.name}
            </Link>
          ))}
        </div>
      </nav>

      <main className="admin-content">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/content" element={<ContentModeration />} />
          <Route path="/channels" element={<ChannelManagement />} />
          <Route path="/logs" element={<ActivityLogs />} />
          <Route path="/settings" element={<SiteSettings />} />
          <Route path="/customization" element={<Customization />} />
        </Routes>
      </main>
    </div>
  );
};

// Placeholder components for each section
const AdminDashboard = () => (
  <div className="admin-section">
    <h2>Dashboard</h2>
    {/* Add dashboard content */}
  </div>
);

const UserManagement = () => (
  <div className="admin-section">
    <h2>User Management</h2>
    {/* Add user management content */}
  </div>
);

// Add other section components...

export default AdminPanel;
