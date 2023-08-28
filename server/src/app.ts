import * as express from 'express';
import { db } from './db/db';
import 'dotenv/config';
const morgan = require('morgan');
const cors = require('cors');
const http = require('http'); // Import the 'http' module
const socketIo = require('socket.io'); // Import the socket.io module
// // establish database connection
// db.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization:', err);
//   });

const server = express();
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

const api_router = require('./routes/api.router');
server.use('/api', api_router);

// start express server

const httpServer = http.createServer(server);
const io = socketIo(httpServer, {
  cors: {
    origin: '*', // Allow requests from any origin. You can replace this with your frontend's actual origin(s).
    methods: ['GET', 'POST'] // Add any additional methods your application uses
  }
});

// Define socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', ({ user, room }) => {
    socket.join(room);
    io.to(room).emit('message', {
      user: 'System',
      message: `${user} has joined the chat`
    });
  });

  socket.on('message', (message) => {
    io.to(message.room).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

httpServer.listen(8000);
console.log('Server is listening on port 8000...');
