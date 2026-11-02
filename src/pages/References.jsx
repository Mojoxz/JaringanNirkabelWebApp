import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { videos } from '../data/videos';
import { PlayCircle, ExternalLink, BookOpen, CheckCircle2, Film } from 'lucide-react';
import InteractiveCard from '../components/InteractiveCard';
import Modal from '../components/Modal';
import clsx from 'clsx';

export default function References() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeVideo, setActiveVideo] = useState(null);

  const categories = useMemo(
    () => ['Semua', ...new Set(videos.map((v) => v.category))],
    []
  );

  const filteredVideos = useMemo(() => {
    if (selectedCategory === 'Semua') return videos;
    return videos.filter((v) => v.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider font-bold text-primary-600 dark:text-primary-400">
            Pustaka Multimedia RF
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
            Referensi Video &amp; Demonstrasi Teknis
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Kurasi materi visual mengenai propagasi gelombang, pola radiasi antena, arsitektur WISP, dan protokol keamanan IEEE 802.11.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                'px-3.5 py-2 rounded-xl text-xs font-bold transition-colors',
                selectedCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVideos.map((video, idx) => (
          <InteractiveCard key={video.id} delay={idx * 0.08} className="flex flex-col">
            <button
              type="button"
              onClick={() => setActiveVideo(video)}
              aria-label={`Putar pratinjau video ${video.title}`}
              className="relative group aspect-video w-full bg-slate-950 overflow-hidden text-left block"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                width="640"
                height="360"
                loading="lazy"
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-center justify-center">
                <div className="w-14 h-14 bg-primary-600/90 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <PlayCircle size={32} />
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-sky-300 px-2.5 py-1 rounded-md text-xs font-mono font-bold border border-slate-700">
                {video.category}
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white px-2.5 py-1 rounded-md text-xs font-bold font-mono">
                {video.duration}
              </div>
            </button>

            <div className="p-6 flex-1 flex flex-col space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-2">
                  {video.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {video.description}
                </p>
              </div>

              {video.keyPoints && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 space-y-1.5">
                  <p className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                    Poin Inti Pembelajaran:
                  </p>
                  <ul className="space-y-1">
                    {video.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 size={13} className="text-primary-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 mt-auto flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  className="flex-1 inline-flex justify-center items-center gap-1.5 py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  <Film size={14} /> Putar di Aplikasi
                </button>
                <a
                  href={video.watchUrl || video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex justify-center items-center gap-1.5 py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors"
                >
                  YouTube <ExternalLink size={13} />
                </a>
                {video.relatedChapter && (
                  <Link
                    to="/materi"
                    className="inline-flex justify-center items-center gap-1 py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-primary-600 dark:text-primary-400 text-xs font-bold rounded-xl transition-colors"
                    title={`Buka Bab ${video.relatedChapter}`}
                  >
                    <BookOpen size={13} /> Bab {video.relatedChapter}
                  </Link>
                )}
              </div>
            </div>
          </InteractiveCard>
        ))}
      </div>

      <Modal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.title}
      >
        {activeVideo && (
          <div className="space-y-4">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <iframe
                src={activeVideo.url}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeVideo.description}
            </p>
            <div className="flex justify-end">
              <a
                href={activeVideo.watchUrl || activeVideo.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline"
              >
                Buka langsung di YouTube <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
