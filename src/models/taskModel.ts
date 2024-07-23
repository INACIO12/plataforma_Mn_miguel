import { Router } from 'express';
import { createTaskHandler, archiveTaskHandler } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/tasks', authMiddleware, createTaskHandler);
router.post('/tasks/archive', authMiddleware, archiveTaskHandler);

export default router;
