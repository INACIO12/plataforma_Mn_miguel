// src/services/notificationService.ts
import { Server } from 'socket.io';
import { getRelevantTasks, getTodayTasks } from './taskService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function notifyDailyTasks(io: Server) {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const tasks = await prisma.task.findMany({
      where: {
        startDate: today,
        archived: false,
      },
    });
    io.emit('daily-tasks', tasks);
  } catch (error) {
    console.error('Error notifying daily tasks:', error);
  }
}

export async function notifyTasksByDateAndTime(io: Server) {
  try {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    const currentTime = now.toTimeString().split(' ')[0]; // HH:MM:SS format
    
    const tasks = await prisma.task.findMany({
      where: {
        startDate: currentDate,
        startTime: {
          lte: new Date(`1970-01-01T${currentTime}`),
        },
        endTime: {
          gte: new Date(`1970-01-01T${currentTime}`),
        },
        archived: false,
      },
    });
    io.emit('tasks-by-time', tasks);
  } catch (error) {
    console.error('Error notifying tasks by date and time:', error);
  }
}
