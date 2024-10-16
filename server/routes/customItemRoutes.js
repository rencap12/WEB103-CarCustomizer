import express from 'express';
import { getCustomItems, addCustomItem, updateCustomItem, deleteCustomItem } from '../controllers/customItemController.js';

const router = express.Router();

// Define routes
router.get('/custom-items', getCustomItems);
router.post('/custom-items', addCustomItem);
router.put('/custom-items/:id', updateCustomItem);
router.delete('/custom-items/:id', deleteCustomItem);

export default router;
