import React, { useState } from 'react';
import { User } from '../../App';
import '../../styles/ChatSidebar.css';

interface Channel {
  id: string;
  name: string;
  type: 'public' | 'private' | 'admin';
  description: string;
  createdBy: string;
  createdAt: string;
  lastActivity?: string;
}

interface ChatSidebarProps {
  channels: Channel[];
  activeChannel: string;
  onChannelSelect: (channelId: string) => void;
  currentUser: User | null;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  channels,
  activeChannel,
  onChannelSelect,
  currentUser
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateChannel, setShowCreateChannel] = useState(false);

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    channel.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault();
    // Channel creation logic here
    setShowCreateChannel(false);
  };

  return (
    <aside className="chat-sidebar">
      <div className="sidebar-header">
        <h2>Channels</h2>
        {currentUser?.role !== 'guest' && (
          <button 
            className="create-channel-btn"
            onClick={() => setShowCreateChannel(true)}
            title="Create new channel"
          >
            <span>+</span>
          </button>
        )}
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search channels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="channels-list">
        {filteredChannels.map(channel => (
          <button
            key={channel.id}
            className={`channel-item ${activeChannel === channel.id ? 'active' : ''} ${channel.type}`}
            onClick={() => onChannelSelect(channel.id)}
          >
            <div className="channel-icon">
              {channel.type === 'private' ? '🔒' : 
               channel.type === 'admin' ? '🛡️' : '#'}
            </div>
            <div className="channel-info">
              <span className="channel-name">{channel.name}</span>
              <span className="channel-description">{channel.description}</span>
            </div>
          </button>
        ))}
      </div>

      {showCreateChannel && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create Channel</h3>
            <form onSubmit={handleCreateChannel}>
              <div className="form-group">
                <label htmlFor="channelName">Channel Name</label>
                <input
                  type="text"
                  id="channelName"
                  placeholder="Enter channel name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="channelDescription">Description</label>
                <textarea
                  id="channelDescription"
                  placeholder="Enter channel description"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="channelType">Channel Type</label>
                <select id="channelType" required>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  {currentUser?.role === 'owner' && (
                    <option value="admin">Admin</option>
                  )}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateChannel(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Channel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="sidebar-footer">
        <div className={`user-status ${currentUser?.status}`}>
          <span className="status-dot"></span>
          <span className="status-text">{currentUser?.status || 'offline'}</span>
        </div>
        <div className={`user-info role-${currentUser?.role}`}>
          <span className="username">{currentUser?.username}</span>
          <span className="user-role">{currentUser?.role}</span>
        </div>
      </div>
    </aside>
  );
};
