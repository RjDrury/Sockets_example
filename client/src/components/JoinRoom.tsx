import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';

interface JoinRoomProps {
  open: boolean;
  onClose: () => void;
  onJoinRoom: (name: string, roomId: string) => void;
}

const JoinRoom: React.FC<JoinRoomProps> = ({ open, onClose, onJoinRoom }) => {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');

  const handleJoinRoom = () => {
    if (name.trim() !== '' && roomId.trim() !== '') {
      onJoinRoom(name, roomId);
      setName('');
      setRoomId('');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          outline: 'none'
        }}
      >
        <TextField
          label='Your Name'
          variant='outlined'
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label='Room ID'
          variant='outlined'
          fullWidth
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Button variant='contained' color='primary' onClick={handleJoinRoom}>
          Join Room
        </Button>
      </div>
    </Modal>
  );
};

export default JoinRoom;
