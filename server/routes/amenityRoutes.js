import express from 'express';
import { 
  getAllAmenities, 
  createAmenity, 
  updateAmenity, 
  deleteAmenity 
} from '../controllers/amenityController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllAmenities);

// Protected routes (admin only)
router.post('/', authMiddleware, upload.single('image'), createAmenity);
router.put('/:id', authMiddleware, upload.single('image'), updateAmenity);
router.delete('/:id', authMiddleware, deleteAmenity);

export default router;
