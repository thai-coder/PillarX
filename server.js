/**
 * PillarX Senior Backend System (Node.js/Express)
 * Implements authentication, activity tracking, and bot detection.
 */
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Environment Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'pillarx-secure-secret-2025';
const PORT = process.env.PORT || 3000;

// --- 1. Bot vs Human Detection Service ---
/**
 * Simple yet effective detection service.
 * In a real-world scenario, this would integrate with a service like reCAPTCHA Enterprise
 * or analyze behavioral patterns (request frequency, JS execution capabilities).
 */
const detectActor = (userAgentString = '') => {
  const botPatterns = [
    /bot/i, /spider/i, /crawl/i, /slurp/i, /googlebot/i, 
    /bingbot/i, /headless/i, /selenium/i, /puppeteer/i,
    /postman/i, /curl/i, /wget/i
  ];

  const isBot = botPatterns.some(pattern => pattern.test(userAgentString));
  
  return {
    isBot,
    actorType: isBot ? 'BOT' : 'HUMAN'
  };
};

// --- 2. Security Middleware ---
/**
 * Validates JWT from Authorization header and attaches user to the request context.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user payload (id, email)
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// --- 3. Mock Database (In-memory for demonstration) ---
// In production, these calls would interact with a database driver using the schema.sql structure.
const users = [];
const sessions = [];
const activities = [];

// --- 4. API Endpoints ---

/**
 * POST /api/auth/register
 * Register a new user with secure password hashing.
 */
app.post('/api/auth/register', async (req, res) => {
  const { email, password, full_name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already registered.' });
  }

  // Hash password using bcrypt with cost factor 12
  const password_hash = await bcrypt.hash(password, 12);
  const newUser = {
    id: `u_${Date.now()}`,
    email,
    password_hash,
    full_name,
    created_at: new Date().toISOString()
  };

  users.push(newUser);

  // Return sanitized user object
  const { password_hash: _, ...userResponse } = newUser;
  res.status(201).json(userResponse);
});

/**
 * POST /api/auth/login
 * Validates credentials, detects actor type, and initializes session.
 */
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const userAgent = req.get('User-Agent') || 'Unknown';
  const { isBot, actorType } = detectActor(userAgent);

  // Generate Token (1 hour expiry)
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  // Store Session Meta
  const newSession = {
    id: `s_${Date.now()}`,
    user_id: user.id,
    token,
    user_agent: userAgent,
    ip_address: req.ip,
    is_bot: isBot,
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 3600000).toISOString()
  };
  sessions.push(newSession);

  // Log Login Activity
  activities.push({
    id: `a_${Date.now()}`,
    user_id: user.id,
    action_type: 'LOGIN',
    action_detail: { client: actorType, platform: 'Web' },
    ip_address: req.ip,
    user_agent: userAgent,
    actor_type: actorType,
    created_at: new Date().toISOString()
  });

  res.json({ token, user: { email: user.email, full_name: user.full_name, is_bot: isBot } });
});

/**
 * POST /api/auth/logout
 * Invalidates current user session and logs activity.
 */
app.post('/api/auth/logout', authMiddleware, (req, res) => {
  const index = sessions.findIndex(s => s.user_id === req.user.id);
  if (index !== -1) sessions.splice(index, 1);

  activities.push({
    id: `a_${Date.now()}`,
    user_id: req.user.id,
    action_type: 'LOGOUT',
    ip_address: req.ip,
    actor_type: detectActor(req.get('User-Agent')).actorType,
    created_at: new Date().toISOString()
  });

  res.json({ message: 'Successfully logged out.' });
});

/**
 * GET /api/me
 * Returns the current authenticated user profile.
 */
app.get('/api/me', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found.' });

  const { password_hash: _, ...userResponse } = user;
  res.json(userResponse);
});

/**
 * POST /api/activity/track
 * Logs custom user actions with bot detection.
 */
app.post('/api/activity/track', (req, res) => {
  const { action_type, action_detail, user_id } = req.body;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const { actorType } = detectActor(userAgent);

  const newActivity = {
    id: `a_${Date.now()}`,
    user_id: user_id || null, // Allow anonymous activity tracking
    action_type: action_type || 'GENERAL',
    action_detail,
    ip_address: req.ip,
    user_agent: userAgent,
    actor_type: actorType,
    created_at: new Date().toISOString()
  };

  activities.push(newActivity);
  res.status(201).json(newActivity);
});

/**
 * GET /api/activity/my
 * Returns a paginated history of activities for the logged-in user.
 */
app.get('/api/activity/my', authMiddleware, (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;

  const userActivities = activities
    .filter(a => a.user_id === req.user.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(offset, offset + limit);

  res.json({
    data: userActivities,
    pagination: {
      limit,
      offset,
      total: activities.filter(a => a.user_id === req.user.id).length
    }
  });
});

// --- 5. Start Server ---
app.listen(PORT, () => {
  console.log(`
  🚀 PillarX Backend Active
  --------------------------
  Port: ${PORT}
  Environment: Production-ready Mock
  DB Driver: In-memory (Schema: schema.sql)
  JWT Security: Active (HS256)
  Detection System: Bot/Human Active
  `);
});