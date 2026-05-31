import express from 'express';
import { createGuru, getAllGurus, updateGuru, deleteGuru } from '../controllers/guruController.js';
import upload from '../middlewares/upload.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Semua rute di bawah ini wajib Login sebagai Admin
router.post('/', verifyToken, isAdmin, upload.single('foto'), createGuru);
router.get('/', verifyToken, isAdmin, getAllGurus);
router.put('/:id', verifyToken, isAdmin, upload.single('foto'), updateGuru);
router.delete('/:id', verifyToken, isAdmin, deleteGuru);

export default router;