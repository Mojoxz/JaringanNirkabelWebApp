export const videos = [
  {
    id: 1,
    title: 'Standar IEEE 802.11 & Evolusi Frekuensi Wi-Fi (a/b/g/n/ac/ax)',
    description:
      'Penjelasan visual mengenai cara kerja spektrum frekuensi radio 2.4 GHz, 5 GHz, dan 6 GHz serta perbandingan throughput tiap generasi standar IEEE 802.11.',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    embedUrl: 'https://www.youtube.com/embed/uzed3u766gI',
    watchUrl: 'https://www.youtube.com/watch?v=uzed3u766gI',
    duration: '08:19',
    category: 'Standar IEEE',
    relatedChapter: '01',
    keyPoints: [
      'Perbedaan lebar pita 2.4 GHz (jangkauan jauh) dan 5 GHz (kapasitas tinggi).',
      'Peran MIMO dan OFDMA dalam menjaga efisiensi paket pada jaringan padat.',
      'Kompatibilitas mundur antar perangkat 802.11b/g/n/ac/ax.',
    ],
  },
  {
    id: 2,
    title: 'Perbedaan Wireless Access Point, Router, Repeater & Mesh',
    description:
      'Bedah arsitektur perangkat keras jaringan nirkabel dari sisi fungsi bridge, routing NAT/DHCP, hingga manajemen terpusat untuk skala enterprise.',
    thumbnail: 'https://images.unsplash.com/photo-1516044734145-07ca8eef8731?auto=format&fit=crop&q=80&w=800',
    embedUrl: 'https://www.youtube.com/embed/OxiY4YF6GGg',
    watchUrl: 'https://www.youtube.com/watch?v=OxiY4YF6GGg',
    duration: '07:45',
    category: 'Perangkat & Topologi',
    relatedChapter: '05',
    keyPoints: [
      'Access Point bekerja pada Layer 2 sebagai jembatan LAN kabel ke WLAN.',
      'Wireless Router menggabungkan gateway NAT, DHCP server, switch, dan AP.',
      'Penerapan Power over Ethernet (PoE) untuk instalasi AP di langit-langit atau tower.',
    ],
  },
  {
    id: 3,
    title: 'Pola Radiasi Antena, Gain (dBi) & Desain Link Point-to-Point',
    description:
      'Visualisasi rambatan gelombang elektromagnetik pada antena Omnidirectional, Sectoral, Yagi, dan Parabolic Dish beserta perhitungan Line of Sight.',
    thumbnail: 'https://images.unsplash.com/photo-1590433333434-09df2b2a35a5?auto=format&fit=crop&q=80&w=800',
    embedUrl: 'https://www.youtube.com/embed/Ax7ef8ff1BM',
    watchUrl: 'https://www.youtube.com/watch?v=Ax7ef8ff1BM',
    duration: '10:12',
    category: 'Antena & Propagasi',
    relatedChapter: '02',
    keyPoints: [
      'Hubungan terbalik antara besarnya Gain (dBi) dan lebar sudut pancaran (beamwidth).',
      'Pentingnya menjaga minimal 60% radius Fresnel Zone pertama bebas halangan.',
      'Pemilihan antena Sectoral untuk Base Station PTMP dan Parabolic untuk Backhaul PTP.',
    ],
  },
  {
    id: 4,
    title: 'Protokol Keamanan Nirkabel: WEP, WPA, WPA2 & WPA3 (SAE)',
    description:
      'Analisis enkripsi jaringan nirkabel dari kerentanan RC4 pada WEP, standar AES-CCMP pada WPA2, hingga perlindungan Simultaneous Authentication of Equals pada WPA3.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    embedUrl: 'https://www.youtube.com/embed/k2w7ab37a7k',
    watchUrl: 'https://www.youtube.com/watch?v=k2w7ab37a7k',
    duration: '06:52',
    category: 'Keamanan Nirkabel',
    relatedChapter: '06',
    keyPoints: [
      'Mengapa WEP dan WPS PIN wajib dinonaktifkan pada seluruh akses poin.',
      'Perbedaan WPA2-Personal (Pre-Shared Key) dan WPA2-Enterprise (RADIUS 802.1X).',
      'Mitigasi serangan Evil Twin dan Deauthentication menggunakan 802.11w (PMF) dan WPA3.',
    ],
  },
];
