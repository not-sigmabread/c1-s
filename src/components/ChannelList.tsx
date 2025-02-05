import React from 'react';
import '../styles/ChannelList.css';

interface Channel {
  id: string;
  name: string;
  type: string;
  description: string;
}

interface ChannelListProps {
  channels: Channel[];
  currentChannel: string;
  onChannelChange: (channel: string) => void;
  userRole: string;
}

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  currentChannel,
  onChannelChange,
  userRole
}) => {
  return (
    <div className="channel-list">
      <h2>Channels</h2>
      <div className="channels">
        {channels.map(channel => (
          <button
            key={channel.id}
            className={`channel ${currentChannel === channel.name ? 'active' : ''}`}
            onClick={() => onChannelChange(channel.name)}
          >
            # {channel.name}
            <span className="channel-description">{channel.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChannelList;
