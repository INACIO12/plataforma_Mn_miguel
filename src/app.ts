// src/index.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cron from 'node-cron';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';
import { notifyDailyTasks, notifyTasksByDateAndTime } from './services/notificationService';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3001;

// Use CORS middleware with options
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// Configure WebSocket
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Schedule jobs
cron.schedule('0 0 * * *', async () => { // Daily at midnight
  await notifyDailyTasks(io);
  console.log('Notified daily tasks at midnight');
});

cron.schedule('*/30 * * * *', async () => { // Every 30 minutes
  await notifyTasksByDateAndTime(io);
  console.log('Checked for tasks to notify based on date and time');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
