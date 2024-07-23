import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

const JWT_SECRET = 'your_jasdasaiweasdadwt_secret_key'; // Mude isso para um segredo seguro

export async function registerUser(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return user;
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Email ou senha inválidos');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
