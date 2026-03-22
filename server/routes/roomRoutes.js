import express from 'express';
import { 
  getAllRooms, 
  getRoomById, 
  createRoom, 
  updateRoom, 
  deleteRoom 
} from '../controllers/roomController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllRooms);
router.get('/:id', getRoomById);

// Protected routes (admin only)
router.post('/', authMiddleware, upload.single('image'), createRoom);
router.put('/:id', authMiddleware, upload.single('image'), updateRoom);
router.delete('/:id', authMiddleware, deleteRoom);

export default router;
