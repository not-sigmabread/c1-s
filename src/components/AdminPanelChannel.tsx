import React from 'react';
import '../styles/AdminPanelChannel.css';

interface AdminPanelChannelProps {
  currentUser: {
    role: string;
    username: string;
  };
}

const AdminPanelChannel: React.FC<AdminPanelChannelProps> = ({ currentUser }) => {
  const adminActions = [
    {
      id: 'user-management',
      title: 'User Management',
      description: 'Manage users, roles, and permissions',
      icon: '👥',
      color: 'blue',
      actions: [
        { name: 'View Users', description: 'See all registered users' },
        { name: 'Ban User', description: 'Temporarily or permanently ban users' },
        { name: 'Edit Roles', description: 'Modify user roles and permissions' }
      ]
    },
    {
      id: 'moderation',
      title: 'Content Moderation',
      description: 'Monitor and moderate chat content',
      icon: '🛡️',
      color: 'red',
      actions: [
        { name: 'View Reports', description: 'Check reported messages and users' },
        { name: 'Delete Messages', description: 'Remove inappropriate content' },
        { name: 'Mute Users', description: 'Temporarily prevent users from sending messages' }
      ]
    },
    {
      id: 'channels',
      title: 'Channel Management',
      description: 'Manage chat channels and categories',
      icon: '📺',
      color: 'green',
      actions: [
        { name: 'Create Channel', description: 'Add new chat channels' },
        { name: 'Edit Permissions', description: 'Modify channel access rights' },
        { name: 'Archive Channel', description: 'Temporarily hide channels' }
      ]
    },
    {
      id: 'system',
      title: 'System Settings',
      description: 'Configure system-wide settings',
      icon: '⚙️',
      color: 'orange',
      actions: [
        { name: 'Chat Settings', description: 'Modify chat behavior and features' },
        { name: 'Backup Data', description: 'Create system backups' },
        { name: 'View Logs', description: 'Check system and audit logs' }
      ]
    }
  ];

  return (
    <div className="admin-panel-channel">
      <div className="admin-panel-header">
        <h2>🛡️ Admin Control Panel</h2>
        <span className="admin-badge">{currentUser.role.toUpperCase()}</span>
      </div>

      <div className="admin-sections">
        {adminActions.map((section) => (
          <div key={section.id} className={`admin-section ${section.color}`}>
            <div className="section-header">
              <span className="section-icon">{section.icon}</span>
              <div className="section-title">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
            </div>
            <div className="section-actions">
              {section.actions.map((action, index) => (
                <button 
                  key={index} 
                  className={`action-button ${section.color}`}
                  onClick={() => console.log(`Executing: ${action.name}`)}
                >
                  <span className="action-name">{action.name}</span>
                  <span className="action-description">{action.description}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="admin-footer">
        <p>Logged in as: <span className="admin-username">{currentUser.username}</span></p>
        <p>Server Time: {new Date().toISOString().replace('T', ' ').slice(0, 19)}</p>
      </div>
    </div>
  );
};

export default AdminPanelChannel;
