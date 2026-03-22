import express from 'express';
import { loginAdmin, createAdmin, verifyToken } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);
router.post('/create-admin', createAdmin); // Remove in production or protect

// Protected routes
router.get('/verify', authMiddleware, verifyToken);

export default router;
