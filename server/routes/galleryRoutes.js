import express from 'express';
import { 
  getAllGalleryImages, 
  uploadGalleryImage, 
  uploadMultipleImages,
  deleteGalleryImage,
  getHeroImages
} from '../controllers/galleryController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllGalleryImages);
router.get('/hero', getHeroImages);

// Protected routes (admin only)
router.post('/upload', authMiddleware, upload.single('image'), uploadGalleryImage);
router.post('/upload-multiple', authMiddleware, upload.array('images', 10), uploadMultipleImages);
router.delete('/:id', authMiddleware, deleteGalleryImage);

export default router;
