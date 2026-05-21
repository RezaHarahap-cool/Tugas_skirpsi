import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import JurusanPage from './pages/public/JurusanPage';
// Import halaman lain jika sudah dibuat:
// import Login from './pages/auth/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute root "/" langsung memanggil Home */}
        <Route path="/" element={<Home />} />
        <Route path="/jurusan" element={<JurusanPage />} />
        
        {/* Rute lainnya nanti taruh di bawah sini */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}