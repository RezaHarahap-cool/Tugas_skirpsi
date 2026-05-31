import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginActor = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "Username atau Email tidak terdaftar!" });
    }

    if (!user.is_active) {
      return res.status(403).json({ success: false, message: "Akun ini sedang dinonaktifkan." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Password yang dimasukkan salah!" });
    }

    const payload = {
      id_users: user.id_users,
      role: user.role
    };

    // PERUBAHAN DI SINI: Kita panggil process.env.JWT_SECRET
    // Kalau di .env tidak terbaca, dia akan pakai 'fallback_secret' agar aplikasi tidak mati
    const secretKey = process.env.JWT_SECRET || 'fallback_secret';
    const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });

    res.status(200).json({
      success: true,
      message: "Login berhasil!",
      data: {
        id_users: user.id_users,
        username: user.username,
        email: user.email,
        role: user.role,
        token: token
      }
    });

  } catch (error) {
    console.error("Error saat login:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan pada server." });
  }
};