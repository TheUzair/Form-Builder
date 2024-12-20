import express from 'express';
import { getCategorizes, createCategorize } from '../controllers/categorizeController.js';

const router = express.Router();

// Routes for Categorize
router.get('/', getCategorizes);
router.post('/', createCategorize);

export default router;
