import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import JurusanPage from './pages/public/JurusanPage';
import Profile from './pages/public/Profile';
import Kariawan from './pages/public/Kariawan';
import Galeri from './pages/public/Galeri';
import Berita from './pages/public/Berita';
import Login from './pages/auth/LoginPage';
// Import halaman lain jika sudah dibuat:
// import Login from './pages/auth/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute root "/" langsung memanggil Home */}
        <Route path="/" element={<Home />} />
        <Route path="/jurusan" element={<JurusanPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kariawan" element={<Kariawan />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/berita" element={<Berita/>} />
        <Route path="/login" element={<Login />} />
        
        {/* Rute lainnya nanti taruh di bawah sini */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}