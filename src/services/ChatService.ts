interface Message {
  id: string;
  content: string;
  username: string;
  channel: string;
  timestamp: number;
}

class ChatService {
  private static instance: ChatService;
  private messages: Message[] = [];

  private constructor() {
    // Load messages from localStorage
    const savedMessages = localStorage.getItem('chat_messages');
    this.messages = savedMessages ? JSON.parse(savedMessages) : this.getInitialMessages();
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  private getInitialMessages(): Message[] {
    return [
      {
        id: '1',
        content: 'Welcome to the chat!',
        username: 'sigmabread',
        channel: 'announcements',
        timestamp: Date.now() - 86400000 // 1 day ago
      },
      {
        id: '2',
        content: 'Feel free to introduce yourself!',
        username: 'mod',
        channel: 'chat',
        timestamp: Date.now() - 3600000 // 1 hour ago
      }
    ];
  }

  public getMessages(channel: string): Message[] {
    return this.messages.filter(m => m.channel === channel);
  }

  public addMessage(content: string, username: string, channel: string): Message {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      username,
      channel,
      timestamp: Date.now()
    };
    this.messages.push(newMessage);
    localStorage.setItem('chat_messages', JSON.stringify(this.messages));
    return newMessage;
  }
}

export default ChatService;
