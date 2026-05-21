import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import logo from "../../asset/bg_logo.png"; // Sesuaikan path logo
import gambarKiri from "../../asset/profile.jpg"; // Ganti dengan foto sekolah/siswa

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika login ditaruh di sini nanti (API Call)
    console.log("Tombol login ditekan");
  };

  return (
    // Background halaman utama (abu-abu dengan efek blur/gradasi halus)
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Dekorasi Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>

      {/* Kontainer Utama Card Login */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fade-in">
        
        {/* Kolom Kiri: Gambar (Sembunyi di HP, Tampil di Desktop) */}
        <div className="hidden md:block md:w-1/2 relative bg-gray-900 group">
          <img
            src={gambarKiri}
            alt="Kegiatan Siswa"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
          {/* Overlay teks di atas gambar (Opsional, agar tidak kosong) */}
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h2 className="text-2xl font-bold mb-2">Sistem Informasi Akademik</h2>
            <p className="text-sm text-white/80">SMK Swasta Parulian 1 Medan</p>
          </div>
        </div>

        {/* Kolom Kanan: Form Login */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white relative">
          
          {/* Header Form: Logo & Nama Sekolah */}
          <div className="flex items-center gap-3 mb-10">
            <img src={logo} alt="Logo SMK Parulian 1" className="w-10 h-10 object-contain" />
            <h1 className="text-lg sm:text-xl font-bold text-primary leading-tight">
              SMK Swasta Parulian 1 <br className="hidden sm:block" /> Medan
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary block">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="nama@gmail.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="masukkan Password"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                />
                {/* Tombol Toggle Mata */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-secondary transition-colors duration-300 shadow-lg shadow-primary/20 mt-4 cursor-pointer"
            >
              Login
            </button>
          </form>

          {/* Footer Form: Kembali & Lupa Password */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 text-sm font-bold">
            <button 
              onClick={() => navigate("/")} 
              className="flex items-center gap-1.5 text-gray-500 hover:text-primary transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Kembali
            </button>
            <Link 
              to="/lupa-password" 
              className="text-primary hover:text-secondary transition-colors"
            >
              Lupa Kata Sandi
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}