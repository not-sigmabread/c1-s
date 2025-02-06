import React, { useState, useEffect } from 'react';
import { User } from '../App';
import '../styles/ChatPage.css';
import AdminPanelChannel from '../components/AdminPanelChannel';

// Inside the ChatPage component's return statement, update the main chat area:
<main className="chat-main">
  {currentChannel === 'admin-panel' ? (
    <AdminPanelChannel currentUser={currentUser} />
  ) : (
    <>
      <div className="chat-header">
        <h2>{CHANNELS.find(c => c.id === currentChannel)?.name}</h2>
      </div>
      <div className="messages-container">
        {/* Regular chat messages */}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type a message..."
          className="chat-input"
        />
        <button className="send-button">Send</button>
      </div>
    </>
  )}
</main>

interface ChatPageProps {
  currentUser: User;
}

interface Channel {
  id: string;
  name: string;
  type: 'public' | 'private' | 'admin';
  description: string;
}

const CHANNELS: Channel[] = [
  {
    id: 'general',
    name: '💬 General',
    type: 'public',
    description: 'General chat for everyone'
  },
  {
    id: 'announcements',
    name: '📢 Announcements',
    type: 'public',
    description: 'Important announcements'
  },
  {
    id: 'admin-panel',
    name: '🛡️ Admin Panel',
    type: 'admin',
    description: 'Admin only channel'
  }
];

const ChatPage: React.FC<ChatPageProps> = ({ currentUser }) => {
  const [currentChannel, setCurrentChannel] = useState('general');
  const [theme, setTheme] = useState('dark');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Filter channels based on user role
  const availableChannels = CHANNELS.filter(channel => 
    channel.type !== 'admin' || currentUser.role === 'owner' || currentUser.role === 'admin'
  );

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.body.className = `theme-${newTheme}`;
  };

  return (
    <div className="chat-layout">
      {/* Sidebar */}
      <aside className="chat-sidebar">
        {/* User Profile Section */}
        <div className="user-profile">
          <div className={`user-avatar ${currentUser.role}`}>
            {currentUser.username[0].toUpperCase()}
          </div>
          <div className="user-info">
            <span className={`username-${currentUser.role}`}>
              {currentUser.username}
            </span>
            <span className="user-role">{currentUser.role}</span>
          </div>
          <button 
            className="user-menu-button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            ⚙️
          </button>
          
          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div className="user-menu-dropdown">
              <div className="menu-section">
                <h3>Theme</h3>
                <button onClick={() => handleThemeChange('dark')}>🌑 Dark</button>
                <button onClick={() => handleThemeChange('light')}>☀️ Light</button>
                <button onClick={() => handleThemeChange('midnight')}>
                  🌌 Midnight
                </button>
              </div>
              <div className="menu-section">
                <h3>Status</h3>
                <button>🟢 Online</button>
                <button>🌙 Away</button>
                <button>⭕ Do Not Disturb</button>
              </div>
              <div className="menu-divider" />
              <button className="menu-item logout">🚪 Log Out</button>
            </div>
          )}
        </div>

        {/* Channels List */}
        <div className="channels-section">
          <h2>Channels</h2>
          <div className="channels-list">
            {availableChannels.map(channel => (
              <button
                key={channel.id}
                className={`channel-item ${currentChannel === channel.id ? 'active' : ''} ${channel.type}`}
                onClick={() => setCurrentChannel(channel.id)}
              >
                <span className="channel-name">{channel.name}</span>
                <span className="channel-description">{channel.description}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-main">
        <div className="chat-header">
          <h2>{CHANNELS.find(c => c.id === currentChannel)?.name}</h2>
          <div className="chat-header-actions">
            {/* Add any channel-specific actions here */}
          </div>
        </div>

        <div className="messages-container">
          {/* Messages will go here */}
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type a message..."
            className="chat-input"
          />
          <button className="send-button">Send</button>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
