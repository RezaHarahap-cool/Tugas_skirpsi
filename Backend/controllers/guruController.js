import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import fs from 'fs';

// ==========================================
// 1. TAMBAH GURU BARU (Oleh Admin)
// ==========================================
export const createGuru = async (req, res) => {
  try {
    // Sesuaikan penamaan variabel dengan Tabel 3.26
    const { 
      username, email, password, 
      nama_guru, tgl_lahir, gender, agama, pendidikan_tertinggi, no_hp, mapel_id 
    } = req.body;

    // Hash password guru
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Ambil nama file foto jika ada yang di-upload
    const foto = req.file ? req.file.filename : null;

    // Jalankan Database Transaction
    const newGuru = await prisma.$transaction(async (tx) => {
      // 1. Buat data induk di tabel users
      const user = await tx.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: 'guru',
          is_active: true
        }
      });

      // 2. Buat data profil di tabel guru_profiles
      const profile = await tx.guruProfile.create({
        data: {
          users_id: user.id_users,
          nama_guru,
          // Ubah string "YYYY-MM-DD" dari form-data menjadi format Date ISO Prisma
          tgl_lahir: new Date(tgl_lahir), 
          gender, // Pastikan inputnya persis "Wanita" atau "Pria" sesuai ENUM
          agama,
          pendidikan_tertinggi,
          no_hp,
          foto,
          // Ubah string angka dari form-data menjadi Integer
          mapel_id: parseInt(mapel_id) 
        }
      });

      return { user, profile };
    });

    res.status(201).json({
      success: true,
      message: `Guru baru atas nama ${newGuru.profile.nama_guru} berhasil didaftarkan!`,
      data: {
        id_users: newGuru.user.id_users,
        username: newGuru.user.username,
        nama_guru: newGuru.profile.nama_guru,
        role: newGuru.user.role
      }
    });

  } catch (error) {
    // Jika gagal, hapus foto yang telanjur masuk folder uploads
    if (req.file) {
      fs.unlinkSync(`./uploads/${req.file.filename}`);
    }

    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: "Pendaftaran gagal. Username atau Email sudah terdaftar!"
      });
    }

    console.error("Error create guru:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server saat menambah data guru." });
  }
};

