import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../App';
import UserList from '../components/UserList';
import ChannelList from '../components/ChannelList';
import MessageInput from '../components/MessageInput';
import '../styles/ChatPage.css';

interface Message {
  id: string;
  content: string;
  username: string;
  channel: string;
  timestamp: string;
  type: 'message' | 'system' | 'link';
}

interface ChatPageProps {
  currentUser: User;
}

const MOCK_CHANNELS = [
  { id: '1', name: 'announcements', type: 'announcements', description: 'Important announcements' },
  { id: '2', name: 'chat', type: 'chat', description: 'General chat' },
  { id: '3', name: 'links', type: 'links', description: 'Share links' }
];

const MOCK_USERS: User[] = [
  { id: '1', username: 'sigmabread', role: 'owner', status: 'online', description: 'Owner', joinDate: '2025-01-01' },
  { id: '2', username: 'mod1', role: 'moderator', status: 'online', description: 'Moderator', joinDate: '2025-01-02' },
  { id: '3', username: 'user1', role: 'user', status: 'away', description: 'Regular user', joinDate: '2025-01-03' }
];

const ChatPage: React.FC<ChatPageProps> = ({ currentUser }) => {
  const [currentChannel, setCurrentChannel] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [users] = useState<User[]>(MOCK_USERS);

  useEffect(() => {
    // Load initial messages
    const initialMessages: Message[] = [
      {
        id: '1',
        content: 'Welcome to the chat!',
        username: 'sigmabread',
        channel: 'announcements',
        timestamp: new Date().toISOString(),
        type: 'system'
      }
    ];
    setMessages(initialMessages);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    // Check permissions
    if (currentChannel === 'announcements' && 
        !['owner', 'admin', 'moderator'].includes(currentUser.role)) {
      alert('You do not have permission to post in announcements');
      return;
    }

    if (currentChannel === 'links' && 
        !['owner', 'admin', 'moderator'].includes(currentUser.role)) {
      alert('You do not have permission to post links');
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      username: currentUser.username,
      channel: currentChannel,
      timestamp: new Date().toISOString(),
      type: content.startsWith('http') ? 'link' : 'message'
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="chat-page">
      <aside className="sidebar">
        <ChannelList 
          channels={MOCK_CHANNELS}
          currentChannel={currentChannel}
          onChannelChange={setCurrentChannel}
          userRole={currentUser.role}
        />
        <UserList users={users} currentUser={currentUser} />
      </aside>

      <main className="chat-main">
        <div className="channel-header">
          #{currentChannel}
        </div>

        <div className="messages-container">
          {messages
            .filter(m => m.channel === currentChannel)
            .map(message => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-header">
                  <Link to={`/profile/${message.username}`} className="username">
                    {message.username}
                  </Link>
                  <span className="timestamp">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-content">
                  {message.type === 'link' ? (
                    <a href={message.content} target="_blank" rel="noopener noreferrer">
                      {message.content}
                    </a>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>

        <MessageInput onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
};

export default ChatPage;
