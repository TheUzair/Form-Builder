import express from 'express';
import { getComprehensions, createComprehension, bulkSaveComprehensions } from '../controllers/comprehensionController.js';

const router = express.Router();

// Routes for Comprehension
router.get('/', getComprehensions);
router.post('/', createComprehension);
router.post('/bulk-save', bulkSaveComprehensions);

export default router;
