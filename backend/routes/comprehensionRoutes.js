import express from 'express';
import { getComprehensions, createComprehension } from '../controllers/comprehensionController.js';

const router = express.Router();

// Routes for Comprehension
router.get('/', getComprehensions);
router.post('/', createComprehension);

export default router;
