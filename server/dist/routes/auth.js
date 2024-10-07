"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUserQuery = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING *;
    `;
        const result = await db_1.default.query(newUserQuery, [username, hashedPassword]);
        res.status(201).json({ user: result.rows[0] });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
