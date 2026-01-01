// Node.js (Express) Backend Implementation for PillarX
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// Mock database client (e.g., Prisma or Sequelize would go here)
// import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'pillarx-secret-key-2025';

// --- Utility: Bot Detection ---
const detectActor = (userAgentString = '') => {
  const botPatterns = [/bot/i, /spider/i, /crawl/i, /headless/i];
  const isBot = botPatterns.some(pattern => pattern.test(userAgentString));
  return { isBot, actorType: isBot ? 'BOT' : 'HUMAN' };
};

// --- Middleware: Authentication ---
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// --- API Endpoints ---

// Registration
app.post('/api/auth/register', async (req, res) => {
  const { email, password, full_name } = req.body;
  const password_hash = await bcrypt.hash(password, 12);
  
  // DB Operation: INSERT INTO users ...
  const newUser = { id: 'uuid', email, full_name };
  res.status(201).json(newUser);
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const userAgent = req.get('User-Agent');
  const { isBot, actorType } = detectActor(userAgent);

  // DB Operation: SELECT * FROM users WHERE email = ...
  // Match password with bcrypt.compare(password, user.password_hash)

  const token = jwt.sign({ id: 'user-id', email }, JWT_SECRET, { expiresIn: '1h' });

  // DB Operation: Log Activity and Create Session
  console.log(`Log: LOGIN action by ${actorType} from ${req.ip}`);

  res.json({ token, user: { email, is_bot: isBot } });
});

// Activity Tracking
app.post('/api/activity/track', authMiddleware, async (req, res) => {
  const { action_type, action_detail } = req.body;
  const { actorType } = detectActor(req.get('User-Agent'));

  // DB Operation: INSERT INTO user_activities ...
  res.status(201).json({ success: true, actor_type: actorType });
});

// Get My Activities
app.get('/api/activity/my', authMiddleware, async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  // DB Operation: SELECT * FROM user_activities WHERE user_id = ... LIMIT ... OFFSET ...
  res.json({ data: [], limit, offset });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`PillarX Backend running on port ${PORT}`));