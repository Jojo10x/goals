"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const goalsQuery = `SELECT * FROM goals;`;
        const result = await db_1.default.query(goalsQuery);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
