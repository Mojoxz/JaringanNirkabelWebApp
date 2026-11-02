import { images } from './images';

export const questions = [
  {
    id: 1,
    category: "Standar IEEE & Spektrum",
    difficulty: "Dasar",
    type: "choice",
    relatedChapter: "01",
    question: "Standar IEEE manakah yang mendefinisikan spesifikasi lapisan fisik (PHY) dan MAC untuk jaringan Wireless LAN (Wi-Fi)?",
    options: [
      "IEEE 802.3 (Ethernet)",
      "IEEE 802.11 (Wireless LAN)",
      "IEEE 802.15.4 (Low-Rate WPAN)",
      "IEEE 802.16 (WiMAX)"
    ],
    answer: 1,
    hint: "Ingat keluarga standar yang memiliki amandemen huruf seperti a, b, g, n, ac, ax, dan be.",
    explanation: "IEEE 802.11 adalah standar dasar untuk teknologi Wi-Fi yang pertama kali disahkan pada tahun 1997. IEEE 802.3 adalah Ethernet kabel, 802.15 untuk WPAN (Bluetooth/Zigbee), dan 802.16 untuk WiMAX."
  },
  {
    id: 2,
    category: "Antena & Topologi",
    difficulty: "Dasar",
    type: "choice",
    relatedChapter: "02",
    question: "Jenis antena apakah yang paling tepat dipasang di tengah ruangan kantor terbuka agar sinyal tersebar merata 360 derajat secara horizontal?",
    options: [
      "Antena Parabolic Grid (24 dBi)",
      "Antena Yagi-Uda",
      "Antena Omnidirectional Dipole",
      "Antena Sectoral 90 Derajat"
    ],
    answer: 2,
    hint: "Perhatikan pola pancaran berbentuk donat (toroidal) yang memancar ke segala arah horizontal.",
    explanation: "Antena Omnidirectional memancarkan energi RF sejauh 360 derajat pada bidang horizontal (azimuth), sehingga ideal ditempatkan di pusat ruangan atau area publik."
  },
  {
    id: 3,
    category: "Standar IEEE & Spektrum",
    difficulty: "Menengah",
    type: "choice",
    relatedChapter: "07",
    question: "Teknologi Wi-Fi manakah yang memperkenalkan modulasi OFDMA dan BSS Coloring untuk menangani kepadatan ratusan perangkat (high-density)?",
    options: [
      "Wi-Fi 4 (IEEE 802.11n)",
      "Wi-Fi 5 (IEEE 802.11ac)",
      "Wi-Fi 6 (IEEE 802.11ax)",
      "Wi-Fi Generasi Awal (IEEE 802.11b)"
    ],
    answer: 2,
    hint: "Standar ini dikenal sebagai High Efficiency Wireless (HEW) yang dirilis pada 2019.",
    explanation: "Wi-Fi 6 (802.11ax) memperkenalkan OFDMA (Orthogonal Frequency-Division Multiple Access) yang membagi kanal menjadi Resource Units (RU) kecil sehingga banyak klien dapat dilayani secara simultan dalam satu transmisi."
  },
  {
    id: 4,
    category: "Propagasi & Link Budget",
    difficulty: "Menengah",
    type: "telemetry-case",
    relatedChapter: "04",
    question: "Perhatikan hasil pengukuran link Point-to-Point 5.8 GHz berikut. Mengapa sinyal terima (RSSI) turun drastis menjadi -84 dBm meskipun jaraknya hanya 4 km?",
    telemetry: [
      { label: "Frekuensi & Jarak", value: "5.8 GHz / 4.0 km" },
      { label: "Tinggi Tower A & B", value: "12 m / 12 m" },
      { label: "Radius Zona Fresnel 1", value: "7.2 meter (Tengah Lintasan)" },
      { label: "Observasi Lapangan", value: "Pohon kelapa setinggi 10 m di titik 2 km" }
    ],
    options: [
      "Terjadi obstruksi lebih dari 40% pada Zona Fresnel pertama oleh pepohonan",
      "Frekuensi 5.8 GHz tidak mampu menempuh jarak lebih dari 2 km",
      "Kabel pigtail antena terlalu pendek",
      "SSID Access Point disetel dalam mode tersembunyi (Hidden SSID)"
    ],
    answer: 0,
    hint: "Bandingkan tinggi menara (12 m) dikurangi tinggi pohon (10 m) terhadap radius Zona Fresnel (7.2 m).",
    explanation: "Dengan tinggi menara 12 m dan pohon 10 m di tengah lintasan, ruang bebas di bawah garis pandang hanya tersisa 2 meter, sedangkan 60% radius Zona Fresnel pertama membutuhkan minimal 4.3 meter ruang bebas. Akibatnya terjadi difraksi dan redaman besar."
  },
  {
    id: 5,
    category: "Antena & Topologi",
    difficulty: "Dasar",
    type: "choice",
    relatedChapter: "03",
    question: "Arsitektur jaringan nirkabel di mana satu Base Station (Access Point sektoral) melayani puluhan pelanggan CPE secara bersamaan disebut:",
    options: [
      "Point-to-Point (PTP) Backhaul",
      "Point-to-Multipoint (PTMP)",
      "Independent Basic Service Set (Ad-Hoc)",
      "Personal Area Network (WPAN)"
    ],
    answer: 1,
    hint: "Topologi ini umum dipakai oleh WISP untuk mendistribusikan internet ke rumah-rumah pelanggan.",
    explanation: "Point-to-Multipoint (PTMP) menghubungkan satu titik pusat (Base Station) ke banyak titik akhir (CPE/Station), menghemat biaya infrastruktur menara di sisi penyedia layanan."
  },
  {
    id: 6,
    category: "Antena & Topologi",
    difficulty: "Menengah",
    type: "choice",
    relatedChapter: "02",
    image: images.antennaParabolic,
    question: "Perhatikan gambar antena di bawah ini. Karakteristik utama dan aplikasi paling tepat untuk antena tersebut adalah:",
    options: [
      "Sudut pancaran 360° untuk hotspot dalam ruangan",
      "Gain sangat tinggi (24-30 dBi) dan beamwidth sempit untuk link PTP jarak jauh",
      "Sudut pancaran 120° untuk melayani klien seluler di perkotaan",
      "Antena berdaya rendah khusus untuk sensor Bluetooth Low Energy"
    ],
    answer: 1,
    hint: "Reflektor cekung memfokuskan gelombang radio menjadi satu berkas lurus yang sangat sempit.",
    explanation: "Antena Parabolic Dish / Solid Dish memiliki gain sangat tinggi (hingga 30+ dBi) dengan sudut pancaran (beamwidth) sangat sempit (3° hingga 6°), dirancang khusus untuk tulang punggung Point-to-Point jarak jauh."
  },
  {
    id: 7,
    category: "Keamanan & Audit RF",
    difficulty: "Dasar",
    type: "choice",
    relatedChapter: "06",
    question: "Protokol keamanan Wi-Fi manakah yang menggunakan algoritma RC4 dengan Initialization Vector (IV) 24-bit sehingga kunci rahasianya dapat ditebak dalam hitungan menit?",
    options: [
      "WPA3-Personal (SAE)",
      "WPA2-Enterprise (802.1X)",
      "WEP (Wired Equivalent Privacy)",
      "WPA2-Personal (AES-CCMP)"
    ],
    answer: 2,
    hint: "Protokol generasi pertama tahun 1999 yang kini berstatus usang (deprecated).",
    explanation: "WEP menggunakan IV 24-bit yang terlalu pendek sehingga terjadi pengulangan IV setelah beberapa ribu paket. Penyerang dapat menangkap paket ARP dan memulihkan kunci secara statistik dalam waktu singkat."
  },
  {
    id: 8,
    category: "Propagasi & Link Budget",
    difficulty: "Menengah",
    type: "choice",
    relatedChapter: "04",
    question: "Mengapa pita frekuensi 2.4 GHz mampu menembus dinding beton lebih baik dibandingkan 5 GHz, namun sering mengalami penurunan throughput di area padat?",
    options: [
      "Panjang gelombang 2.4 GHz lebih besar (~12.5 cm), tetapi hanya memiliki 3 kanal non-overlapping (1, 6, 11)",
      "Pita 2.4 GHz memiliki lebar kanal 320 MHz yang terlalu lebar",
      "Pita 2.4 GHz membutuhkan izin lisensi spektrum berbayar",
      "Perangkat 2.4 GHz tidak menggunakan mekanisme CSMA/CA"
    ],
    answer: 0,
    hint: "Hubungkan panjang gelombang (lambda = c/f) dengan jumlah kanal bebas tumpang tindih di spektrum 2.4 GHz.",
    explanation: "Frekuensi lebih rendah memiliki panjang gelombang lebih besar sehingga redaman penetrasi material lebih kecil. Namun, lebar spektrum 2.4 GHz sangat terbatas dan hanya menyediakan 3 kanal bebas tumpang tindih (1, 6, 11), ditambah interferensi dari Bluetooth dan microwave."
  },
  {
    id: 9,
    category: "Keamanan & Audit RF",
    difficulty: "Lanjut",
    type: "telemetry-case",
    relatedChapter: "06",
    question: "Saat melakukan pemindaian spektrum di lobi kampus, Anda menemukan dua BSSID berbeda yang memancarkan SSID yang sama persis seperti tabel berikut. Serangan apakah yang sedang terjadi?",
    telemetry: [
      { label: "BSSID 1 (Resmi)", value: "00:1A:2B:3C:4D:5E | WPA2-Enterprise (802.1X) | Kanal 36 (-62 dBm)" },
      { label: "BSSID 2 (Mencurigakan)", value: "DE:AD:BE:EF:09:11 | Open / Captive Portal | Kanal 6 (-42 dBm)" },
      { label: "Gejala Klien", value: "Klien tiba-tiba terputus (deauth) lalu tersambung ke BSSID 2" }
    ],
    options: [
      "Serangan Evil Twin / Rogue Access Point yang dikombinasikan dengan Deauthentication",
      "Kerusakan perangkat keras pada antena sektoral kampus",
      "Proses roaming otomatis standar 802.11r yang normal",
      "Interferensi gelombang mikro dari kantin"
    ],
    answer: 0,
    hint: "Perhatikan perbedaan metode autentikasi (Enterprise vs Open) dan sinyal BSSID 2 yang sengaja dibuat lebih kuat.",
    explanation: "Penyerang menjalankan serangan Evil Twin: memancarkan SSID identik dengan daya lebih kuat (-42 dBm) tanpa enkripsi, sambil mengirim frame Deauthentication palsu agar perangkat korban berpindah ke AP palsu dan memasukkan kredensial di halaman phising."
  },
  {
    id: 10,
    category: "Propagasi & Link Budget",
    difficulty: "Menengah",
    type: "choice",
    relatedChapter: "05",
    question: "Jika sebuah radio pemancar diatur pada daya 20 dBm, menggunakan kabel koaksial dengan rugi-rugi 3 dB, dan dihubungkan ke antena sektoral 15 dBi, berapakah nilai EIRP yang dipancarkan?",
    options: [
      "38 dBm",
      "32 dBm",
      "8 dBm",
      "35 dBm"
    ],
    answer: 1,
    hint: "Gunakan rumus EIRP = Tx Power (dBm) - Cable Loss (dB) + Antenna Gain (dBi).",
    explanation: "Berdasarkan persamaan link budget: EIRP = 20 dBm (Tx) - 3 dB (rugi kabel) + 15 dBi (gain antena) = 32 dBm (setara dengan ~1.58 Watt)."
  },
  {
    id: 11,
    category: "Keamanan & Audit RF",
    difficulty: "Lanjut",
    type: "choice",
    relatedChapter: "06",
    question: "Fitur keamanan manakah pada standar WPA3 yang melindungi trafik pengguna dari penyadapan pasif sekaligus mencegah serangan kamus offline (offline dictionary attack)?",
    options: [
      "Simultaneous Authentication of Equals (SAE / Dragonfly Handshake)",
      "Temporal Key Integrity Protocol (TKIP)",
      "MAC Address Filtering pada tabel router",
      "Menonaktifkan pengiriman frame SSID Beacon"
    ],
    answer: 0,
    hint: "Mekanisme ini menggantikan 4-Way Handshake PSK klasik dengan pertukaran kunci kriptografi berbasis kurva eliptik.",
    explanation: "WPA3 menggantikan Pre-Shared Key (PSK) dengan SAE (Simultaneous Authentication of Equals) yang menghasilkan kunci sesi unik setiap koneksi (Forward Secrecy) dan mengharuskan penyerang berinteraksi aktif pada setiap tebakan sandi."
  },
  {
    id: 12,
    category: "Standar IEEE & Spektrum",
    difficulty: "Lanjut",
    type: "choice",
    relatedChapter: "08",
    question: "Dalam skenario Hidden Node Problem, dua stasiun klien tidak dapat saling mendengar sinyal satu sama lain tetapi keduanya mengirim paket ke Access Point yang sama. Mekanisme apakah yang digunakan untuk mencegah tabrakan paket tersebut?",
    options: [
      "Pertukaran frame kontrol RTS/CTS (Request to Send / Clear to Send)",
      "Meningkatkan lebar kanal dari 20 MHz menjadi 160 MHz",
      "Mengganti enkripsi dari WPA2 ke WPA3",
      "Menurunkan tinggi pemasangan antena Access Point"
    ],
    answer: 0,
    hint: "AP mengirim frame balasan yang dapat didengar oleh seluruh stasiun di dalam selnya untuk memesan durasi medium (NAV).",
    explanation: "Dengan mekanisme RTS/CTS, stasiun pengirim meminta izin ke AP melalui frame RTS. AP kemudian membalas dengan frame CTS yang didengar oleh seluruh stasiun (termasuk node yang tersembunyi), sehingga stasiun lain menunda transmisi selama durasi Network Allocation Vector (NAV)."
  }
];
