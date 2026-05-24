import React, { useState, useEffect } from "react";
import { X, UploadCloud } from "lucide-react";

// Tipe Data Siswa
interface SiswaItem {
  id: string;
  nis: string;
  nama: string;
  jk: "L" | "P";
  kelas: string;
  jurusan: string;
  namaAyah: string;
  noHpWali: string;
  foto: string;
}

interface ModalEditSiswaProps {
  siswa: SiswaItem | null;
  onClose: () => void;
}

export default function ModalEditSiswa({ siswa, onClose }: ModalEditSiswaProps) {
  // State lokal untuk menampung data yang sedang diedit
  const [formData, setFormData] = useState<SiswaItem | null>(null);

  // Otomatis isi form dengan data siswa yang diklik
  useEffect(() => {
    if (siswa) {
      setFormData(siswa);
    }
  }, [siswa]);

  // Jika tidak ada data yang dipilih, jangan tampilkan apa-apa
  if (!siswa || !formData) return null;

  // Fungsi untuk mendeteksi ketikan di input/select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Siswa yang di-update:", formData);
    // Logika API untuk UPDATE ke database ditaruh di sini nanti
    onClose(); // Tutup modal setelah berhasil simpan
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Kotak Form Modal (Responsif Scroll HP) */}
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 animate-fade-in z-10 custom-scrollbar">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-black">Edit Data Siswa</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Area Upload Foto */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Foto Siswa</label>
            <div className="w-full border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-xl p-4 flex items-center gap-4 text-gray-600 hover:border-blue-400 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Ganti Foto Profil</p>
                <p className="text-xs text-gray-500 mt-0.5">Klik untuk memilih file baru (Max 2MB)</p>
              </div>
            </div>
          </div>

          {/* Baris 1: NIS & Nama */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">NIS</label>
              <input 
                type="text" 
                name="nis"
                value={formData.nis}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-gray-50 cursor-not-allowed" 
                readOnly // NIS biasanya tidak boleh diubah sembarangan
                title="NIS tidak dapat diubah"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm" 
              />
            </div>
          </div>
          
          {/* Baris 2: Jenis Kelamin & Kelas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Jenis Kelamin</label>
              <select 
                name="jk"
                value={formData.jk}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
              >
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Kelas</label>
              <select 
                name="kelas"
                value={formData.kelas}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
              >
                <option value="X">X</option>
                <option value="XI">XI</option>
                <option value="XII">XII</option>
              </select>
            </div>
          </div>

          {/* Baris 3: Jurusan & Nama Ayah */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Jurusan</label>
              <select 
                name="jurusan"
                value={formData.jurusan}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
              >
                <option value="PPLG">Pengembangan Perangkat Lunak dan Gim</option>
                <option value="TJKT">Teknik Jaringan Komputer dan Telekomunikasi</option>
                <option value="AKL">Akuntansi dan Keuangan Lembaga</option>
                <option value="OTKP">Otomatisasi Tata Kelola Perkantoran</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nama Ayah (Wali)</label>
              <input 
                type="text" 
                name="namaAyah"
                value={formData.namaAyah}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm" 
              />
            </div>
          </div>

          {/* Baris 4: No HP Wali */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nomor Handphone Wali</label>
            <input 
              type="text" 
              name="noHpWali"
              value={formData.noHpWali}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm" 
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
            <button 
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer text-sm"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer text-sm shadow-sm"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}