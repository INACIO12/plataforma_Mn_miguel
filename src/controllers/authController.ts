import { Request, Response } from 'express';
import { registerUser, authenticateUser } from '../services/authService';

export async function registerHandler(req: Request, res: Response) {
  const { name, email, password } = req.body;
  try {
    const user = await registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const { token, user } = await authenticateUser(email, password);
    res.json({ token, user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}
