import React, { useState, useRef, useEffect } from 'react';
import { User } from '../../App';
import '../../styles/ChatMessages.css';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  type: 'text' | 'system' | 'action';
  mentions?: string[];
  attachments?: string[];
}

interface Channel {
  id: string;
  name: string;
  type: 'public' | 'private' | 'admin';
  description: string;
}

interface ChatMessagesProps {
  messages: Message[];
  channel: Channel;
  currentUser: User | null;
  onSendMessage: (content: string) => void;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  channel,
  currentUser,
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage && currentUser) {
      onSendMessage(trimmedMessage);
      setNewMessage('');
      setIsTyping(false);
    }
  };

  const formatMessageTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')} ${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(2, '0')}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
    
    // Auto-resize textarea
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="chat-messages-container">
      <div className="chat-header">
        <div className="channel-info">
          <h2>{channel.name}</h2>
          <p>{channel.description}</p>
        </div>
        <div className="channel-actions">
          <button className="action-button" title="Channel Settings">
            ⚙️
          </button>
          <button className="action-button" title="Search Messages">
            🔍
          </button>
          <button className="action-button" title="Members List">
            👥
          </button>
        </div>
      </div>

      <div className="messages-list">
        {messages.map((message, index) => {
          const isConsecutive = index > 0 && 
            messages[index - 1].sender === message.sender &&
            new Date(message.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() < 300000;

          return (
            <div 
              key={message.id}
              className={`message ${message.type} ${isConsecutive ? 'consecutive' : ''}`}
            >
              {!isConsecutive && (
                <div className="message-header">
                  <div className="sender-info">
                    <div className="avatar">
                      {message.sender[0].toUpperCase()}
                    </div>
                    <span className="username">{message.sender}</span>
                  </div>
                  <span className="timestamp">
                    {formatMessageTimestamp(message.timestamp)}
                  </span>
                </div>
              )}
              <div className="message-content">
                {message.type === 'text' && (
                  <p>{message.content}</p>
                )}
                {message.type === 'system' && (
                  <p className="system-message">{message.content}</p>
                )}
                {message.type === 'action' && (
                  <p className="action-message">* {message.sender} {message.content}</p>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        {isTyping && (
          <div className="typing-indicator">
            Typing...
          </div>
        )}
        <div className="input-container">
          <button 
            className="emoji-button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😊
          </button>
          <textarea
            ref={inputRef}
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
          />
          <button 
            className="send-button"
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || !currentUser}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
