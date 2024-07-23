import prisma from '../config/prisma';
import { analyzeSentiment } from './sentimentService';

export async function createTask(
  userId: number,
  name: string,
  description: string,
  startDateTime: string,
  endDateTime: string,
  startTime: string,
  endTime: string
) {
  try {
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    // Ensure valid Date objects
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error('Invalid date or time values.');
    }

    // Await sentiment analysis and get the relevance
    const sentiment = await analyzeSentiment(description);
    console.log("codigo"+sentiment)
    const relevance = sentiment; // Ensure this is the correct format for relevance

    const task = await prisma.task.create({
      data: {
        name,
        description,
        relevance, // Use the awaited relevance
        startDate,
        endDate,
        startTime: start,
        endTime: end,
        userId,
      },
    });

    return task;
  } catch (error: any) {
    throw new Error(`Failed to create task: ${error.message}`);
  }
}


export async function archiveTask(taskId: number) {
  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { archived: true },
    });
    return task;
  } catch (error: any) {
    throw new Error(`Failed to archive task: ${error.message}`);
  }
}

export async function getRelevantTasks(userId: number) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        relevance: {
          in: ['P', 'P+']
        },
        archived: false,
      },
    });
    return tasks;
  } catch (error: any) {
    throw new Error(`Failed to get relevant tasks: ${error.message}`);
  }
}


export async function getTodayTasks(userId: number) {
  try {
    // Cria a data do início e do fim do dia de hoje
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(now.setHours(23, 59, 59, 999)).toISOString();

    // Consulta as tarefas que estão dentro do intervalo do dia atual
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        startDate: {
          gte: new Date(startOfDay),
          lte: new Date(endOfDay),
        },
        archived: false,
      },
    });

    return tasks;
  } catch (error: any) {
    throw new Error(`Failed to get today's tasks: ${error.message}`);
  }
}