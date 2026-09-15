import { Link } from 'react-router-dom';
import { Wifi, Book, Video, Shield, ChevronRight, PlayCircle } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { materials } from '../data/materials';
import { motion } from 'framer-motion';

export default function Home() {
  const { completedMaterials, lastVisitedChapter } = useProgress();
  const progressPercentage = Math.round((completedMaterials.length / materials.length) * 100);

  const features = [
    { title: "Materi Interaktif", icon: Book, color: "text-blue-600", bg: "bg-blue-50", to: "/materi" },
    { title: "Topologi & Antena", icon: Wifi, color: "text-primary-600", bg: "bg-primary-50", to: "/materi" },
    { title: "Video Referensi", icon: Video, color: "text-purple-600", bg: "bg-purple-50", to: "/referensi" },
    { title: "Soal Evaluasi", icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50", to: "/soal" }
  ];

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-12 md:pt-20">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex justify-center mb-8"
        >
          <div className="p-5 bg-primary-100/50 backdrop-blur-sm text-primary-600 rounded-3xl shadow-sm border border-primary-100">
            <Wifi size={56} strokeWidth={2.5} />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight"
        >
          Jelajahi Dunia <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
            Jaringan Nirkabel
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          Belajar memahami teknologi wireless network melalui pengalaman visual dan interaktif yang menyenangkan.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/materi"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Mulai Belajar Sekarang
            <ChevronRight size={20} />
          </Link>
          <Link
            to="/referensi"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-full font-bold hover:border-slate-300 hover:bg-slate-50 transition-all"
          >
            <PlayCircle size={20} className="text-slate-500" />
            Tonton Video
          </Link>
        </motion.div>
      </section>

      {/* Progress Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 w-full space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">Progress Belajar Anda</h3>
            <p className="text-slate-600">Lanjutkan materi terakhir yang Anda pelajari.</p>
            
            <div className="pt-2 space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-700">
                <span>{completedMaterials.length} dari {materials.length} Materi</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden inset-shadow-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
          
          <div className="shrink-0 w-full md:w-auto">
             <Link
                to="/materi"
                className="w-full flex items-center justify-center gap-2 bg-primary-50 text-primary-700 px-8 py-4 rounded-2xl font-bold hover:bg-primary-100 transition-colors"
              >
                Lanjutkan Chapter {lastVisitedChapter}
                <ChevronRight size={20} />
              </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto pb-24 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Yang Akan Kamu Pelajari</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Materi disusun secara sistematis agar mudah dipahami.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={feature.to} className="block group">
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all h-full flex flex-col items-center text-center">
                    <div className={`p-4 ${feature.bg} ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <div className="mt-auto pt-6 text-sm font-bold text-slate-400 group-hover:text-primary-600 transition-colors flex items-center gap-1">
                      Lihat Detail <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
