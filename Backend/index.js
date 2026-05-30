import express from 'express';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Persiapan untuk path statis di sistem ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// PENTING: Buka akses folder 'uploads' agar bisa diakses lewat URL
// Contoh: http://localhost:3000/uploads/1715423...-foto.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server backend sudah menyala di http://localhost:${PORT}`);
});