import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

// Tipe Data Roster
interface RosterItem {
  id: string;
  sesi: number;
  jamMulai: string;
  jamSelesai: string;
  mapel: string;
  guru: string;
  hari: string;
  kelas: string;
  jurusan: string;
}

interface ModalEditRosterProps {
  roster: RosterItem | null;
  onClose: () => void;
}

export default function ModalEditRoster({ roster, onClose }: ModalEditRosterProps) {
  // State lokal untuk menampung data yang sedang diedit
  const [formData, setFormData] = useState<RosterItem | null>(null);

  // Otomatis isi form dengan data roster yang diklik
  useEffect(() => {
    if (roster) {
      setFormData(roster);
    }
  }, [roster]);

  // Jika tidak ada data yang dipilih, jangan tampilkan apa-apa
  if (!roster || !formData) return null;

  // Fungsi untuk mendeteksi ketikan di input/select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Roster yang di-update:", formData);
    // Logika API untuk UPDATE ke database PostgreSQL ditaruh di sini nanti
    onClose(); // Tutup modal setelah berhasil simpan
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Kotak Form Modal (Responsif & Scrollable) */}
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 animate-fade-in z-10 custom-scrollbar">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-black">Edit Data Roster</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Target Kelas & Jurusan */}
          <div className="">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Penempatan Kelas</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Kelas</label>
                <select 
                  name="kelas"
                  value={formData.kelas}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white cursor-pointer"
                >
                  <option value="X">Kelas X</option>
                  <option value="XI">Kelas XI</option>
                  <option value="XII">Kelas XII</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Jurusan</label>
                <select 
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white cursor-pointer"
                >
                  <option value="PPLG">PPLG</option>
                  <option value="TJKT">TJKT</option>
                  <option value="AKL">AKL</option>
                  <option value="OTKP">OTKP</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Waktu Pelaksanaan */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Hari</label>
                <select 
                  name="hari"
                  value={formData.hari}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white cursor-pointer"
                >
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                  <option value="Sabtu">Sabtu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Sesi Ke-</label>
                <input 
                  type="number" 
                  name="sesi"
                  value={formData.sesi}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Jam Mulai</label>
                <input 
                  type="time" 
                  name="jamMulai"
                  value={formData.jamMulai}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm cursor-pointer" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Jam Selesai</label>
                <input 
                  type="time" 
                  name="jamSelesai"
                  value={formData.jamSelesai}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm cursor-pointer" 
                />
              </div>
            </div>
          </div>

          {/* Section 3: Mata Pelajaran & Guru */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Mata Pelajaran</label>
              <select 
                name="mapel"
                value={formData.mapel}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white cursor-pointer"
              >
                <option value="Matematika">Matematika</option>
                <option value="Bhs. Indonesia">Bahasa Indonesia</option>
                <option value="Agama Kristen">Agama Kristen</option>
                <option value="Akuntansi">Akuntansi</option>
                <option value="Pemrograman Web">Pemrograman Web</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Guru Pengampu</label>
              <select 
                name="guru"
                value={formData.guru}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white cursor-pointer"
              >
                <option value="Guru A">Guru A</option>
                <option value="Guru B">Guru B</option>
                <option value="Guru C">Guru C</option>
                <option value="Guru D">Guru D</option>
                <option value="Guru E">Guru E</option>
                <option value="Reza Yuda">Reza Yuda</option>
              </select>
            </div>
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
              className="px-5 py-2 rounded-lg font-semibold bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer text-sm shadow-sm"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}