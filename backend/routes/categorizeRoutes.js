import express from 'express';
import { getCategorizes, createCategorize, bulkSaveCategorizes } from '../controllers/categorizeController.js';

const router = express.Router();

router.get('/', getCategorizes);
router.post('/', createCategorize);
router.post('/bulk-save', bulkSaveCategorizes);

export default router;
