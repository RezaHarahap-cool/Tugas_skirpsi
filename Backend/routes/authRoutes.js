import express from 'express';
import { loginActor } from '../controllers/authController.js';

const router = express.Router();

// Endpoint untuk login: POST /api/auth/login
router.post('/login', loginActor);

export default router;