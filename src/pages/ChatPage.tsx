import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ChatService from '../services/ChatService';
import '../styles/ChatPage.css';

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [currentChannel, setCurrentChannel] = useState('chat');
  const [newMessage, setNewMessage] = useState('');
  
  const chatService = ChatService.getInstance();

  useEffect(() => {
    setMessages(chatService.getMessages(currentChannel));
  }, [currentChannel]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const message = chatService.addMessage(newMessage, user.username, currentChannel);
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <div className="channels">
        <button
          className={currentChannel === 'announcements' ? 'active' : ''}
          onClick={() => setCurrentChannel('announcements')}
        >
          #announcements
        </button>
        <button
          className={currentChannel === 'chat' ? 'active' : ''}
          onClick={() => setCurrentChannel('chat')}
        >
          #chat
        </button>
        <button
          className={currentChannel === 'links' ? 'active' : ''}
          onClick={() => setCurrentChannel('links')}
        >
          #links
        </button>
      </div>

      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="username">{message.username}</span>
            <span className="content">{message.content}</span>
            <span className="timestamp">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
