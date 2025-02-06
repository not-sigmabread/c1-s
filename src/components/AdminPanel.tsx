import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { User } from '../App';
import '../styles/AdminPanel.css';

interface AdminPanelProps {
  currentUser: User;
}

// Dashboard Component
const AdminDashboard: React.FC = () => {
  const stats = {
    totalUsers: 150,
    activeUsers: 45,
    totalChannels: 8,
    reportedContent: 3,
    newUsersToday: 12
  };

  return (
    <div className="admin-section">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p className="stat-number">{stats.activeUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Channels</h3>
          <p className="stat-number">{stats.totalChannels}</p>
        </div>
        <div className="stat-card">
          <h3>Reported Content</h3>
          <p className="stat-number">{stats.reportedContent}</p>
        </div>
        <div className="stat-card">
          <h3>New Users Today</h3>
          <p className="stat-number">{stats.newUsersToday}</p>
        </div>
      </div>
    </div>
  );
};

// User Management Component
const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    // Add mock users here
  ]);

  const handleBanUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isBanned: true }
        : user
    ));
  };

  return (
    <div className="admin-section">
      <h2>User Management</h2>
      <div className="user-controls">
        <input type="text" placeholder="Search users..." className="search-input" />
        <select className="filter-select">
          <option value="all">All Users</option>
          <option value="online">Online</option>
          <option value="banned">Banned</option>
        </select>
      </div>
      <div className="users-table">
        {/* Add user table here */}
      </div>
    </div>
  );
};

// Content Moderation Component
const ContentModeration: React.FC = () => {
  const [reports, setReports] = useState([
    // Add mock reports here
  ]);

  return (
    <div className="admin-section">
      <h2>Content Moderation</h2>
      <div className="reports-list">
        <div className="reports-header">
          <h3>Recent Reports</h3>
          <select className="filter-select">
            <option value="all">All Reports</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        {/* Add reports list here */}
      </div>
    </div>
  );
};

// Channel Management Component
const ChannelManagement: React.FC = () => {
  const [channels, setChannels] = useState([
    // Add mock channels here
  ]);

  return (
    <div className="admin-section">
      <h2>Channel Management</h2>
      <div className="channel-controls">
        <button className="create-channel-btn">Create New Channel</button>
      </div>
      <div className="channels-list">
        {/* Add channels list here */}
      </div>
    </div>
  );
};

// Activity Logs Component
const ActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState([
    // Add mock logs here
  ]);

  return (
    <div className="admin-section">
      <h2>Activity Logs</h2>
      <div className="logs-controls">
        <input type="date" className="date-filter" />
        <select className="action-filter">
          <option value="all">All Actions</option>
          <option value="ban">Bans</option>
          <option value="delete">Deletions</option>
          <option value="edit">Edits</option>
        </select>
      </div>
      <div className="logs-table">
        {/* Add logs table here */}
      </div>
    </div>
  );
};

// Site Settings Component
const SiteSettings: React.FC = () => {
  return (
    <div className="admin-section">
      <h2>Site Settings</h2>
      <div className="settings-grid">
        <div className="setting-card">
          <h3>General Settings</h3>
          <form className="settings-form">
            <div className="form-group">
              <label>Site Name</label>
              <input type="text" defaultValue="Chat Website" />
            </div>
            <div className="form-group">
              <label>Default Language</label>
              <select>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
        <div className="setting-card">
          <h3>Security Settings</h3>
          {/* Add security settings here */}
        </div>
      </div>
    </div>
  );
};

// Customization Component
const Customization: React.FC = () => {
  return (
    <div className="admin-section">
      <h2>Customization</h2>
      <div className="customization-grid">
        <div className="custom-card">
          <h3>Theme Settings</h3>
          <div className="color-pickers">
            <div className="color-input">
              <label>Primary Color</label>
              <input type="color" defaultValue="#4a90e2" />
            </div>
            <div className="color-input">
              <label>Background Color</label>
              <input type="color" defaultValue="#1a1a2e" />
            </div>
          </div>
        </div>
        <div className="custom-card">
          <h3>Custom Emojis</h3>
          <div className="emoji-manager">
            {/* Add emoji management here */}
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default AdminPanel;
