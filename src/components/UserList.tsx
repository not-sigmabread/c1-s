import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../App';
import '../styles/UserList.css';

interface UserListProps {
  users: User[];
  currentUser: User;
}

const UserList: React.FC<UserListProps> = ({ users, currentUser }) => {
  const sortedUsers = [...users].sort((a, b) => {
    const roleOrder = ['owner', 'admin', 'moderator', 'user', 'guest'];
    return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
  });

  return (
    <div className="user-list">
      <h2>Online Users</h2>
      <div className="users">
        {sortedUsers.map(user => (
          <Link
            key={user.id}
            to={`/profile/${user.username}`}
            className={`user ${user.status} ${user.username === currentUser.username ? 'current-user' : ''}`}
          >
            <span className={`status-indicator ${user.status}`} />
            <span className="username">{user.username}</span>
            <span className="role">{user.role}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserList;
