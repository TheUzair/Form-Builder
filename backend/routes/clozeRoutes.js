import express from 'express';
import { getClozes, createCloze, bulkSaveClozes } from '../controllers/clozeController.js';

const router = express.Router();

router.get('/', getClozes);
router.post('/', createCloze);
router.post('/bulk-save', bulkSaveClozes);

export default router;
