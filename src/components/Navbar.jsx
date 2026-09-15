import { NavLink } from 'react-router-dom';
import { Wifi, Book, Video, Shield, User } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const links = [
    { to: '/', label: 'Beranda', icon: Wifi },
    { to: '/referensi', label: 'Referensi', icon: Video },
    { to: '/materi', label: 'Materi', icon: Book },
    { to: '/soal', label: 'Soal', icon: Shield },
    { to: '/pembuat', label: 'Pembuat', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary-600 text-white rounded-lg">
              <Wifi size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              WirelessEdu
            </span>
          </div>
          
          <div className="hidden md:flex space-x-1 items-center">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </div>
          
          {/* Mobile menu button could go here */}
        </div>
      </div>
    </nav>
  );
}
