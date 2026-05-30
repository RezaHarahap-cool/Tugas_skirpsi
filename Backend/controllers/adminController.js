import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';

export const createAdmin = async (req, res) => {
  try {
    // 1. Ambil data teks mentah dari body request
    const { username, password, email, nama_admin, jenis_kelamin, no_hp } = req.body;

    const saltRounds = 10; // Menentukan tingkat kerumitan acakan (10 adalah standar aman)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const fotoName = req.file ? req.file.filename : null;

    // 3. Masukkan ke database menggunakan Transaction
    const result = await prisma.$transaction(async (tx) => {
      
      const userBaru = await tx.user.create({
        data: {
          username: username,
          password: hashedPassword, 
          email: email,
          role: 'admin',
          is_active: true,
        },
      });

      const adminBaru = await tx.adminProfile.create({
        data: {
          users_id: userBaru.id_users,
          nama_admin: nama_admin,
          jenis_kelamin: jenis_kelamin,
          no_hp: no_hp,
          foto: fotoName, // Masukkan nama file yang di-generate multer ke database
        },
      });

      return { userBaru, adminBaru };
    });

    // 4. Kirim respon sukses
    res.status(201).json({
      success: true,
      message: "Data Users dan Admin beserta foto berhasil disimpan!",
      data: {
        id_users: result.userBaru.id_users,
        username: result.userBaru.username,
        nama_admin: result.adminBaru.nama_admin,
        foto: result.adminBaru.foto // Menampilkan nama file yang tersimpan
      }
    });

  } catch (error) {
    if (error.code === 'P2002') {
      // Menangkap field apa yang duplikat (bisa email atau username)
      const fieldYangKembar = error.meta.target[0]; 
      
      return res.status(400).json({
        success: false,
        message: `Gagal mendaftar. ${fieldYangKembar} tersebut sudah digunakan! Silakan gunakan ${fieldYangKembar} lain.`
      });
    }
    console.error("Gagal insert data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getAllAdmins = async (req, res) => {
  try {
    // Mengambil semua data dengan role 'admin'
    const admins = await prisma.user.findMany({
      where: {
        role: 'admin',
      },
      // Menggunakan 'select' untuk memilih field apa saja yang mau ditampilkan,
      // sekaligus melakukan JOIN ke tabel 'admin_profiles'.
      // Perhatikan: kita TIDAK menuliskan 'password' di sini agar aman!
      select: {
        id_users: true,
        username: true,
        email: true,
        is_active: true,
        created_at: true,
        
        // Ini cara Prisma melakukan JOIN (One-to-One)
        admin: {
          select: {
            nama_admin: true,
            jenis_kelamin: true,
            no_hp: true,
            foto: true,
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Data seluruh admin berhasil ditarik!",
      data: admins
    });

  } catch (error) {
    console.error("Gagal mengambil data:", error);
    res.status(500).json({ 
      success: false, 
      message: "Terjadi kesalahan server saat mengambil data." 
    });
  }
};