import { Link } from 'react-router-dom';
import { Wifi } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Wifi className="text-primary-600" size={24} />
          <span className="font-semibold text-slate-900">Media Pembelajaran Interaktif — Jaringan Nirkabel</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <Link to="/referensi" className="hover:text-primary-600 transition-colors">Referensi</Link>
          <Link to="/materi" className="hover:text-primary-600 transition-colors">Materi</Link>
          <Link to="/soal" className="hover:text-primary-600 transition-colors">Soal</Link>
          <Link to="/pembuat" className="hover:text-primary-600 transition-colors">Pembuat</Link>
        </div>
      </div>
    </footer>
  );
}
