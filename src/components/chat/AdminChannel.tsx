import React, { useState } from 'react';
import { User } from '../../App';
import '../../styles/AdminChannel.css';

interface AdminPanelSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: 'blue' | 'red' | 'green' | 'orange';
  features: AdminFeature[];
}

interface AdminFeature {
  id: string;
  name: string;
  description: string;
  action: () => void;
  requiresOwner: boolean;
}

interface AdminChannelProps {
  currentUser: User;
}

export const AdminChannel: React.FC<AdminChannelProps> = ({ currentUser }) => {
  const [activeSection, setActiveSection] = useState<string>('user-management');
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    message: string;
    action: () => void;
  } | null>(null);

  const adminSections: AdminPanelSection[] = [
    {
      id: 'user-management',
      title: 'User Management',
      icon: '👥',
      description: 'Manage users, roles, and permissions',
      color: 'blue',
      features: [
        {
          id: 'view-users',
          name: 'View All Users',
          description: 'See a list of all registered users and their details',
          action: () => console.log('View users'),
          requiresOwner: false
        },
        {
          id: 'manage-roles',
          name: 'Manage Roles',
          description: 'Change user roles and permissions',
          action: () => console.log('Manage roles'),
          requiresOwner: true
        },
        {
          id: 'ban-user',
          name: 'Ban User',
          description: 'Temporarily or permanently ban users',
          action: () => console.log('Ban user'),
          requiresOwner: false
        }
      ]
    },
    {
      id: 'channel-management',
      title: 'Channel Management',
      icon: '📢',
      description: 'Manage channels and channel settings',
      color: 'green',
      features: [
        {
          id: 'create-channel',
          name: 'Create Channel',
          description: 'Create a new channel with custom settings',
          action: () => console.log('Create channel'),
          requiresOwner: false
        },
        {
          id: 'delete-channel',
          name: 'Delete Channel',
          description: 'Permanently delete a channel',
          action: () => console.log('Delete channel'),
          requiresOwner: true
        },
        {
          id: 'channel-settings',
          name: 'Channel Settings',
          description: 'Modify channel permissions and configurations',
          action: () => console.log('Channel settings'),
          requiresOwner: false
        }
      ]
    },
    {
      id: 'moderation',
      title: 'Moderation Tools',
      icon: '🛡️',
      description: 'Tools for moderating chat content',
      color: 'red',
      features: [
        {
          id: 'delete-messages',
          name: 'Delete Messages',
          description: 'Remove inappropriate messages',
          action: () => console.log('Delete messages'),
          requiresOwner: false
        },
        {
          id: 'mute-user',
          name: 'Mute User',
          description: 'Temporarily prevent a user from sending messages',
          action: () => console.log('Mute user'),
          requiresOwner: false
        },
        {
          id: 'view-reports',
          name: 'View Reports',
          description: 'Review reported messages and users',
          action: () => console.log('View reports'),
          requiresOwner: false
        }
      ]
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      icon: '⚙️',
      description: 'Configure system-wide settings',
      color: 'orange',
      features: [
        {
          id: 'chat-settings',
          name: 'Chat Settings',
          description: 'Modify global chat behavior and features',
          action: () => console.log('Chat settings'),
          requiresOwner: true
        },
        {
          id: 'backup',
          name: 'Backup Data',
          description: 'Create and manage system backups',
          action: () => console.log('Backup data'),
          requiresOwner: true
        },
        {
          id: 'logs',
          name: 'View Logs',
          description: 'Access system and audit logs',
          action: () => console.log('View logs'),
          requiresOwner: true
        }
      ]
    }
  ];

  const handleAction = (action: () => void, title: string) => {
    setConfirmAction({
      title: `Confirm ${title}`,
      message: `Are you sure you want to ${title.toLowerCase()}?`,
      action
    });
  };

  return (
    <div className="admin-channel">
      <div className="admin-header">
        <h1>Administration Panel</h1>
        <div className="admin-user-info">
          <span className={`role-badge role-${currentUser.role}`}>
            {currentUser.role.toUpperCase()}
          </span>
          <span className="username">{currentUser.username}</span>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-sidebar">
          {adminSections.map(section => (
            <button
              key={section.id}
              className={`section-button ${section.color} ${
                activeSection === section.id ? 'active' : ''
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="section-icon">{section.icon}</span>
              <div className="section-info">
                <span className="section-title">{section.title}</span>
                <span className="section-description">{section.description}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="admin-panel">
          {adminSections
            .find(section => section.id === activeSection)
            ?.features.map(feature => (
              <div
                key={feature.id}
                className={`feature-card ${
                  feature.requiresOwner && currentUser.role !== 'owner'
                    ? 'disabled'
                    : ''
                }`}
              >
                <div className="feature-header">
                  <h3>{feature.name}</h3>
                  {feature.requiresOwner && (
                    <span className="owner-only-badge">Owner Only</span>
                  )}
                </div>
                <p>{feature.description}</p>
                <button
                  className="feature-button"
                  onClick={() => handleAction(feature.action, feature.name)}
                  disabled={feature.requiresOwner && currentUser.role !== 'owner'}
                >
                  Execute
                </button>
              </div>
            ))}
        </div>
      </div>

      {confirmAction && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{confirmAction.title}</h2>
            <p>{confirmAction.message}</p>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setConfirmAction(null)}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  confirmAction.action();
                  setConfirmAction(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
