import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../App';
import '../styles/UserProfile.css';

interface UserProfileProps {
  currentUser: User | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ currentUser }) => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  
  // Mock user data - in a real app, this would come from a database
  const [user] = useState<User>({
    id: '1',
    username: username || '',
    role: 'user',
    status: 'online',
    description: 'A chat user',
    joinDate: '2025-01-01'
  });

  const [isFriend, setIsFriend] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleAddFriend = () => {
    setIsFriend(!isFriend);
  };

  const handleBlock = () => {
    setIsBlocked(!isBlocked);
  };

  const handleSendMessage = () => {
    // In a real app, this would open a DM
    alert('Direct messaging feature would open here');
  };

  return (
    <div className="user-profile">
      <button className="back-button" onClick={() => navigate('/chat')}>
        Back to Chat
      </button>

      <div className="profile-card">
        <div className="profile-header">
          <h2>{username}</h2>
          <span className={`status ${user.status}`}>{user.status}</span>
        </div>

        <div className="profile-info">
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Join Date:</strong> {user.joinDate}</p>
          <p><strong>Description:</strong> {user.description || 'No description provided'}</p>
        </div>

        {currentUser && currentUser.username !== username && (
          <div className="profile-actions">
            <button
              onClick={handleAddFriend}
              className={isFriend ? 'remove-friend' : 'add-friend'}
            >
              {isFriend ? 'Remove Friend' : 'Add Friend'}
            </button>
            <button onClick={handleSendMessage}>
              Send Message
            </button>
            <button
              onClick={handleBlock}
              className={isBlocked ? 'unblock' : 'block'}
            >
              {isBlocked ? 'Unblock User' : 'Block User'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
