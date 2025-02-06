import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { ChatSidebar } from '../components/chat/ChatSidebar';
import { ChatMessages } from '../components/chat/ChatMessages';
import { AdminChannel } from '../components/chat/AdminChannel';
import '../styles/ChatPage.css';

interface Channel {
  id: string;
  name: string;
  type: 'public' | 'private' | 'admin';
  description: string;
  createdBy: string;
  createdAt: string;
  lastActivity?: string;
  participants?: string[];
}

interface Message {
  id: string;
  channelId: string;
  content: string;
  sender: string;
  timestamp: string;
  type: 'text' | 'system' | 'action';
  mentions?: string[];
  attachments?: string[];
}

export const ChatPage: React.FC = () => {
  const { currentUser } = useUser();
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: 'general',
      name: '💬 General',
      type: 'public',
      description: 'General chat for everyone',
      createdBy: 'system',
      createdAt: '2025-01-01 00:00:00'
    },
    {
      id: 'announcements',
      name: '📢 Announcements',
      type: 'public',
      description: 'Important announcements',
      createdBy: 'system',
      createdAt: '2025-01-01 00:00:00'
    },
    {
      id: 'admin-panel',
      name: '🛡️ Admin Panel',
      type: 'admin',
      description: 'Administrative controls and features',
      createdBy: 'system',
      createdAt: '2025-01-01 00:00:00'
    }
  ]);

  const [activeChannel, setActiveChannel] = useState<string>('general');
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  // Filter channels based on user role
  const availableChannels = channels.filter(channel => 
    channel.type !== 'admin' || 
    (currentUser && ['owner', 'admin'].includes(currentUser.role))
  );

  const handleSendMessage = (content: string) => {
    if (!currentUser || !content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      channelId: activeChannel,
      content: content.trim(),
      sender: currentUser.username,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMessage]
    }));
  };

  return (
    <div className="chat-container">
      <ChatSidebar 
        channels={availableChannels}
        activeChannel={activeChannel}
        onChannelSelect={setActiveChannel}
        currentUser={currentUser}
      />
      
      <main className="chat-main">
        {activeChannel === 'admin-panel' && currentUser?.role === 'owner' ? (
          <AdminChannel currentUser={currentUser} />
        ) : (
          <ChatMessages
            messages={messages[activeChannel] || []}
            channel={channels.find(c => c.id === activeChannel)!}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
          />
        )}
      </main>
    </div>
  );
};
