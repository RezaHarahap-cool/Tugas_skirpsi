import React from "react";
import { useState } from "react";
import ModalEditProfilGuru from "../components/ModalEditProfilGuru";
import { 
  Menu, User, Phone, GraduationCap, 
  CalendarDays, BookOpen, Edit3, Camera, HandHeart
} from "lucide-react";

// 1. Tipe Data Profil Guru (Diselaraskan dengan tabel guru_profiles di gambar)
interface GuruProfile {
  id_guru: number;
  users_id: number;
  nama_guru: string;
  tgl_lahir: string; // Di DB TIMESTAMP, kita format ke string untuk display
  gender: "Wanita" | "Pria";
  agama: string;
  pendidikan_tertinggi: string;
  no_hp: string;
  foto: string | null;
  mapel_id: number;
  // Tambahan dummy untuk display UI (biasanya didapat dari JOIN tabel mapel)
  nama_mapel: string; 
}

// 2. Data Dummy (Anggap saja ini data yang di-fetch dari API/PostgreSQL)
const dataGuruDummy: GuruProfile = {
  id_guru: 101,
  users_id: 5,
  nama_guru: "Reza Yuda Pratama, S.Kom.",
  tgl_lahir: "1998-05-14",
  gender: "Pria",
  agama: "Kristen",
  pendidikan_tertinggi: "S1 Teknik Informatika",
  no_hp: "0812-3456-7890",
  foto: null, // Dibuat null agar menampilkan avatar default
  mapel_id: 3,
  nama_mapel: "Pemrograman Web & Perangkat Bergerak"
};

export default function ProfilGuruContent({ onMenuClick }: { onMenuClick: () => void }) {

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  // Fungsi untuk format tanggal YYYY-MM-DD ke format lokal
  const formatTanggal = (tanggal: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(tanggal).toLocaleDateString('id-ID', options);
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-[#f4f7fb] p-6 md:p-10">
      
      {/* Header Content */}
      <div className="flex items-center gap-4 mb-8">
        <button className="lg:hidden p-2 bg-white rounded-lg shadow-sm cursor-pointer" onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Pengaturan Akun,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">Profil Guru</h2>
        </div>
      </div>

      {/* Kontainer Utama - Split Layout */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl">
        
        {/* ======================================================== */}
        {/* KOLOM KIRI: KARTU PROFIL UTAMA                           */}
        {/* ======================================================== */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
            
            {/* Banner Background */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
            
            <div className="px-6 pb-8 flex flex-col items-center text-center -mt-16">
              
              {/* Foto Profil dengan Tombol Ganti Foto */}
              <div className="relative group">
                <div className="w-32 h-32 bg-white rounded-full p-1.5 shadow-md">
                  {dataGuruDummy.foto ? (
                    <img 
                      src={dataGuruDummy.foto} 
                      alt={dataGuruDummy.nama_guru} 
                      className="w-full h-full rounded-full object-cover bg-gray-100"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200 border-dashed">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                {/* Tombol Overlay Kamera (Muncul saat di-hover) */}
                <button className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors cursor-pointer border-2 border-white">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Info Utama */}
              <h3 className="mt-4 text-xl font-extrabold text-gray-900 leading-tight">
                {dataGuruDummy.nama_guru}
              </h3>
              <p className="text-sm font-semibold text-blue-600 mt-1 flex items-center justify-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Guru Mapel
              </p>

              {/* Badge Mapel */}
              <div className="mt-5 w-full bg-blue-50 border border-blue-100 rounded-xl p-3">
                <p className="text-xs text-blue-500 font-bold uppercase tracking-wider mb-1">Mengampu</p>
                <p className="text-sm font-semibold text-blue-800">{dataGuruDummy.nama_mapel}</p>
              </div>

              {/* Tombol Aksi */}
              <button onClick={() => setIsModalEditOpen(true)} className="w-full mt-6 flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer">
                <Edit3 className="w-4 h-4" /> Edit Profil
              </button>

            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* KOLOM KANAN: DETAIL INFORMASI (GRID)                     */}
        {/* ======================================================== */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 h-full">
            
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-lg font-extrabold text-black">Informasi Pribadi</h3>
              <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full">Status: Aktif</span>
            </div>

            {/* Grid Informasi Pribadi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              
              {/* Item: Tanggal Lahir */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" /> Tanggal Lahir
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatTanggal(dataGuruDummy.tgl_lahir)}
                </p>
              </div>

              {/* Item: Gender */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Jenis Kelamin
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {dataGuruDummy.gender}
                </p>
              </div>

              {/* Item: Agama */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <HandHeart className="w-3.5 h-3.5" /> {/* Placeholder biar sejajar */}
                  Agama
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {dataGuruDummy.agama}
                </p>
              </div>

              {/* Item: Pendidikan Tertinggi */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Pendidikan Tertinggi
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {dataGuruDummy.pendidikan_tertinggi}
                </p>
              </div>

              {/* Item: No HP */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Nomor WhatsApp / HP
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {dataGuruDummy.no_hp}
                </p>
              </div>

            </div>

            {/* Catatan Keamanan Akun */}
            <div className="mt-10 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h4 className="text-sm font-bold text-gray-800 mb-1">Keamanan Akun</h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                Email dan kata sandi Anda diatur melalui sistem manajemen pengguna (Users ID: {dataGuruDummy.users_id}). Hubungi admin IT sekolah jika ingin melakukan perubahan kredensial login.
              </p>
            </div>

          </div>
        </div>

      </div>
      <ModalEditProfilGuru 
        isOpen={isModalEditOpen} 
        guruData={dataGuruDummy} 
        onClose={() => setIsModalEditOpen(false)} 
      />
    </main>
  );
}