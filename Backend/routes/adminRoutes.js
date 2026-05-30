import express from 'express';
// Tambahkan getAllAdmins di import ini
import { createAdmin, getAllAdmins } from '../controllers/adminController.js'; 
import upload from '../middlewares/upload.js';

const router = express.Router();

// Route untuk MENAMBAH data (Method: POST)
router.post('/', upload.single('foto'), createAdmin);

// Route untuk MENAMPILKAN data (Method: GET)
router.get('/', getAllAdmins);

export default router;