import { videos } from '../data/videos';
import { PlayCircle } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';

export default function References() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Referensi Video</h1>
        <p className="text-lg text-slate-600">
          Pelajari konsep jaringan nirkabel secara visual melalui kurasi video pembelajaran berikut.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {videos.map((video, idx) => (
          <InteractiveCard key={video.id} delay={idx * 0.1} className="flex flex-col">
            <div className="relative group cursor-pointer aspect-video bg-slate-900">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <PlayCircle size={40} className="text-white fill-white/10" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold font-mono">
                {video.duration}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2 py-1 rounded">
                  {video.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-tight">
                {video.title}
              </h3>
              <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1">
                {video.description}
              </p>
              
              {/* Optional: we can add a button to open a modal with embedded iframe, but for now we'll just link or show the card */}
              <a 
                href={video.url} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex justify-center items-center py-2.5 px-4 w-full bg-slate-100 text-slate-900 font-medium rounded-xl hover:bg-slate-200 transition-colors mt-auto"
              >
                Tonton di YouTube
              </a>
            </div>
          </InteractiveCard>
        ))}
      </div>
    </div>
  );
}
