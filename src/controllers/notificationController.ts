// // src/controllers/notificationController.ts
// import { Request, Response } from 'express';
// import { notifyDailyTasks, notifyRelevantTasks } from '../services/notificationService';
// // import { notifyRelevantTasks, notifyDailyTasks } from '../services/notificationService';

// export async function notifyRelevantTasksHandler(req: Request, res: Response) {
//   const userId = (req as any).user.userId;
//   try {
//     await notifyRelevantTasks(userId);
//     res.status(200).json({ message: 'Notified relevant tasks successfully' });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// }

// export async function notifyDailyTasksHandler(req: Request, res: Response) {
//   const userId = (req as any).user.userId;
//   try {
//     await notifyDailyTasks(userId);
//     res.status(200).json({ message: 'Notified daily tasks successfully' });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// }
