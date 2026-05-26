import React from "react";
import { 
  Menu, User, Phone, CalendarDays, 
  MapPin, Users, CreditCard, School, 
  Camera, Edit3, CheckCircle, GraduationCap
} from "lucide-react";

// 1. Tipe Data Profil Siswa (Berdasarkan Field Database)
interface ProfilSiswa {
  id_siswa: number;
  users_id: number;
  npsn: string;
  nis: string;
  nisn: string;
  foto: string | null;
  nama_siswa: string;
  gender: "Pria" | "Wanita";
  tempat_tgl_lahir: string; // Format: "Tempat, DD-MM-YYYY"
  kelas_id: number;
  nama_kelas: string; // Hasil JOIN dengan tabel kelas
  nama_ayah: string;
  pekerjaan_ayah: string;
  nama_ibu: string;
  pekerjaan_ibu: string;
  alamat: string;
  desa_kelurahan: string;
  kecamatan: string;
  kabupaten_kota: string;
  provinsi: string;
  no_hp_wali: string;
  status_siswa: "Aktif" | "Lulus" | "Pindah" | "Keluar";
  tahun_lulus: string | null;
}

// 2. Data Dummy
const dataSiswaDummy: ProfilSiswa = {
  id_siswa: 2024001,
  users_id: 120,
  npsn: "10254321",
  nis: "24251001",
  nisn: "0061234567",
  foto: null,
  nama_siswa: "Reza Yuda Pratama",
  gender: "Pria",
  tempat_tgl_lahir: "Medan, 14 Mei 2005",
  kelas_id: 12,
  nama_kelas: "XII PPLG 1",
  nama_ayah: "Budi Harahap",
  pekerjaan_ayah: "Wiraswasta",
  nama_ibu: "Siti Aminah",
  pekerjaan_ibu: "Ibu Rumah Tangga",
  alamat: "Jl. Pendidikan No. 45, Komplek Asri",
  desa_kelurahan: "Teladan Timur",
  kecamatan: "Medan Kota",
  kabupaten_kota: "Kota Medan",
  provinsi: "Sumatera Utara",
  no_hp_wali: "0812-9876-5432",
  status_siswa: "Aktif",
  tahun_lulus: null,
};

export default function ProfilSiswaContent({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <main className="flex-1 h-screen overflow-y-auto bg-[#f4f7fb] p-6 md:p-10 custom-scrollbar">
      
      {/* Header Content */}
      <div className="flex items-center gap-4 mb-8">
        <button className="lg:hidden p-2 bg-white rounded-lg shadow-sm cursor-pointer" onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Pengaturan Akun,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">Profil Siswa</h2>
        </div>
      </div>

      {/* Kontainer Utama - Split Layout */}
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 max-w-7xl pb-20">
        
        {/* ======================================================== */}
        {/* KOLOM KIRI: KARTU PROFIL UTAMA (STICKY)                  */}
        {/* ======================================================== */}
        <div className="w-full xl:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden xl:sticky xl:top-10">
            
            {/* Banner Background Emerald */}
            <div className="h-36 bg-gradient-to-r from-teal-500 to-emerald-600"></div>
            
            <div className="px-6 pb-8 flex flex-col items-center text-center -mt-16">
              
              {/* Foto Profil dengan Tombol Kamera */}
              <div className="relative group">
                <div className="w-32 h-32 bg-white rounded-full p-1.5 shadow-md">
                  {dataSiswaDummy.foto ? (
                    <img 
                      src={dataSiswaDummy.foto} 
                      alt={dataSiswaDummy.nama_siswa} 
                      className="w-full h-full rounded-full object-cover bg-gray-100"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center border-2 border-gray-200 border-dashed">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <button className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors cursor-pointer border-2 border-white">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Info Utama */}
              <h3 className="mt-4 text-xl font-extrabold text-gray-900 leading-tight">
                {dataSiswaDummy.nama_siswa}
              </h3>
              
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> {dataSiswaDummy.status_siswa}
                </span>
                <span className="text-sm font-semibold text-gray-500 flex items-center gap-1">
                  <School className="w-4 h-4" /> {dataSiswaDummy.nama_kelas}
                </span>
              </div>

              {/* Box NISN & NIS */}
              <div className="mt-6 w-full bg-gray-50 border border-gray-200 rounded-xl p-4 flex divide-x divide-gray-200">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">NISN</p>
                  <p className="text-sm font-extrabold text-gray-900">{dataSiswaDummy.nisn}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">NIS</p>
                  <p className="text-sm font-extrabold text-gray-900">{dataSiswaDummy.nis}</p>
                </div>
              </div>

              {/* Tombol Aksi */}
              <button className="w-full mt-6 flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer">
                <Edit3 className="w-4 h-4" /> Edit Profil
              </button>

            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* KOLOM KANAN: DETAIL INFORMASI LENGKAP                    */}
        {/* ======================================================== */}
        <div className="w-full xl:w-2/3 space-y-6">
          
          {/* SECTION 1: Akademik & Pribadi */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-extrabold text-black mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
              <User className="w-5 h-5 text-teal-600" /> Data Akademik & Pribadi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tempat, Tanggal Lahir</p>
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-gray-400" /> {dataSiswaDummy.tempat_tgl_lahir}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Jenis Kelamin</p>
                <p className="text-sm font-semibold text-gray-900">{dataSiswaDummy.gender}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">NPSN Sekolah</p>
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-400" /> {dataSiswaDummy.npsn}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tahun Lulus</p>
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-400" /> {dataSiswaDummy.tahun_lulus ? dataSiswaDummy.tahun_lulus : "Belum Lulus"}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2: Data Orang Tua / Wali */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-extrabold text-black mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-600" /> Data Orang Tua & Wali
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nama Ayah</p>
                <p className="text-sm font-semibold text-gray-900">{dataSiswaDummy.nama_ayah}</p>
                <p className="text-xs text-gray-500 mt-1">Pekerjaan: {dataSiswaDummy.pekerjaan_ayah}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nama Ibu</p>
                <p className="text-sm font-semibold text-gray-900">{dataSiswaDummy.nama_ibu}</p>
                <p className="text-xs text-gray-500 mt-1">Pekerjaan: {dataSiswaDummy.pekerjaan_ibu}</p>
              </div>
              <div className="sm:col-span-2 bg-blue-50 p-4 rounded-xl border border-blue-100 mt-2">
                <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">Nomor HP / WhatsApp Wali</p>
                <p className="text-sm font-extrabold text-blue-900 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {dataSiswaDummy.no_hp_wali}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: Alamat Lengkap */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h3 className="text-lg font-extrabold text-black mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-600" /> Alamat Tempat Tinggal
            </h3>
            
            <div className="mb-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Alamat Jalan</p>
              <p className="text-sm font-semibold text-gray-900 leading-relaxed">{dataSiswaDummy.alamat}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Desa / Kelurahan</p>
                <p className="text-sm font-semibold text-gray-900">{dataSiswaDummy.desa_kelurahan}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Kecamatan</p>
                <p className="text-sm font-semibold text-gray-900">{dataSiswaDummy.kecamatan}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Kabupaten / Kota</p>
                <p className="text-sm font-semibold text-gray-900">{dataSiswaDummy.kabupaten_kota}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Provinsi</p>
                <p className="text-sm font-semibold text-gray-900">{dataSiswaDummy.provinsi}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}