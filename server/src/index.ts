import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Sequelize, DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5007;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!, 
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10),
    dialect: 'postgres',
  }
);

// User model
class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
});

// Goal model
class Goal extends Model {
  [x: string]: any;
  public id!: number;
  public description!: string;
  public userId!: number;
  public completed!: boolean;
}

Goal.init({
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Reference to User model
      key: 'id',   // Reference to User model's primary key
    },
  },
}, {
  sequelize,
  modelName: 'Goal',
});

// Associations
User.hasMany(Goal, { foreignKey: 'userId' }); 
Goal.belongsTo(User, { foreignKey: 'userId' }); 

// Sync database
sequelize.sync({ alter: true }).then(() => { 
  console.log('Database synced');
});

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 

// Define route handler type
type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

// Authentication middleware
const authenticate: express.RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Signup route
const signupHandler: RouteHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      res.status(400).json({ error: 'Username already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    next(error);
  }
};

// Login route
const loginHandler: RouteHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};

// Get goals route
const getGoalsHandler: RouteHandler = async (req, res, next) => {
  try {
    const userId = (req as any).userId;
    const goals = await Goal.findAll({ where: { userId } });
    res.json(goals);
  } catch (error) {
    next(error);
  }
};

// Add goal route
const addGoalHandler: RouteHandler = async (req, res, next) => {
  try {
    const userId = (req as any).userId;
    const { description, deadline } = req.body;
    const goal = await Goal.create({ description, userId, deadline });
    res.status(201).json({
      ...goal.toJSON(),
      startTime: goal.createdAt
    });
  } catch (error) {
    next(error);
  }
};

// Delete goal route
const deleteGoalHandler: RouteHandler = async (req, res, next) => {
  try {
    const userId = (req as any).userId;
    const goalId = parseInt(req.params.id);
    const goal = await Goal.findOne({ where: { id: goalId, userId } });
    if (!goal) {
      res.status(404).json({ error: 'Goal not found' });
      return;
    }
    await goal.destroy();
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Edit goal route
const editGoalHandler: RouteHandler = async (req, res, next) => {
  try {
    const userId = (req as any).userId;
    const goalId = parseInt(req.params.id);
    const { description } = req.body;
    const goal = await Goal.findOne({ where: { id: goalId, userId } });
    if (!goal) {
      res.status(404).json({ error: 'Goal not found' });
      return;
    }
    goal.description = description;
    await goal.save();
    res.json(goal);
  } catch (error) {
    next(error);
  }
};

// Complete goal route
const toggleGoalCompletion: RouteHandler = async (req, res, next) => {
  try {
    const userId = (req as any).userId;
    const goalId = parseInt(req.params.id);
    const goal = await Goal.findOne({ where: { id: goalId, userId } });
    if (!goal) {
      res.status(404).json({ error: 'Goal not found' });
      return;
    }
    goal.completed = !goal.completed;
    await goal.save();
    res.json(goal);
  } catch (error) {
    next(error);
  }
};

// Routes
app.post('/api/auth/signup', signupHandler);
app.post('/api/auth/login', loginHandler);
app.get('/api/goals', authenticate, getGoalsHandler);
app.post('/api/goals', authenticate, addGoalHandler);
app.delete('/api/goals/:id', authenticate, deleteGoalHandler);
app.put('/api/goals/:id', authenticate, editGoalHandler);
app.patch('/api/goals/:id', authenticate, toggleGoalCompletion);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});