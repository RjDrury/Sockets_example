import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';
import { MessageArgs } from '../App';
interface ChatboxProps {
  yourName?: string;
  socket?: any;
}
const ChatBox: React.FC<ChatboxProps> = ({ yourName, socket }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setNewMessage('');
      socket.emit('message', { user: yourName, message: newMessage });
    }
  };
  if (socket) {
    socket.on('message', (args: MessageArgs) => {
      const { user, message } = args;
      setMessages([...messages, `${user}: ${message}`]);
    });
  }
  return (
    <Paper
      elevation={3}
      style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}
    >
      <div>
        {messages.map((message, index) => (
          <Typography key={index} variant='body1'>
            {message}
          </Typography>
        ))}
      </div>
      <TextField
        label='New Message'
        variant='outlined'
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        style={{ marginTop: '10px' }}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={handleSendMessage}
        style={{ marginTop: '10px' }}
      >
        Send
      </Button>
      <Typography style={{ marginTop: '15px' }}>
        {yourName ? `Your name is ${yourName}` : 'You are not logged in'}
      </Typography>
    </Paper>
  );
};

export default ChatBox;
