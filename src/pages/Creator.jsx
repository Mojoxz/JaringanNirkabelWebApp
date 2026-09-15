import { images } from '../data/images';
import { Mail, Code, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Creator() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden"
      >
        <div className="h-48 bg-gradient-to-r from-primary-600 to-purple-600 w-full relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        </div>
        
        <div className="px-8 pb-12">
          <div className="relative -mt-24 mb-8 flex justify-center">
            <div className="p-2 bg-white rounded-full">
              <img 
                src={images.profile} 
                alt="Profile Pembuat" 
                className="w-40 h-40 object-cover rounded-full shadow-lg"
              />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Nama Pengembang</h1>
            <p className="text-lg text-primary-600 font-bold tracking-wide">Pendidikan Teknik Informatika</p>
            <p className="text-slate-500 font-medium">Universitas ...</p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Tentang Project Ini</h2>
              <p className="text-slate-600 leading-relaxed">
                Aplikasi media pembelajaran interaktif ini dikembangkan sebagai bagian dari tugas akhir/skripsi untuk membantu siswa memahami materi jaringan nirkabel (Wireless Network) secara lebih mudah melalui visualisasi, simulasi sederhana, dan interaksi yang menyenangkan.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors">
                <Code size={20} />
                GitHub
              </a>
              <a href="#" className="flex items-center gap-2 px-6 py-3 bg-primary-50 text-primary-700 rounded-xl font-medium hover:bg-primary-100 transition-colors">
                <Globe size={20} />
                Website
              </a>
              <a href="#" className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-700 rounded-xl font-medium hover:bg-red-100 transition-colors">
                <Mail size={20} />
                Email
              </a>
            </div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}
