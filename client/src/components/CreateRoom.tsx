import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';

interface CreateRoomModalProps {
  open: boolean;
  onClose: () => void;
  onCreateRoom: (name: string) => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  open,
  onClose,
  onCreateRoom
}) => {
  const [name, setName] = useState('');

  const handleCreateRoom = () => {
    if (name.trim() !== '') {
      onCreateRoom(name);
      setName('');
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
          style={{ marginBottom: '20px' }}
        />
        <Button variant='contained' color='primary' onClick={handleCreateRoom}>
          Create Room
        </Button>
      </div>
    </Modal>
  );
};

export default CreateRoomModal;
