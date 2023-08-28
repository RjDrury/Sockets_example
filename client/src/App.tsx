import React, { useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import Chatbox from './components/Chatbox'; // Import your Chatbox component
import JoinRoom from './components/JoinRoom';
import CreateRoomModal from './components/CreateRoom';
import { io } from 'socket.io-client';

export interface MessageArgs {
  user: string;
  message: string;
}

const App = () => {
  const [roomId, setRoomId] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [openJoinModal, setOpenJoinModal] = React.useState<boolean>(false);
  const [openCreateModal, setCreateModal] = React.useState<boolean>(false);
  const [socket, setSocket] = React.useState<any>(null);
  const handleCreateRoom = () => {};

  const handleJoinRoom = (name: string, room: string) => {
    socket.emit('join', { room, user: name });
  };

  useEffect(() => {
    if (socket) return;
    const localSocket = io('http://localhost:8000');
    localSocket.on('connect', () => {
      console.log('Socket connected:' + localSocket.id); // x8WIv7-mJelg7on_ALbx
    });
    localSocket.on('disconnect', () => {
      console.log('Disconnected'); // undefined
    });
    localSocket.on('message', (args: MessageArgs) => {
      const { user, message } = args;
      console.log('Message received from ' + user + ': ' + message);
    });
    setSocket(localSocket);
  }, [socket]);

  return (
    <div
      style={{ height: '100vh', width: '100vw', backgroundColor: '#4F6D7A' }}
    >
      <Container
        maxWidth='xl'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <Typography
          variant='h1'
          style={{ color: '#E8DAB2' }}
          align='center'
          gutterBottom
        >
          Chat App
        </Typography>
        <Typography
          variant='h5'
          style={{ color: '#E8DAB2' }}
          align='center'
          gutterBottom
        >
          {roomId}
        </Typography>
        <Grid item style={{ marginBottom: '10px' }}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setCreateModal(true)}
          >
            Create Room
          </Button>
          <Button
            variant='contained'
            color='secondary'
            style={{ marginLeft: '10px' }}
            onClick={() => setOpenJoinModal(true)}
          >
            Join Room
          </Button>
        </Grid>
        <Chatbox yourName={username} socket={socket} room={roomId} />
        <JoinRoom
          onClose={() => {
            setOpenJoinModal(false);
          }}
          open={openJoinModal}
          onJoinRoom={(name, roomId) => {
            setUsername(name);
            setRoomId(roomId);
            setOpenJoinModal(false);
            handleJoinRoom(name, roomId);
          }}
        />
        <CreateRoomModal
          onClose={() => {
            setCreateModal(false);
          }}
          open={openCreateModal}
          onCreateRoom={(name) => {
            setUsername(name);
            setCreateModal(false);
          }}
        />
      </Container>
    </div>
  );
};

export default App;