// ==========================================
// 2. TAMPILKAN SEMUA GURU
// ==========================================
export const getAllGurus = async (req, res) => {
  try {
    const gurus = await prisma.user.findMany({
      where: { role: 'guru' },
      select: {
        id_users: true,
        username: true,
        email: true,
        is_active: true,
        guru: { // Sesuaikan nama relasi ini dengan schema.prisma milikmu (bisa jadi guruProfile)
          select: {
            nama_guru: true,
            tgl_lahir: true,
            gender: true,
            agama: true,
            pendidikan_tertinggi: true,
            no_hp: true,
            foto: true,
            mapel_id: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Data seluruh guru berhasil ditarik!",
      data: gurus
    });

  } catch (error) {
    console.error("Error get all gurus:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server saat mengambil data." });
  }
};

// ==========================================
// 3. UPDATE DATA GURU (Oleh Admin)
// ==========================================
export const updateGuru = async (req, res) => {
  try {
    // 1. Ambil ID guru yang mau diubah dari URL
    const { id } = req.params;

    // 2. Ambil data dari body (form-data)
    const { 
      username, email, password, is_active,
      nama_guru, tgl_lahir, gender, agama, pendidikan_tertinggi, no_hp, mapel_id 
    } = req.body;

    // 3. Cari data guru lama untuk memastikan akun ada dan mengecek foto
    const guruLama = await prisma.user.findUnique({
      where: { id_users: id },
      include: { guru: true } // Sesuaikan dengan nama relasi di Prisma-mu
    });

    if (!guruLama) {
      // Jika upload foto baru tapi akun tidak ketemu, hapus fotonya biar tidak jadi sampah
      if (req.file) fs.unlinkSync(`./uploads/${req.file.filename}`);
      return res.status(404).json({ success: false, message: "Data guru tidak ditemukan!" });
    }

    // 4. Siapkan penampung data untuk di-update
    let dataUser = { username, email };
    let dataProfile = { nama_guru, gender, agama, pendidikan_tertinggi, no_hp };

    // Parsing is_active jika dikirim (karena dari form-data bentuknya string)
    if (is_active !== undefined) {
      dataUser.is_active = is_active === 'true' || is_active === true;
    }

    // Jika password diisi (ingin diganti), lakukan hashing
    if (password && password.trim() !== "") {
      const saltRounds = 10;
      dataUser.password = await bcrypt.hash(password, saltRounds);
    }

    // Parsing format khusus untuk PostgreSQL
    if (tgl_lahir) dataProfile.tgl_lahir = new Date(tgl_lahir);
    if (mapel_id) dataProfile.mapel_id = parseInt(mapel_id);

    // 5. Logika penggantian foto
    if (req.file) {
      dataProfile.foto = req.file.filename;

      // Bersihkan foto lama dari folder uploads
      if (guruLama.guru?.foto) {
        const pathFotoLama = `./uploads/${guruLama.guru.foto}`;
        if (fs.existsSync(pathFotoLama)) {
          fs.unlinkSync(pathFotoLama);
        }
      }
    }

    // 6. Eksekusi Update dengan Transaksi
    const result = await prisma.$transaction(async (tx) => {
      const userUpdated = await tx.user.update({
        where: { id_users: id },
        data: dataUser
      });

      const profileUpdated = await tx.guruProfile.update({
        where: { users_id: id },
        data: dataProfile
      });

      return { userUpdated, profileUpdated };
    });

    res.status(200).json({
      success: true,
      message: `Data guru atas nama ${result.profileUpdated.nama_guru} berhasil diperbarui!`,
      data: {
        id_users: result.userUpdated.id_users,
        username: result.userUserUpdated?.username || result.userUpdated.username,
        nama_guru: result.profileUpdated.nama_guru
      }
    });

  } catch (error) {
    if (req.file) {
      fs.unlinkSync(`./uploads/${req.file.filename}`);
    }

    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: "Update gagal. Username atau Email sudah terpakai oleh akun lain!"
      });
    }

    console.error("Error update guru:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server saat update data guru." });
  }
};

// ==========================================
// 4. HAPUS DATA GURU (Oleh Admin)
// ==========================================
export const deleteGuru = async (req, res) => {
  try {
    // 1. Ambil ID target dari URL parameter (:id)
    const { id } = req.params;

    // 2. Cari data guru yang mau dihapus beserta relasi profilnya
    // Sesuaikan 'guru' dengan nama relasi di schema.prisma milikmu
    const guruTarget = await prisma.user.findUnique({
      where: { id_users: id },
      include: { guru: true } 
    });

    // 3. Validasi: Apakah datanya ada?
    if (!guruTarget) {
      return res.status(404).json({ success: false, message: "Data guru tidak ditemukan!" });
    }

    // 4. Validasi Keamanan: Pastikan yang dihapus benar-benar Guru
    if (guruTarget.role !== 'guru') {
      return res.status(403).json({ 
        success: false, 
        message: "Akses ditolak! ID yang dimasukkan bukan milik entitas Guru." 
      });
    }

    // 5. Hapus file fisik foto di folder 'uploads' jika ada
    if (guruTarget.guru?.foto) {
      const pathFoto = `./uploads/${guruTarget.guru.foto}`;
      if (fs.existsSync(pathFoto)) {
        fs.unlinkSync(pathFoto); // Sapu bersih dari harddisk
      }
    }

    // 6. Eksekusi penghapusan di database menggunakan Transaksi
    await prisma.$transaction(async (tx) => {
      // Hapus data di tabel anak (guru_profiles) terlebih dahulu
      await tx.guruProfile.delete({
        where: { users_id: id }
      });

      // Hapus data di tabel induk (users)
      await tx.user.delete({
        where: { id_users: id }
      });
    });

    res.status(200).json({
      success: true,
      message: `Akun guru atas nama ${guruTarget.guru?.nama_guru || guruTarget.username} telah dihapus permanen dari sistem!`
    });

  } catch (error) {
    console.error("Gagal menghapus guru:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server saat menghapus data." });
  }
};