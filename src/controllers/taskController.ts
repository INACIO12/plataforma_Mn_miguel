import { Request, Response } from 'express';
import { createTask, archiveTask, getRelevantTasks, getTodayTasks } from '../services/taskService';

export async function createTaskHandler(req: Request, res: Response) {
  const { name, description, startDate, endDate, startTime, endTime } = req.body;
  const userId = (req as any).user.userId;

  // Combine startDate and startTime into ISO string format
  const startDateTime = `${startDate}T${startTime}`;
  const endDateTime = `${endDate}T${endTime}`;

  try {
    // Verifique se `startTime` e `endTime` são strings e passá-los para a função
    const task = await createTask(userId, name, description, startDateTime, endDateTime, startTime, endTime);
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// analyzeSentiment
export async function archiveTaskHandler(req: Request, res: Response) {
  const { taskId } = req.body;
  try {
    const task = await archiveTask(taskId);
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getRelevantTasksHandler(req: Request, res: Response) {
  const userId = (req as any).user.userId;
  try {
    const tasks = await getRelevantTasks(userId);
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTodayTasksHandler(req: Request, res: Response) {
  const userId = (req as any).user.userId;
  try {
    const tasks = await getTodayTasks(userId);
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
