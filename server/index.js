"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5007;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Database connection
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: 'postgres',
});
// User model
class User extends sequelize_1.Model {
}
User.init({
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
});
// Goal model
class Goal extends sequelize_1.Model {
}
Goal.init({
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    deadline: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Reference to User model
            key: 'id', // Reference to User model's primary key
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
// Authentication middleware
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: 'No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
// Signup route
const signupHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const existingUser = yield User.findOne({ where: { username } });
        if (existingUser) {
            res.status(400).json({ error: 'Username already exists' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield User.create({ username, password: hashedPassword });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User created successfully', token });
    }
    catch (error) {
        next(error);
    }
});
// Login route
const loginHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User.findOne({ where: { username } });
        if (!user) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    }
    catch (error) {
        next(error);
    }
});
// Get goals route
const getGoalsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const goals = yield Goal.findAll({ where: { userId } });
        res.json(goals);
    }
    catch (error) {
        next(error);
    }
});
// Add goal route
const addGoalHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { description, deadline } = req.body;
        const goal = yield Goal.create({ description, userId, deadline });
        res.status(201).json(Object.assign(Object.assign({}, goal.toJSON()), { startTime: goal.createdAt }));
    }
    catch (error) {
        next(error);
    }
});
// Delete goal route
const deleteGoalHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const goalId = parseInt(req.params.id);
        const goal = yield Goal.findOne({ where: { id: goalId, userId } });
        if (!goal) {
            res.status(404).json({ error: 'Goal not found' });
            return;
        }
        yield goal.destroy();
        res.json({ message: 'Goal deleted successfully' });
    }
    catch (error) {
        next(error);
    }
});
// Edit goal route
const editGoalHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const goalId = parseInt(req.params.id);
        const { description } = req.body;
        const goal = yield Goal.findOne({ where: { id: goalId, userId } });
        if (!goal) {
            res.status(404).json({ error: 'Goal not found' });
            return;
        }
        goal.description = description;
        yield goal.save();
        res.json(goal);
    }
    catch (error) {
        next(error);
    }
});
// Complete goal route
const toggleGoalCompletion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const goalId = parseInt(req.params.id);
        const goal = yield Goal.findOne({ where: { id: goalId, userId } });
        if (!goal) {
            res.status(404).json({ error: 'Goal not found' });
            return;
        }
        goal.completed = !goal.completed;
        yield goal.save();
        res.json(goal);
    }
    catch (error) {
        next(error);
    }
});
// Routes
app.post('/api/auth/signup', signupHandler);
app.post('/api/auth/login', loginHandler);
app.get('/api/goals', authenticate, getGoalsHandler);
app.post('/api/goals', authenticate, addGoalHandler);
app.delete('/api/goals/:id', authenticate, deleteGoalHandler);
app.put('/api/goals/:id', authenticate, editGoalHandler);
app.patch('/api/goals/:id', authenticate, toggleGoalCompletion);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
