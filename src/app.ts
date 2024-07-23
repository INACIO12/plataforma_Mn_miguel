import express from 'express';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);

export default app;
