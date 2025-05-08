import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';

const router = express.Router();

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', loginAdmin);

export default router;