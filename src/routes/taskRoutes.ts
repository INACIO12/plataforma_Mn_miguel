import { Router } from 'express';
import { createTaskHandler, archiveTaskHandler, getTAllTasksHandler, getRelevantTasksHandler, getTodayTasksHandler } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/tasks', authMiddleware, createTaskHandler);
router.post('/tasks/archive', authMiddleware, archiveTaskHandler);
router.get('/tasks/relevant', authMiddleware, getRelevantTasksHandler);
router.get('/tasks/today', authMiddleware, getTodayTasksHandler);
router.get('/tasks/all', authMiddleware, getTAllTasksHandler);

export default router;
