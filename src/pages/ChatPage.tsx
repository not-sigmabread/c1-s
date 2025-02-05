import React, { useState } from 'react';

const ChatPage: React.FC = () => {
  const [messages] = useState([
    { id: 1, user: 'sigmabread', content: 'Welcome to the chat!', timestamp: new Date() },
    { id: 2, user: 'system', content: 'This is a static demo version.', timestamp: new Date() }
  ]);

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map(message => (
          <div key={message.id} className="message">
            <div className="message-header">
              <span className="username">{message.user}</span>
              <span className="timestamp">{message.timestamp.toLocaleTimeString()}</span>
            </div>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
