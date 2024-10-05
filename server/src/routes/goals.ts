import { Router, Request, Response } from 'express';
import pool from '../db'; 

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const goalsQuery = `SELECT * FROM goals;`;
    const result = await pool.query(goalsQuery);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
