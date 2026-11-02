import { images } from './images';

export const materials = [
  {
    id: '01',
    title: 'Sejarah Jaringan Nirkabel',
    description:
      'Perjalanan panjang teknologi komunikasi nirkabel dari gelombang radio abad ke-19 hingga standar IEEE 802.11be (Wi-Fi 7) di era kini. Pilih setiap titik tahun untuk mempelajari terobosannya.',
    type: 'timeline',
    estimatedMinutes: 8,
    objectives: [
      'Memahami eksperimen awal gelombang elektromagnetik oleh Heinrich Hertz dan Guglielmo Marconi.',
      'Menjelaskan peran ALOHAnet (1971) sebagai cikal bakal protokol akses medium jaringan komputer modern.',
      'Membedakan karakteristik tiap generasi standar IEEE 802.11 dari Wi-Fi 1 (802.11b) hingga Wi-Fi 7 (802.11be).',
    ],
    keyFormula: {
      title: 'Hubungan Panjang Gelombang & Frekuensi',
      code: 'λ = c / f   (c = 3 × 10^8 m/s, f = frekuensi dalam Hz)',
      note: 'Semakin tinggi frekuensi (misal 6 GHz dibanding 2.4 GHz), semakin pendek panjang gelombang (λ), sehingga kapasitas data meningkat tetapi daya tembus tembok berkurang.',
    },
    intro:
      'Jaringan nirkabel bukanlah teknologi yang muncul secara instan. Perjalanannya dimulai dari pembuktian gelombang elektromagnetik oleh Heinrich Hertz pada akhir 1800-an dan terus berevolusi hingga mencapai kecepatan puluhan Gigabit per detik hari ini.',
    content: [
      {
        year: '1888',
        event: 'Penemuan Gelombang Radio',
        description:
          'Heinrich Hertz berhasil membuktikan keberadaan gelombang elektromagnetik secara eksperimental. Penemuannya menjadi fondasi ilmiah bagi seluruh teknologi komunikasi nirkabel. Satuan frekuensi Hertz (Hz) dinamai untuk menghormati kontribusinya.',
        detail:
          'Hertz menggunakan peralatan sederhana berupa osilator celah percikan dan antena loop detektor untuk menghasilkan serta mendeteksi gelombang radio pertama di dunia pada kisaran frekuensi 100 MHz.',
        image: images.historyMarconi,
      },
      {
        year: '1895',
        event: 'Transmisi Radio Pertama oleh Marconi',
        description:
          'Guglielmo Marconi berhasil mengirimkan sinyal kode Morse secara nirkabel sejauh 2 km di Bologna, Italia. Ia kemudian mendirikan perusahaan telegraf radio komersial pertama di dunia.',
        detail:
          'Marconi mengembangkan sistem komunikasi radio jarak jauh yang praktis. Pada tahun 1901, ia berhasil mengirimkan sinyal melintasi Samudra Atlantik dari Cornwall (Inggris) ke Newfoundland (Kanada).',
        image: images.historyWireless,
      },
      {
        year: '1971',
        event: 'ALOHAnet: Jaringan Komputer Nirkabel Pertama',
        description:
          'Universitas Hawaii mengoperasikan ALOHAnet, jaringan paket komputer nirkabel pertama di dunia. Sistem ini menghubungkan komputer di empat pulau berbeda menggunakan radio UHF.',
        detail:
          'ALOHAnet memperkenalkan protokol akses acak ALOHA yang menjadi cikal bakal CSMA/CD pada Ethernet dan CSMA/CA pada Wi-Fi modern. Jaringan ini beroperasi pada kecepatan 9.600 bps.',
        image: images.historyWireless,
      },
      {
        year: '1997',
        event: 'IEEE 802.11: Standar Wi-Fi Pertama',
        description:
          'IEEE (Institute of Electrical and Electronics Engineers) menerbitkan standar 802.11 asli yang memungkinkan transfer data nirkabel hingga 2 Mbps pada pita 2.4 GHz atau media inframerah.',
        detail:
          'Standar awal ini menggunakan modulasi DSSS (Direct Sequence Spread Spectrum) dan FHSS (Frequency Hopping Spread Spectrum). Meskipun kecepatannya terbatas, standar ini menjadi fondasi ekosistem WLAN.',
        image: images.historyWireless,
      },
      {
        year: '1999',
        event: 'Wi-Fi Alliance & 802.11b (Wi-Fi 1)',
        description:
          'Istilah Wi-Fi resmi diperkenalkan oleh Wi-Fi Alliance. Standar 802.11b hadir dengan kecepatan maksimal 11 Mbps dan menjadi standar pertama yang diadopsi secara luas di perangkat komersial.',
        detail:
          '802.11b bekerja pada pita 2.4 GHz dengan jangkauan dalam ruangan sekitar 38 meter. Karena biaya produksi chipset yang terjangkau, teknologi ini cepat terpasang pada laptop generasi awal.',
        image: images.historyWireless,
      },
      {
        year: '2002-2003',
        event: '802.11a dan 802.11g (Wi-Fi 2 & 3)',
        description:
          'Standar 802.11a menggunakan pita 5 GHz dengan modulasi OFDM hingga 54 Mbps. Menyusul kemudian 802.11g di pita 2.4 GHz dengan kecepatan 54 Mbps yang tetap kompatibel mundur dengan 802.11b.',
        detail:
          '802.11g menjadi sangat populer karena menggabungkan kecepatan OFDM 54 Mbps dengan jangkauan luas pita 2.4 GHz. Pada masa ini hotspot Wi-Fi publik mulai menjamur di bandara, kampus, dan kafe.',
        image: images.historyWireless,
      },
      {
        year: '2009',
        event: '802.11n (Wi-Fi 4): Revolusi MIMO',
        description:
          'Wi-Fi 4 memperkenalkan teknologi MIMO (Multiple-Input Multiple-Output) yang memungkinkan kecepatan teoritis hingga 600 Mbps menggunakan hingga 4 aliran spasial antena serta dukungan dual-band (2.4 GHz dan 5 GHz).',
        detail:
          'MIMO memanfaatkan beberapa antena pemancar dan penerima sekaligus serta menggandakan lebar kanal dari 20 MHz menjadi 40 MHz untuk mendongkrak kapasitas jaringan.',
        image: images.wifi6,
      },
      {
        year: '2013-2019',
        event: 'Wi-Fi 5 (802.11ac) & Wi-Fi 6 (802.11ax): Era Gigabit',
        description:
          'Wi-Fi 5 membawa kecepatan Gigabit pertama di pita 5 GHz. Wi-Fi 6 menghadirkan modulasi OFDMA dan 1024-QAM untuk efisiensi tinggi di area padat perangkat dengan kecepatan teoritis hingga 9.6 Gbps.',
        detail:
          'Wi-Fi 6 dirancang untuk skenario kepadatan tinggi seperti stadion, bandara, dan ruang kuliah. Fitur TWT (Target Wake Time) menjadwalkan waktu transmisi sehingga menghemat baterai perangkat IoT.',
        image: images.wifi6,
      },
      {
        year: '2024+',
        event: 'Wi-Fi 7 (802.11be): Ultra-High Throughput',
        description:
          'Wi-Fi 7 menghadirkan kecepatan teoritis hingga 46 Gbps menggunakan lebar kanal 320 MHz, modulasi 4096-QAM, dan fitur Multi-Link Operation (MLO) yang menggabungkan beberapa pita frekuensi sekaligus.',
        detail:
          'MLO memungkinkan perangkat mengirim dan menerima paket data melalui pita 2.4 GHz, 5 GHz, dan 6 GHz secara simultan untuk menekan latensi ke tingkat ultra-rendah.',
        image: images.wifi6,
      },
    ],
    exercise: [
      {
        type: 'fill',
        question:
          'Ilmuwan yang pertama kali membuktikan keberadaan gelombang elektromagnetik secara eksperimental pada tahun 1888 adalah _______.',
        answer: ['Heinrich Hertz', 'Hertz', 'hertz', 'heinrich hertz'],
        hint: 'Namanya diabadikan sebagai satuan frekuensi internasional (Hz).',
      },
      {
        type: 'choice',
        question: 'Pada tahun berapa istilah Wi-Fi secara resmi diperkenalkan oleh Wi-Fi Alliance?',
        options: ['1997', '1999', '2003', '2009'],
        answer: 1,
      },
      {
        type: 'fill',
        question: 'Generasi Wi-Fi 6 menggunakan kode standar IEEE _______.',
        answer: ['802.11ax', '802.11 ax'],
        hint: 'Format penulisan: 802.11xx',
      },
      {
        type: 'choice',
        question: 'Teknologi antena majemuk apa yang pertama kali diperkenalkan oleh Wi-Fi 4 (802.11n) untuk meningkatkan throughput?',
        options: ['OFDMA', 'MIMO', 'SAE', 'MLO'],
        answer: 1,
      },
    ],
  },

  {
    id: '02',
    title: 'Jenis-Jenis Antena Nirkabel',
    description:
      'Antena menentukan arah pancaran, penguatan (gain dBi), dan jangkauan sinyal radio. Eksplorasi visualisasi pola pancaran 3D dan pelajari spesifikasi tiap jenis antena.',
    type: 'cards-antenna',
    estimatedMinutes: 10,
    objectives: [
      'Membedakan pola pancaran Omnidirectional (360°) dan Directional (Sectoral, Panel, Yagi, Parabolic).',
      'Memahami hubungan antara penguatan antena (Gain dalam dBi) dengan penyempitan sudut pancar (Beamwidth).',
      'Menentukan jenis antena yang tepat untuk skenario hotspot ruangan, base station WISP, maupun backhaul antar pulau.',
    ],
    keyFormula: {
      title: 'Korelasi Gain (dBi) dan Lebar Berkas (Beamwidth)',
      code: 'Gain Tinggi (dBi ↑)  ==>  Sudut Pancar Sempit (Beamwidth ° ↓)  ==>  Jangkauan Jarak Jauh (km ↑)',
      note: 'Antena pasif tidak menciptakan energi tambahan, melainkan memfokuskan energi RF yang tadinya menyebar ke segala arah menjadi terarah ke satu koridor sempit.',
    },
    intro:
      'Dalam perancangan jaringan nirkabel, tidak ada satu jenis antena yang ideal untuk semua topologi. Pemilihan antena bergantung pada distribusi lokasi klien: apakah sinyal perlu disebarkan merata 360 derajat, atau difokuskan lurus ke satu titik sejauh puluhan kilometer.',
    content: [
      {
        name: 'Omni Directional',
        image: images.antennaOmni,
        badge: '360° Coverage',
        badgeColor: 'blue',
        description:
          'Antena omni memancarkan dan menerima sinyal secara merata ke seluruh arah horizontal (360°), menyerupai bentuk donat (toroidal) yang mengelilingi poros antena.',
        detail:
          'Antena ini ideal untuk titik akses di tengah ruangan atau menara pusat yang melayani klien dari segala penjuru. Konsekuensinya adalah gain relatif kecil karena daya tersebar ke seluruh arah.',
        characteristics: [
          'Gain: 2 sampai 12 dBi',
          'Pola pancaran: 360° Horizontal, 7° sampai 80° Vertikal',
          'Jangkauan: Pendek hingga Menengah',
          'Keunggulan: Cakupan merata tanpa perlu pengarahan sudut horizontal',
        ],
        usage: 'Access Point indoor, hotspot taman/publik, wireless router rumahan.',
        radiationPattern:
          '360° Omnidirectional: Sinyal menyebar ke seluruh arah horizontal seperti donat. Semakin tinggi gain dBi pada antena omni, semakin pipih cakupan vertikalnya demi memperluas radius horizontal.',
        example:
          'Access Point Ubiquiti UniFi yang dipasang di plafon ruang kelas menggunakan antena omni internal agar seluruh laptop mahasiswa mendapat sinyal merata.',
      },
      {
        name: 'Antena Sectoral',
        image: images.antennaSectoral,
        badge: '60° - 120°',
        badgeColor: 'purple',
        description:
          'Antena sectoral memancarkan sinyal dalam sektor sudut horizontal tertentu, umumnya 60°, 90°, atau 120°.',
        detail:
          'Penguatan (gain) antena sectoral jauh lebih tinggi dibanding omni pada sektor yang disorot. Pada menara BTS atau WISP, biasanya dipasang 3 unit antena sectoral 120° untuk menutup cakupan 360° penuh dengan kapasitas tinggi.',
        characteristics: [
          'Gain: 12 sampai 18 dBi',
          'Pola pancaran: 60° hingga 120° Horizontal',
          'Jangkauan: Menengah hingga Jauh (3 sampai 15 km)',
          'Fungsi utama: Base Station Point-to-Multipoint (PTMP)',
        ],
        usage: 'Base station WISP (Wireless ISP), menara BTS seluler, distribusi jaringan kawasan industri.',
        radiationPattern:
          'Directional berbentuk kipas sektor. Tiga sektor @120° memungkinkan pemakaian ulang kanal frekuensi (frequency reuse) dengan kapasitas klien 3 kali lebih besar dibanding satu antena omni.',
        example:
          'Tower WISP lokal memasang tiga antena sectoral MikroTik mANT 15s (120°) untuk melayani ratusan rumah pelanggan dari satu menara pusat.',
      },
      {
        name: 'Antena Panel (Flat Panel)',
        image: images.antennaPanel,
        badge: 'Directional',
        badgeColor: 'emerald',
        description:
          'Antena panel berbentuk kotak pipih dengan susunan elemen patch internal yang memancarkan sinyal terarah dengan sudut menengah.',
        detail:
          'Antena panel lebih ringkas, tahan terpaan angin, dan rapi dibanding antena Yagi atau Grid. Sangat populer digunakan sebagai perangkat penerima di sisi pelanggan (CPE) maupun link antar gedung dekat.',
        characteristics: [
          'Gain: 14 sampai 24 dBi',
          'Pola pancaran: Directional, sudut 15° hingga 60°',
          'Jangkauan: Menengah (1 sampai 10 km)',
          'Fungsi utama: Client PTMP (CPE) dan PTP jarak menengah',
        ],
        usage: 'Perangkat penerima di atap rumah pelanggan WISP (CPE), link antar gedung kampus.',
        radiationPattern:
          'Directional dengan lobi utama (main lobe) terfokus ke depan dan kebocoran sinyal belakang (back lobe) yang sangat kecil.',
        example:
          'Perangkat TP-Link CPE510 atau Ubiquiti NanoStation M5 yang dipasang di tiang atap rumah pelanggan menghadap ke tower ISP.',
      },
      {
        name: 'Antena Yagi-Uda',
        image: images.antennaYagi,
        badge: 'Narrow Beam',
        badgeColor: 'orange',
        description:
          'Antena Yagi terdiri dari satu elemen driven (dipole aktif), satu reflektor di belakang, dan deretan elemen director di bagian depan untuk memfokuskan berkas gelombang.',
        detail:
          'Semakin panjang boom dan semakin banyak elemen director di depannya, semakin tinggi gain dBi yang dihasilkan dan semakin sempit sudut pancarnya.',
        characteristics: [
          'Gain: 7 sampai 20 dBi (bergantung jumlah elemen director)',
          'Pola pancaran: Directional dengan berkas sempit',
          'Jangkauan: Menengah hingga Jauh (3 sampai 15 km)',
          'Membutuhkan pengarahan sudut (pointing) yang presisi',
        ],
        usage: 'Link Point-to-Point jarak menengah, telemetri SCADA, penguat sinyal terarah.',
        radiationPattern:
          'Directional memanjang ke depan dengan beberapa side lobe kecil. Sangat efektif menekan interferensi dari samping.',
        example:
          'Menghubungkan jaringan gedung laboratorium ke gedung rektorat yang terpisah jarak 2 km.',
      },
      {
        name: 'Antena Parabolic / Grid Dish',
        image: images.antennaParabolic,
        badge: 'High Gain',
        badgeColor: 'red',
        description:
          'Antena parabolic menggunakan reflektor cekung berbentuk parabola untuk memantulkan dan memfokuskan gelombang radio tepat ke titik fokus (feed horn).',
        detail:
          'Varian reflektor kisi-kisi (Grid) mengurangi beban terpaan angin di atas tower tinggi, sedangkan varian Solid Dish dengan radome memberikan isolasi interferensi samping terbaik untuk backhaul jarak jauh.',
        characteristics: [
          'Gain: 24 sampai 34 dBi',
          'Pola pancaran: Highly Directional, sudut sangat sempit (< 5°)',
          'Jangkauan: Sangat Jauh (10 hingga 80+ km)',
          'Wajib menggunakan penyelarasan presisi (fine alignment)',
        ],
        usage: 'Link backhaul utama antar kota, koneksi antar pulau, sambungan gunung ke gunung.',
        radiationPattern:
          'Berkas pensil (pencil beam) ultra-sempit. Pergeseran posisi 2 derajat saja akibat angin kencang dapat menurunkan level sinyal secara drastis.',
        example:
          'Ubiquiti PowerBeam / AirFiber Dish yang menghubungkan tower utama di kota dengan tower distribusi di daerah perbukitan sejauh 35 km.',
      },
      {
        name: 'Antena Dipole',
        image: images.antennaDipole,
        badge: 'Fundamental',
        badgeColor: 'slate',
        description:
          'Antena dipole adalah konstruksi antena paling dasar berupa dua elemen konduktor simetris dengan panjang total setengah panjang gelombang (λ/2).',
        detail:
          'Antena tongkat eksternal pada router Wi-Fi rumahan umumnya menggunakan desain dipole dengan penguatan standar 2.15 dBi hingga 5 dBi.',
        characteristics: [
          'Gain referensi standar: ~2.15 dBi hingga 5 dBi',
          'Pola pancaran: Omnidirectional toroidal',
          'Jangkauan: Ruangan pendek (< 50 meter)',
          'Konstruksi sederhana dan ekonomis',
        ],
        usage: 'Antena bawaan Wireless Router SOHO, adapter Wi-Fi USB/PCIe, modul Bluetooth.',
        radiationPattern:
          'Toroidal (donat): radiasi terkuat tegak lurus terhadap batang antena, dan titik buta (null) berada tepat di ujung atas dan bawah antena.',
        example:
          'Dua atau empat antena eksternal pada router TP-Link Archer atau ASUS RT di rumah.',
      },
    ],
    exercise: [
      {
        type: 'choice',
        question: 'Antena jenis apa yang memancarkan sinyal secara merata ke segala arah horizontal (360°)?',
        options: ['Antena Yagi', 'Antena Parabolic', 'Antena Omni Directional', 'Antena Sectoral'],
        answer: 2,
      },
      {
        type: 'fill',
        question: 'Antena parabolic memiliki rentang gain tertinggi di antara antena lainnya, yaitu sekitar _______ dBi.',
        answer: ['24-34', '24 - 34'],
        hint: 'Tuliskan rentang angka sesuai materi dalam format: XX-XX',
      },
      {
        type: 'choice',
        question: 'Antena sectoral (misal 120°) paling sering dipasang pada sisi Base Station untuk topologi apa?',
        options: ['PTP (Point-to-Point)', 'PTMP (Point-to-Multipoint)', 'NFC Peer-to-Peer', 'Kabel Koaksial'],
        answer: 1,
      },
      {
        type: 'fill',
        question: 'Antena Yagi dan Parabolic memiliki pola pancaran yang _______ (fokus ke satu arah tertentu).',
        answer: ['directional', 'terarah'],
        hint: 'Lawan kata dari omnidirectional',
      },
    ],
  },

  {
    id: '03',
    title: 'Topologi Pemancar: PTP & PTMP',
    description:
      'Dua arsitektur utama distribusi jaringan nirkabel luar ruang (outdoor). Putar simulasi 3D dan klik setiap perangkat untuk mempelajari aliran trafiknya.',
    type: 'diagram',
    estimatedMinutes: 9,
    objectives: [
      'Memahami arsitektur Point-to-Point (PTP) sebagai jembatan radio berdedikasi (dedicated bridge) antara dua titik.',
      'Memahami arsitektur Point-to-Multipoint (PTMP) yang menghubungkan satu Base Station ke banyak CPE pelanggan.',
      'Menghitung pembagian kapasitas bandwidth dan memilih kombinasi antena yang tepat untuk PTP maupun PTMP.',
    ],
    keyFormula: {
      title: 'Perbandingan Alokasi Throughput PTP vs PTMP',
      code: 'PTP:  Throughput Klien = 100% Kapasitas Link\nPTMP: Throughput Rata-Rata ≈ (Kapasitas Sektor AP × Efisiensi MAC) / Jumlah Klien Aktif',
      note: 'Pada jaringan PTMP, seluruh CPE dalam satu sektor berbagi waktu transmisi (airtime fairness / TDMA).',
    },
    intro:
      'Ketika membangun jaringan nirkabel jarak jauh antar gedung atau mendistribusikan akses internet ke banyak bangunan, insinyur jaringan menggunakan dua topologi dasar: Point-to-Point (PTP) untuk jalur tulang punggung (backhaul), dan Point-to-Multipoint (PTMP) untuk akses pelanggan.',
    content: {
      ptp: {
        description:
          'Point-to-Point (PTP) adalah koneksi nirkabel langsung yang mendedikasikan satu jalur radio penuh hanya untuk dua titik lokasi (Site A dan Site B).',
        detail:
          'Kedua ujung link PTP menggunakan antena directional ber-gain tinggi (seperti Parabolic Dish atau Panel) yang diarahkan saling berhadapan secara presisi. Seluruh kapasitas bandwidth dinikmati oleh link tersebut tanpa dibagi ke titik lain.',
        advantages: [
          'Bandwidth dedicated penuh dan tidak dibagi dengan stasiun lain',
          'Latensi sangat rendah dan stabil untuk trafik VoIP maupun trunk VLAN',
          'Jangkauan dapat mencapai 50+ km dengan antena Parabolic Dish dan LoS bersih',
          'Keamanan fisik sinyal lebih terjaga karena sudut berkas pancaran sangat sempit',
        ],
        usecases: [
          'Menghubungkan kantor pusat (HQ) dengan kantor cabang',
          'Jalur backhaul utama dari NOC ke menara distribusi (BTS/POP)',
          'Interkoneksi antar gedung fakultas di lingkungan kampus',
          'Jembatan jaringan melintasi sungai, lembah, atau selat antar pulau',
        ],
        image: images.ptp,
      },
      ptmp: {
        description:
          'Point-to-Multipoint (PTMP) menghubungkan satu titik pusat (Base Station Access Point) ke banyak perangkat penerima pelanggan (Client Station / CPE) sekaligus.',
        detail:
          'Base Station biasanya menggunakan antena Sectoral (60° hingga 120°) atau Omni di atas tower tinggi, sementara setiap rumah pelanggan menggunakan antena CPE directional (Panel/Dish kecil) yang diarahkan ke tower Base Station.',
        advantages: [
          'Sangat efisien untuk melayani puluhan klien dari satu menara pemancar',
          'Biaya investasi infrastruktur di sisi pusat jauh lebih hemat per pelanggan',
          'Penambahan pelanggan baru cukup memasang CPE di lokasi klien tanpa mengubah tower pusat',
          'Fondasi utama arsitektur layanan WISP (Wireless ISP) dan RT/RW-Net',
        ],
        usecases: [
          'Distribusi akses internet WISP ke perumahan atau desa',
          'Konektivitas kamera pengawas (IP CCTV) di seluruh area pelabuhan atau tambang',
          'Jaringan komunikasi sensor telemetri kawasan industri',
          'Akses jaringan nirkabel terpusat di kompleks resor atau perkebunan',
        ],
        image: images.ptmp,
      },
    },
    exercise: [
      {
        type: 'fill',
        question: 'Koneksi nirkabel langsung berdedikasi antara dua titik lokasi disebut Point-to-_______.',
        answer: ['Point', 'point'],
        hint: 'Singkatannya adalah PTP',
      },
      {
        type: 'choice',
        question: 'Dalam topologi PTMP, antena jenis apa yang paling ideal dipasang di sisi Base Station untuk melayani area 120 derajat?',
        options: ['Antena Parabolic Sempit (<3°)', 'Antena Dipole Kecil', 'Antena Sectoral', 'Tag NFC'],
        answer: 2,
      },
      {
        type: 'choice',
        question: 'Apa keunggulan utama dari topologi PTP dibandingkan PTMP?',
        options: [
          'Bisa melayani ratusan rumah dari satu radio',
          'Bandwidth bersifat dedicated (tidak dibagi dengan klien lain) dan latensi rendah',
          'Tidak membutuhkan Line of Sight sama sekali',
          'Menggunakan daya baterai koin',
        ],
        answer: 1,
      },
    ],
  },

  {
    id: '04',
    title: 'Faktor Keberhasilan Jaringan Nirkabel',
    description:
      'Keandalan link radio ditentukan oleh fisika propagasi: Line of Sight, Fresnel Zone, pemilihan frekuensi, EIRP, serta lebar kanal. Uji langsung lewat simulator 3D dan kalkulator di bawah.',
    type: 'factors',
    estimatedMinutes: 12,
    objectives: [
      'Menghitung radius Fresnel Zone pertama (F1) dan memahami syarat klirens minimal 60% bebas halangan.',
      'Menghitung daya pancar efektif EIRP (Tx Power + Gain Antena - Loss Kabel) sesuai batas regulasi.',
      'Menganalisis pengaruh frekuensi (2.4 GHz vs 5 GHz), lebar kanal (20/40/80 MHz), dan interferensi terhadap kualitas sinyal.',
    ],
    keyFormula: {
      title: 'Rumus Fresnel Zone (F1) & Perhitungan EIRP',
      code: 'F1 (meter) = 17.32 × √( d_km / (4 × f_GHz) )\nEIRP (dBm) = Tx Power (dBm) + Gain Antena (dBi) - Loss Kabel & Konektor (dB)',
      note: 'Batas maksimum regulasi EIRP outdoor di Indonesia umumnya 36 dBm (4 Watt) untuk pita 2.4 GHz dan 5.8 GHz.',
    },
    intro:
      'Membangun link nirkabel yang stabil bukan sekadar membeli radio mahal dan memasangnya di atap. Seorang teknisi harus memperhitungkan jalur pandang optik, ruang elips gelombang radio (Fresnel Zone), tingkat derau (noise floor), hingga redaman cuaca.',
    content: [
      {
        name: 'Line of Sight (LoS)',
        icon: 'Eye',
        color: 'blue',
        summary: 'Jalur pandang lurus bebas hambatan fisik antara antena pemancar dan penerima.',
        description:
          'Line of Sight (LoS) berarti terdapat garis pandang lurus tanpa halangan gedung, bukit, atau pepohonan rapat di antara dua antena yang berkomunikasi.',
        detail:
          'Pada frekuensi gelombang mikro (2.4 GHz, 5 GHz, 6 GHz), hambatan fisik di tengah jalur akan menyerap dan memantulkan energi sinyal sehingga level sinyal terima (RSSI) anjlok.',
        tips: 'Gunakan peta kontur elevasi (seperti ISPDesign, RadioMobile, atau Google Earth Elevation Profile) sebelum mendirikan tower.',
      },
      {
        name: 'Fresnel Zone',
        icon: 'Circle',
        color: 'purple',
        summary: 'Ruang tiga dimensi berbentuk elips memanjang di sekitar garis LoS.',
        description:
          'Gelombang radio tidak merambat seukuran sinar laser tipis, melainkan mengembang membentuk zona elips yang disebut Fresnel Zone di sepanjang lintasan antara pengirim dan penerima.',
        detail:
          'Aturan emas rekayasa RF mengharuskan minimal 60% dari radius Fresnel Zone pertama (F1) bebas dari halangan apa pun. Jika pucuk pohon atau atap gedung masuk ke dalam 60% zona F1, fase gelombang yang terpantul akan saling melemahkan sinyal utama (multipath cancellation).',
        tips: 'Pada link jarak 10 km di frekuensi 5.8 GHz, radius F1 di titik tengah mencapai ~11.4 meter. Tambahkan tinggi tower agar zona elips ini terangkat di atas pepohonan.',
      },
      {
        name: 'Frekuensi (2.4 GHz vs 5 GHz)',
        icon: 'Radio',
        color: 'emerald',
        summary: 'Pemilihan pita frekuensi menentukan daya tembus penghalang dan tingkat kepadatan spektrum.',
        description:
          'Pita 2.4 GHz dan 5 GHz memiliki sifat fisika propagasi yang saling melengkapi dalam jaringan WLAN.',
        detail:
          'Pita 2.4 GHz memiliki panjang gelombang sekitar 12.5 cm sehingga lebih mampu menembus tembok dan menjangkau lebih jauh, tetapi hanya menyediakan 3 kanal non-overlapping (kanal 1, 6, dan 11) sehingga sangat rawan interferensi. Pita 5 GHz memiliki panjang gelombang ~5-6 cm yang lebih cepat teredam tembok, namun menyediakan lebih dari 20 kanal bersih non-overlapping dengan kapasitas data jauh lebih besar.',
        tips: 'Gunakan pita 5 GHz untuk link outdoor PTP/PTMP dan perangkat berkecepatan tinggi di dalam ruangan; gunakan 2.4 GHz untuk perangkat IoT atau jangkauan tembus antar ruang.',
      },
      {
        name: 'Interferensi Spektrum',
        icon: 'Zap',
        color: 'orange',
        summary: 'Gangguan sinyal dari pemancar radio lain pada kanal frekuensi yang sama atau bersebelahan.',
        description:
          'Interferensi menurunkan rasio Signal-to-Noise (SNR), memicu pengiriman ulang paket (retransmission), dan meningkatkan latensi.',
        detail:
          'Terdapat tiga kategori utama: (1) Co-Channel Interference (CCI) akibat beberapa AP memakai kanal frekuensi yang sama; (2) Adjacent-Channel Interference (ACI) akibat tumpang tindih kanal yang berdekatan (misal kanal 1 dan kanal 3 di 2.4 GHz); serta (3) Non-Wi-Fi Interference dari oven microwave, Bluetooth, atau radar cuaca.',
        tips: 'Lakukan pemindaian spektrum (spectrum scan / site survey) terlebih dahulu dan di pita 2.4 GHz gunakan hanya skema kanal 1, 6, atau 11.',
      },
      {
        name: 'Ketinggian Antena & Kelengkungan Bumi',
        icon: 'TrendingUp',
        color: 'cyan',
        summary: 'Menentukan elevasi tower untuk melewati rintangan dan tonjolan kelengkungan bumi.',
        description:
          'Untuk link jarak jauh di atas 5 km, permukaan bumi yang melengkung mulai menjadi penghalang fisik di tengah lintasan.',
        detail:
          'Tinggi efektif antena harus mencakup tiga komponen sekaligus: tinggi halangan tertinggi di lintasan (gedung/pohon) + tinggi tonjolan kelengkungan bumi (earth bulge) + 60% radius Fresnel Zone pertama.',
        tips: 'Pastikan struktur tower dilengkapi kabel penahan angin (guy wire) dan penangkal petir beserta grounding.',
      },
      {
        name: 'Gain Antena & EIRP',
        icon: 'Signal',
        color: 'pink',
        summary: 'Total daya pancar efektif yang keluar dari antena pemancar.',
        description:
          'EIRP (Effective Isotropic Radiated Power) merupakan ukuran kekuatan pancaran sinyal total ke arah penguatan maksimum antena.',
        detail:
          'Rumus perhitungan: EIRP (dBm) = Daya Pancar Radio / Tx Power (dBm) + Gain Antena (dBi) - Redaman Kabel & Konektor (dB). Sebagai contoh, radio 20 dBm + antena 23 dBi - kabel loss 1 dB menghasilkan EIRP 42 dBm. Di Indonesia, regulasi membatasi EIRP pada pita ISM umumnya maksimal 36 dBm.',
        tips: 'Jika memakai antena ber-gain tinggi (misal 27 dBi), turunkan Tx Power pada konfigurasi radio (misal ke 9 dBm) agar total EIRP tetap patuh pada batas 36 dBm dan tidak menyebabkan distorsi amplifier.',
      },
      {
        name: 'Lebar Kanal (Channel Width)',
        icon: 'Layers',
        color: 'indigo',
        summary: 'Lebar pita spektrum (20, 40, 80, atau 160 MHz) yang menentukan kapasitas dan ketahanan noise.',
        description:
          'Lebar kanal dapat dianalogikan seperti jumlah lajur pada jalan tol tempat paket data melintas.',
        detail:
          'Menggandakan lebar kanal dari 20 MHz ke 40 MHz atau 80 MHz akan melipatgandakan throughput maksimal, namun juga menaikkan noise floor sebesar +3 dB setiap kali lebar kanal digandakan serta memperbesar risiko tabrakan frekuensi dengan jaringan tetangga.',
        tips: 'Gunakan kanal 20 MHz pada lingkungan padat AP untuk menjaga stabilitas SNR, dan gunakan 40 MHz atau 80 MHz hanya pada link PTP di area berspektrum bersih.',
      },
      {
        name: 'Kondisi Cuaca & Fade Margin',
        icon: 'Cloud',
        color: 'slate',
        summary: 'Pengaruh curah hujan (rain fade), angin, dan cadangan daya sinyal (fade margin).',
        description:
          'Hujan lebat, dedaunan basah, dan hembusan angin kencang memengaruhi stabilitas link nirkabel luar ruang.',
        detail:
          'Air menyerap energi gelombang mikro (terutama pada frekuensi tinggi di atas 10 GHz). Selain itu, angin kencang dapat menggeser sudut arah (alignment) antena parabola yang memiliki sudut pancar sempit.',
        tips: 'Rancang link dengan Fade Margin minimal 15 dB hingga 20 dB di atas batas sensitivitas terima minimum radio agar link tidak terputus saat hujan deras.',
      },
    ],
    exercise: [
      {
        type: 'fill',
        question: 'Jalur pandang lurus bebas hambatan fisik antara dua antena disebut _______ (singkatan 3 huruf).',
        answer: ['LoS', 'los', 'LOS', 'Line of Sight', 'line of sight'],
        hint: 'Singkatan dari Line of Sight',
      },
      {
        type: 'choice',
        question: 'Frekuensi manakah yang memiliki panjang gelombang lebih besar sehingga lebih baik dalam menembus penghalang tembok?',
        options: ['5 GHz', '6 GHz', '2.4 GHz', '60 GHz'],
        answer: 2,
      },
      {
        type: 'fill',
        question: 'Rumus perhitungan EIRP adalah: Tx Power (dBm) + Antena Gain (dBi) - _______ Loss (dB).',
        answer: ['Kabel', 'kabel', 'Cable', 'cable'],
        hint: 'Rugi-rugi pada media penghantar antara radio dan antena',
      },
      {
        type: 'choice',
        question: 'Minimal berapa persen dari radius Fresnel Zone pertama (F1) yang harus bebas dari halangan agar sinyal tidak terdegradasi?',
        options: ['20%', '40%', '60%', '95%'],
        answer: 2,
      },
    ],
  },

  {
    id: '05',
    title: 'Perangkat Keras Jaringan Nirkabel',
    description:
      'Kenali peran dan spesifikasi teknis perangkat keras ekosistem wireless: Access Point, Wireless Router, CPE, sistem PoE, hingga radio PTP.',
    type: 'equipment',
    estimatedMinutes: 9,
    objectives: [
      'Membedakan fungsi Layer 2 Access Point dengan Layer 3 Wireless Router (NAT, DHCP, Firewall).',
      'Memahami peran CPE (Customer Premises Equipment) dan Wireless Bridge pada jaringan WISP.',
      'Menghitung kebutuhan daya Power over Ethernet (PoE 802.3af/at/bt) pada instalasi kabel UTP.',
    ],
    keyFormula: {
      title: 'Standar Daya Power over Ethernet (IEEE 802.3)',
      code: '802.3af (PoE) : Maks 15.4W di port switch (~12.95W di perangkat PD)\n802.3at (PoE+): Maks 30.0W di port switch (~25.50W di perangkat PD)\n802.3bt (PoE++): Maks 60W (Type 3) hingga 90W (Type 4)',
      note: 'Panjang maksimum kabel Ethernet UTP (Cat5e/Cat6) untuk PoE dan data tanpa penguat adalah 100 meter.',
    },
    intro:
      'Infrastruktur jaringan nirkabel dibangun dari rangkaian perangkat keras yang memiliki tugas spesifik. Memahami perbedaan antara Access Point murni, Wireless Router SOHO, CPE outdoor, dan injektor PoE sangat penting agar arsitektur jaringan tidak mengalami bottleneck.',
    content: [
      {
        name: 'Access Point (AP)',
        image: images.accessPoint,
        category: 'Indoor / Outdoor',
        badge: 'Layer 2 Bridge',
        description:
          'Perangkat yang menjembatani jaringan kabel (Ethernet LAN) dengan perangkat klien nirkabel seperti laptop dan smartphone.',
        detail:
          'Access Point murni berbeda dari router: AP bekerja pada Layer 2 (Data Link) dan tidak menjalankan NAT atau DHCP server sendiri. Pada lingkungan kampus atau kantor, puluhan AP dikelola secara terpusat menggunakan Wireless LAN Controller (WLC) untuk mengatur roaming dan pembagian kanal otomatis.',
        usage: 'Gedung perkantoran, kampus, rumah sakit, hotel, dan ruang publik berkapasitas padat.',
        features: [
          'Operasi Dual-Band atau Tri-Band (2.4 / 5 / 6 GHz)',
          'Mendukung Multiple SSID dengan pemisahan VLAN (802.1Q)',
          'Manajemen terpusat via Controller atau Cloud',
          'Suplai daya praktis melalui satu kabel LAN (PoE)',
        ],
        examples: ['Ubiquiti UniFi U6 Pro', 'Cisco Catalyst 9100 AP', 'Ruckus R650', 'TP-Link Omada EAP660 HD'],
      },
      {
        name: 'Wireless Router (SOHO)',
        image: images.router,
        category: 'SOHO',
        badge: 'All-in-One',
        description:
          'Perangkat gabungan yang menyatukan fungsi Router (NAT, Firewall, DHCP), Switch Ethernet 4-port, dan Access Point Wi-Fi dalam satu unit.',
        detail:
          'Wireless Router rumahan menghubungkan jaringan lokal (LAN/WLAN) ke jaringan internet milik ISP melalui port WAN. Perangkat ini dirancang agar mudah dipasang untuk kebutuhan rumah tangga atau kantor kecil (Small Office/Home Office).',
        usage: 'Rumah tinggal, kafe kecil, ruang kerja tim kecil.',
        features: [
          'Fungsi Router + Switch + Access Point terintegrasi',
          'Layanan NAT, Firewall, dan DHCP Server bawaan',
          'Pengaturan QoS (Quality of Service) dan Parental Control',
          'Konfigurasi cepat melalui antarmuka web atau aplikasi',
        ],
        examples: ['TP-Link Archer AX55', 'ASUS RT-AX86U', 'MikroTik hAP ax2', 'Xiaomi Router AX3000T'],
      },
      {
        name: 'CPE (Customer Premises Equipment)',
        image: images.cpe,
        category: 'Outdoor Client',
        badge: 'WISP Client',
        description:
          'Perangkat radio terintegrasi antena directional yang dipasang di atap atau dinding pelanggan untuk menangkap sinyal dari tower Base Station WISP.',
        detail:
          'Unit CPE menyatukan modul radio, papan router/bridge, dan antena panel atau dish dalam satu casing tahan cuaca (weatherproof IP65). Daya listrik dan data disalurkan dari dalam rumah ke atap melalui satu kabel LAN menggunakan PoE Injector.',
        usage: 'Penerima internet pelanggan WISP perdesaan, penghubung gedung cabang ke tower pusat.',
        features: [
          'Antena directional (Panel/Dish) dan radio menyatu tanpa kabel koaksial luar',
          'Casing tahan hujan dan panas matahari (outdoor weatherproof)',
          'Mendukung mode Station Bridge maupun WISP Client Router',
          'Dilengkapi indikator LED kekuatan sinyal (RSSI) untuk memudahkan pointing',
        ],
        examples: ['Ubiquiti LiteBeam 5AC Gen2', 'TP-Link CPE610', 'MikroTik SXTsq 5 ac', 'Mimosa C5x'],
      },
      {
        name: 'Ekosistem Enterprise WLAN (UniFi / Omada)',
        image: images.ubiquiti,
        category: 'Enterprise SDN',
        badge: 'Centralized',
        description:
          'Sistem jaringan berbasis Software-Defined Networking (SDN) yang memadukan AP, switch PoE, dan gateway dalam satu dasbor pengontrol terpusat.',
        detail:
          'Melalui satu panel kontroler, administrator dapat memetakan denah gedung (heatmap), mengatur daya pancar tiap AP secara otomatis, memisahkan trafik tamu dengan karyawan via VLAN, serta menerapkan seamless roaming (802.11k/v/r).',
        usage: 'Kampus universitas, hotel bertingkat, pusat perbelanjaan, gedung pemerintahan.',
        features: [
          'Pemantauan spektrum dan klien secara real-time di satu dasbor',
          'Fast Roaming (802.11r) agar panggilan video tidak terputus saat berpindah lantai',
          'Captive Portal untuk autentikasi voucher atau login tamu',
          'Pembaruan firmware dan konfigurasi massal (zero-touch provisioning)',
        ],
        examples: ['Ubiquiti UniFi Network', 'TP-Link Omada SDN', 'Aruba Instant On', 'Cisco Meraki'],
      },
      {
        name: 'MikroTik RouterOS & Wireless',
        image: images.mikrotik,
        category: 'Core Routing & WISP',
        badge: 'Advanced OS',
        description:
          'Perangkat keras RouterBOARD dan sistem operasi RouterOS yang menjadi tulang punggung manajemen bandwidth, firewall, dan routing di banyak ISP lokal.',
        detail:
          'RouterOS menyediakan kendali penuh atas tabel routing (OSPF, BGP, MPLS), manajemen antrean trafik (Simple Queue / Queue Tree), server Hotspot, PPPoE Server, serta protokol nirkabel khusus NV2 (berbasis TDMA) untuk link luar ruang.',
        usage: 'Gateway utama WISP, manajemen jaringan kampus/sekolah, laboratorium praktik teknik jaringan.',
        features: [
          'Protokol nirkabel TDMA (NV2 / Nstreme) untuk menekan masalah hidden node',
          'Manajemen bandwidth presisi dan autentikasi Hotspot / RADIUS',
          'Konfigurasi fleksibel melalui aplikasi WinBox, WebFig, maupun CLI',
          'Dukungan penuh protokol routing dinamis dan VPN (WireGuard, IPsec, L2TP)',
        ],
        examples: ['MikroTik RB5009UG+S+IN', 'MikroTik hAP ax3', 'MikroTikCCR2004', 'MikroTik NetMetal ac2'],
      },
      {
        name: 'Outdoor CPE Seri Pharos',
        image: images.tplink,
        category: 'Outdoor WISP',
        badge: 'Cost-Effective',
        description:
          'Perangkat radio outdoor dengan antena panel terintegrasi berpolarisasi ganda (2x2 MIMO) untuk distribusi jaringan jarak menengah.',
        detail:
          'Dilengkapi teknologi TDMA (Pharos MAXtream) yang membagi slot waktu komunikasi antara Base Station dan klien sehingga throughput tidak anjlok saat jumlah klien bertambah.',
        usage: 'Jaringan komunitas, koneksi CCTV nirkabel antar pos, link gedung jarak 1 sampai 10 km.',
        features: [
          'Gain antena terintegrasi 13 dBi hingga 23 dBi',
          'Mendukung mode AP, Client, Repeater, dan AP Client Router',
          'Perangkat lunak Pharos Control untuk pemantauan terpusat',
          'Proteksi petir dan ESD terintegrasi pada port Ethernet',
        ],
        examples: ['TP-Link CPE510 (5 GHz 13 dBi)', 'TP-Link CPE610 (5 GHz 23 dBi)', 'TP-Link CPE710 (5 GHz 867 Mbps)'],
      },
      {
        name: 'PoE Injector & PoE Switch',
        image: images.poe,
        category: 'Power Infrastructure',
        badge: 'IEEE 802.3af/at',
        description:
          'Perangkat penyuplai arus listrik searah (DC) melalui pasangan kawat kabel UTP/STP Ethernet sehingga AP dan CPE di tempat tinggi tidak membutuhkan stopkontak listrik terpisah.',
        detail:
          'Terdapat dua jenis utama: Active PoE standar IEEE (802.3af 48V 15.4W, 802.3at PoE+ 30W, 802.3bt PoE++ 60-90W) yang melakukan negosiasi tegangan terlebih dahulu sehingga aman bagi perangkat non-PoE, serta Passive PoE (umumnya 24V DC) yang selalu mengalirkan tegangan secara langsung.',
        usage: 'Menyuplai daya ke Access Point plafon, radio CPE di atas tower, dan kamera IP CCTV.',
        features: [
          'Menggabungkan jalur data Gigabit dan daya listrik dalam satu tarikan kabel LAN',
          'Jarak transmisi standar hingga 100 meter tanpa penurunan performa berarti',
          'Switch PoE memungkinkan reboot perangkat AP dari jarak jauh dengan memutus daya port',
          'Wajib mencocokkan tegangan (24V Passive vs 48V 802.3af/at) agar radio tidak rusak',
        ],
        examples: ['Switch Ubiquiti UniFi PoE 16', 'TP-Link TL-SG1008MP', 'MikroTik CRS328-24P-4S+RM'],
      },
      {
        name: 'Dedicated Wireless Bridge (PTP Backhaul Radio)',
        image: images.ptpRadio,
        category: 'Backhaul Carrier',
        badge: 'High Capacity',
        description:
          'Radio gelombang mikro kelas operator yang dirancang khusus untuk jembatan Point-to-Point berkapasitas Gigabit dan latensi sub-milidetik.',
        detail:
          'Beroperasi sebagai transparent Layer 2 bridge yang meneruskan seluruh frame Ethernet beserta tag VLAN 802.1Q. Banyak seri kelas atas menyertakan sinkronisasi GPS agar beberapa radio di satu tower dapat memakai ulang frekuensi tanpa saling mengganggu.',
        usage: 'Jalur tulang punggung (backbone) antar menara BTS, koneksi cadangan serat optik.',
        features: [
          'Throughput riil 500 Mbps hingga multi-Gigabit (Full-Duplex / TDD)',
          'Sinkronisasi waktu GPS untuk efisiensi kolokasi menara',
          'Enkripsi perangkat keras AES-128 / AES-256 pada layer udara',
          'Penganalisis spektrum (real-time spectral analyzer) terpisah di dalam chip',
        ],
        examples: ['Ubiquiti airFiber 5XHD', 'Mimosa B5c', 'Cambium ePMP Force 400C', 'MikroTik Wireless Wire Dish'],
      },
    ],
    exercise: [
      {
        type: 'choice',
        question: 'Apa kepanjangan dari istilah AP dalam infrastruktur jaringan nirkabel?',
        options: ['Application Protocol', 'Access Point', 'Antenna Polarity', 'Active Packet'],
        answer: 1,
      },
      {
        type: 'fill',
        question: 'Perangkat penerima yang dipasang di atap rumah pelanggan untuk menangkap sinyal dari tower WISP disebut _______.',
        answer: ['CPE', 'cpe', 'Customer Premises Equipment'],
        hint: 'Singkatan 3 huruf: C-P-E',
      },
      {
        type: 'choice',
        question: 'Teknologi apa yang memungkinkan Access Point memperoleh suplai daya listrik melalui kabel jaringan LAN (UTP)?',
        options: ['VPN', 'VLAN', 'PoE', 'NAT'],
        answer: 2,
      },
      {
        type: 'fill',
        question: 'Wireless router yang menyatukan fungsi router, switch, dan AP dalam satu unit dirancang untuk segmen rumah dan kantor kecil yang disingkat _______.',
        answer: ['SOHO', 'soho', 'rumahan', 'home'],
        hint: 'Small Office / Home Office (4 huruf)',
      },
    ],
  },

  {
    id: '06',
    title: 'Keamanan & Kerentanan Jaringan Nirkabel',
    description:
      'Gelombang radio merambat menembus dinding ruang, sehingga siapa pun dalam radius cakupan dapat menyadap paket di udara jika tidak dienkripsi dengan benar.',
    type: 'security',
    estimatedMinutes: 11,
    objectives: [
      'Membandingkan kekuatan enkripsi protokol WEP (RC4), WPA (TKIP), WPA2 (AES-CCMP), dan WPA3 (SAE).',
      'Mengidentifikasi mekanisme serangan nirkabel: Evil Twin / Rogue AP, Deauthentication, Packet Sniffing, dan WPS PIN Attack.',
      'Merancang langkah mitigasi keamanan menggunakan WPA3, 802.11w (Protected Management Frames), dan autentikasi 802.1X RADIUS.',
    ],
    keyFormula: {
      title: 'Perbandingan Arsitektur Autentikasi & Enkripsi',
      code: 'WEP  (1999): RC4 + IV 24-bit        --> RENTAN (Dapat ditembus dalam hitungan menit)\nWPA2 (2004): AES-CCMP + 4-Way PSK   --> AMAN (Rentan kamus offline jika sandi pendek)\nWPA3 (2018): AES-GCMP + SAE (Dragonfly) --> SANGAT AMAN (Forward Secrecy & tahan offline crack)',
      note: 'Selalu aktifkan IEEE 802.11w (Protected Management Frames / PMF) untuk mencegah pemutusan paksa via Deauthentication Attack.',
    },
    intro:
      'Berbeda dengan jaringan kabel yang mengharuskan penyerang mencolokkan kabel secara fisik ke switch, jaringan nirkabel memancarkan frame data ke ruang terbuka. Oleh karena itu, protokol enkripsi layer udara dan autentikasi identitas AP merupakan pertahanan utama.',
    protocols: [
      {
        name: 'WEP (1999)',
        status: 'broken',
        level: 1,
        description:
          'Wired Equivalent Privacy menggunakan cipher aliran RC4 dengan Initialization Vector (IV) 24-bit yang terlalu pendek. Karena IV berulang setelah beberapa ribu paket, kunci rahasia dapat dipulihkan dalam hitungan menit. Jangan pernah digunakan.',
      },
      {
        name: 'WPA (2003)',
        status: 'weak',
        level: 2,
        description:
          'Wi-Fi Protected Access generasi pertama menggunakan TKIP (Temporal Key Integrity Protocol) sebagai solusi transisi pada perangkat keras lama. Saat ini sudah usang dan telah resmi dideprekasi oleh Wi-Fi Alliance.',
      },
      {
        name: 'WPA2 (2004)',
        status: 'good',
        level: 3,
        description:
          'Menggunakan standar enkripsi blok AES-CCMP yang kuat. Tersedia dalam mode WPA2-Personal (Pre-Shared Key) untuk rumah dan WPA2-Enterprise (IEEE 802.1X dengan server RADIUS) untuk institusi. Tetap aman asalkan menggunakan frase sandi minimal 12 karakter acak.',
      },
      {
        name: 'WPA3 (2018)',
        status: 'best',
        level: 4,
        description:
          'Standar keamanan modern yang menggantikan pertukaran kunci PSK dengan SAE (Simultaneous Authentication of Equals). Tahan terhadap serangan tebak sandi offline (offline dictionary attack), menyediakan Forward Secrecy, dan mewajibkan 802.11w (PMF).',
      },
    ],
    threats: [
      {
        name: 'Evil Twin / Rogue AP',
        severity: 'high',
        description:
          'Penyerang menyalakan Access Point palsu menggunakan nama jaringan (SSID) yang sama persis dengan Wi-Fi resmi agar perangkat pengguna terhubung secara otomatis.',
        howItWorks:
          'Penyerang memancarkan sinyal lebih kuat di dekat korban atau memutus koneksi korban dari AP asli. Saat perangkat korban berpindah ke AP palsu, seluruh lalu lintas data melewati perangkat penyerang (Man-in-the-Middle) dan pengguna dapat disuguhi halaman login palsu (captive portal phishing).',
        prevention:
          'Gunakan WPA2/WPA3-Enterprise (802.1X) dengan validasi sertifikat server, aktifkan fitur WIDS/WIPS pada kontroler untuk mendeteksi BSSID asing, dan gunakan koneksi terenkripsi (HTTPS/VPN).',
      },
      {
        name: 'Offline Brute Force / Dictionary Attack',
        severity: 'high',
        description:
          'Penyerang menangkap paket 4-Way Handshake WPA2-PSK dari udara, lalu menebak kombinasi kata sandi secara offline menggunakan kartu grafis (GPU).',
        howItWorks:
          'Saat klien terhubung ke AP WPA2-PSK, terjadi pertukaran 4 paket jabat tangan (handshake). Penyerang cukup merekam paket ini tanpa perlu terus berada di lokasi, lalu menguji jutaan kata sandi per detik di komputernya.',
        prevention:
          'Beralih ke protokol WPA3-SAE yang kebal terhadap pencocokan handshake offline, atau gunakan kata sandi WPA2 minimal 14 karakter yang mengombinasikan huruf, angka, dan simbol.',
      },
      {
        name: 'Packet Sniffing (Penyadapan Udara)',
        severity: 'medium',
        description:
          'Perekaman seluruh frame 802.11 yang melintas di udara menggunakan kartu jaringan nirkabel dalam mode monitor (promiscuous/monitor mode).',
        howItWorks:
          'Pada jaringan Wi-Fi terbuka (Open Network) tanpa enkripsi, seluruh payload yang tidak terenkripsi di layer aplikasi dapat langsung dibaca menggunakan perangkat lunak penganalisis paket seperti Wireshark.',
        prevention:
          'Hindari menyediakan Wi-Fi terbuka tanpa enkripsi; gunakan minimal fitur OWE (Opportunistic Wireless Encryption) pada Wi-Fi tamu serta wajibkan protokol TLS/HTTPS.',
      },
      {
        name: 'Deauthentication Attack',
        severity: 'medium',
        description:
          'Pengiriman frame manajemen deauthentication palsu yang memaksa perangkat klien terputus dari Access Point.',
        howItWorks:
          'Pada standar 802.11 lama, frame manajemen seperti Deauth dan Disassociate tidak dienkripsi. Penyerang memalsukan alamat MAC sumber milik AP dan mengirim frame pemutusan terus-menerus sehingga klien mengalami Denial of Service atau dipaksa melakukan reconnect.',
        prevention:
          'Aktifkan fitur IEEE 802.11w (Protected Management Frames / PMF) pada pengaturan Access Point, atau gunakan WPA3 yang mewajibkan PMF secara bawaan.',
      },
      {
        name: 'WPS PIN Vulnerability',
        severity: 'medium',
        description:
          'Eksploitasi celah desain pada fitur Wi-Fi Protected Setup (WPS) berbasis kode PIN 8 digit.',
        howItWorks:
          'Protokol WPS memvalidasi 4 digit pertama dan 3 digit kedua secara terpisah, sedangkan digit ke-8 adalah checksum. Akibatnya, kombinasi yang harus ditebak turun drastis dari 100.000.000 menjadi hanya 11.000 kemungkinan.',
        prevention:
          'Matikan (Disable) fitur WPS pada halaman administrasi router secara permanen.',
      },
    ],
    scenario: {
      title: 'Studi Kasus Insiden Keamanan',
      question:
        'Anda bertugas sebagai administrator jaringan kampus. Sistem pemantau melaporkan banyak mahasiswa tiba-tiba terputus dari SSID kampus lalu mendapati halaman pop-up yang meminta mereka memasukkan password email universitas. Langkah investigasi dan mitigasi apa yang paling tepat?',
      options: [
        {
          text: 'Mengabaikan laporan karena sinyal Wi-Fi kampus masih terlihat penuh di indikator laptop',
          correct: false,
          feedback:
            'Kurang tepat. Gejala terputus mendadak diikuti halaman login tidak resmi adalah indikasi kuat serangan Deauthentication yang dikombinasikan dengan Evil Twin Captive Portal.',
        },
        {
          text: 'Memindai BSSID asing dengan WIDS/Wi-Fi Analyzer untuk melacak posisi Rogue AP serta mengaktifkan 802.11w (PMF)',
          correct: true,
          feedback:
            'Tepat! Memeriksa daftar BSSID (alamat MAC radio) yang memancarkan SSID kampus akan mengungkap keberadaan Rogue AP, sedangkan mengaktifkan 802.11w (PMF) menghentikan serangan Deauthentication.',
        },
        {
          text: 'Menaikkan daya pancar (Tx Power) semua AP kampus hingga melewati batas regulasi EIRP',
          correct: false,
          feedback:
            'Kurang tepat. Menaikkan daya pancar tidak menghentikan frame Deauthentication palsu dan justru merusak keseimbangan roaming antar sel AP.',
        },
        {
          text: 'Mengganti enkripsi jaringan kampus menjadi WEP agar lebih kompatibel dengan perangkat lama',
          correct: false,
          feedback:
            'Sangat berbahaya. WEP sudah tidak aman dan dapat dibobol dalam hitungan menit.',
        },
      ],
    },
    exercise: [
      {
        type: 'fill',
        question: 'Protokol keamanan Wi-Fi generasi awal tahun 1999 yang menggunakan algoritma RC4 dan sudah tidak aman adalah _______.',
        answer: ['WEP', 'wep'],
        hint: 'Singkatan dari Wired Equivalent Privacy (3 huruf)',
      },
      {
        type: 'choice',
        question: 'Serangan yang memaksa klien terputus dari AP asli dengan mengirimkan frame manajemen palsu disebut?',
        options: ['SQL Injection', 'Deauthentication Attack', 'DNS Poisoning', 'Port Scanning'],
        answer: 1,
      },
      {
        type: 'choice',
        question: 'Protokol keamanan Wi-Fi terbaru yang menggunakan mekanisme SAE (Simultaneous Authentication of Equals) adalah?',
        options: ['WEP', 'WPA-TKIP', 'WPA2-PSK', 'WPA3'],
        answer: 3,
      },
      {
        type: 'fill',
        question: 'Serangan di mana penyerang mendirikan Access Point palsu dengan nama SSID yang identik dengan jaringan resmi disebut _______.',
        answer: ['Evil Twin', 'evil twin', 'Rogue AP', 'rogue ap'],
        hint: 'Istilah bahasa Inggris yang berarti kembaran jahat',
      },
    ],
  },

  {
    id: '07',
    title: 'Perbandingan Teknologi Nirkabel',
    description:
      'Ekosistem komunikasi nirkabel mencakup lebih dari sekadar Wi-Fi: mulai dari NFC jarak sentuh, Bluetooth & Zigbee untuk perangkat pintar, hingga LoRaWAN berjangkauan puluhan kilometer.',
    type: 'tech-comparison',
    estimatedMinutes: 10,
    objectives: [
      'Membandingkan evolusi kapasitas Wi-Fi 4, Wi-Fi 5, Wi-Fi 6, Wi-Fi 6E, dan Wi-Fi 7.',
      'Menganalisis kompromi (trade-off) antara Kecepatan Data, Jangkauan Jarak, dan Konsumsi Daya pada berbagai protokol nirkabel.',
      'Memilih protokol yang tepat untuk kasus penggunaan spesifik: Smart Home (Zigbee/BLE), Smart Agriculture (LoRaWAN), dan pembayaran nirsentuh (NFC).',
    ],
    keyFormula: {
      title: 'Segitiga Kompromi Desain Protokol Nirkabel',
      code: 'Kecepatan Tinggi (Gbps)  <--->  Jangkauan Jauh (km)  <--->  Konsumsi Daya Ultra-Rendah (mW)\n(Sebuah protokol nirkabel hanya dapat mengoptimalkan maksimal 2 dari 3 aspek di atas secara bersamaan)',
      note: 'Contoh: Wi-Fi 7 mengoptimalkan kecepatan tinggi, sedangkan LoRaWAN mengorbankan kecepatan (hanya puluhan Kbps) demi jangkauan belasan kilometer dan baterai tahan bertahun-tahun.',
    },
    intro:
      'Setiap protokol komunikasi nirkabel dirancang untuk menyelesaikan permasalahan rekayasa yang berbeda. Sensor kelembaban tanah di perkebunan membutuhkan baterai yang tahan 5 tahun dengan jangkauan 10 km (LoRaWAN), sementara headset VR membutuhkan aliran data multi-Gigabit berlatensi rendah (Wi-Fi 6E/7).',
    content: [
      {
        name: 'Wi-Fi 4 (802.11n)',
        year: '2009',
        freq: '2.4 & 5 GHz',
        speed: '600 Mbps',
        range: '~70 m (indoor)',
        power: 'Medium',
        usecase: 'Perangkat legacy, jaringan dasar rumah & IoT 2.4 GHz',
        features: 'Memperkenalkan MIMO hingga 4x4 dan lebar kanal 40 MHz pada dua pita frekuensi (2.4 GHz dan 5 GHz).',
        pros: 'Kompatibilitas perangkat sangat luas dan jangkauan 2.4 GHz cukup jauh.',
        cons: 'Kapasitas tidak memadai untuk kepadatan pengguna tinggi dan belum mendukung MU-MIMO.',
        color: 'slate',
        category: 'WiFi',
      },
      {
        name: 'Wi-Fi 5 (802.11ac)',
        year: '2014',
        freq: '5 GHz',
        speed: '3.5 Gbps',
        range: '~35 m (indoor)',
        power: 'Medium-High',
        usecase: 'Streaming video 4K, perkantoran, link CPE 5AC',
        features: 'Mendukung Downlink MU-MIMO, kanal hingga 160 MHz, modulasi 256-QAM, dan eksplisit Beamforming.',
        pros: 'Menghadirkan era Gigabit Wi-Fi pada pita 5 GHz yang lebih bebas interferensi.',
        cons: 'Hanya beroperasi di pita 5 GHz dan efisiensi menurun saat ratusan klien aktif bersamaan.',
        color: 'blue',
        category: 'WiFi',
      },
      {
        name: 'Wi-Fi 6 (802.11ax)',
        year: '2019',
        freq: '2.4 & 5 GHz',
        speed: '9.6 Gbps',
        range: '~35 m (indoor)',
        power: 'Optimized (TWT)',
        usecase: 'Kampus, stadion, auditorium padat, perkantoran modern',
        features: 'OFDMA (pembagian sub-kanal ke banyak pengguna sekaligus), Uplink/Downlink 8x8 MU-MIMO, 1024-QAM, BSS Coloring, dan Target Wake Time (TWT).',
        pros: 'Latensi tetap rendah dan stabil meskipun puluhan perangkat mengirim data secara bersamaan.',
        cons: 'Memerlukan perangkat klien yang mendukung 802.11ax untuk merasakan manfaat OFDMA.',
        color: 'primary',
        category: 'WiFi',
      },
      {
        name: 'Wi-Fi 6E',
        year: '2021',
        freq: '6 GHz (serta 2.4 & 5 GHz)',
        speed: '9.6 Gbps',
        range: '~30 m (indoor)',
        power: 'Optimized',
        usecase: 'Perangkat AR/VR, workstation medis/desain, lingkungan apartemen padat',
        features: 'Membuka spektrum baru di pita 6 GHz dengan tambahan hingga 7 kanal super-lebar 160 MHz tanpa gangguan dari perangkat Wi-Fi generasi lama.',
        pros: 'Jalur spektrum 6 GHz sangat bersih dan bebas antrean perangkat legacy.',
        cons: 'Redaman sinyal 6 GHz terhadap dinding lebih besar sehingga jangkauan terbatas pada satu ruangan.',
        color: 'emerald',
        category: 'WiFi',
      },
      {
        name: 'Wi-Fi 7 (802.11be)',
        year: '2024+',
        freq: '2.4, 5 & 6 GHz',
        speed: '46 Gbps',
        range: '~35 m (indoor)',
        power: 'Optimized',
        usecase: 'Streaming 8K, XR (Extended Reality), otomasi industri real-time',
        features: 'Multi-Link Operation (MLO) untuk agregasi beberapa band sekaligus, lebar kanal 320 MHz, 16x16 MU-MIMO, dan modulasi 4096-QAM.',
        pros: 'Kecepatan setara jaringan kabel multi-Gigabit dengan keandalan dan latensi ultra-rendah.',
        cons: 'Membutuhkan infrastruktur switch multi-Gigabit (2.5G/10G PoE++) agar tidak bottleneck di sisi kabel.',
        color: 'purple',
        category: 'WiFi',
      },
      {
        name: 'Bluetooth / BLE',
        year: '1999 / 2010 (BLE)',
        freq: '2.4 GHz (FHSS)',
        speed: '2 Mbps (BLE) - 3 Mbps (Classic)',
        range: '10 - 100 m',
        power: 'Very Low (BLE)',
        usecase: 'Audio nirkabel, smartwatch, beacon lokasi indoor, periferal komputer',
        features: 'Menggunakan Frequency Hopping Spread Spectrum (FHSS) yang berpindah kanal 1.600 kali per detik untuk menghindari interferensi di pita 2.4 GHz.',
        pros: 'Konsumsi daya sangat hemat (terutama varian BLE) dan tersedia di hampir semua ponsel.',
        cons: 'Bukan dirancang untuk transfer file berukuran besar atau akses internet langsung.',
        color: 'blue',
        category: 'Short Range',
      },
      {
        name: 'Zigbee (IEEE 802.15.4)',
        year: '2004',
        freq: '2.4 GHz / Sub-GHz',
        speed: '250 Kbps',
        range: '10 - 100 m (per hop mesh)',
        power: 'Ultra Low',
        usecase: 'Otomasi rumah pintar (lampu, sakelar, sensor suhu), jaringan sensor pabrik',
        features: 'Mendukung topologi Mesh mandiri (self-healing mesh) di mana perangkat yang terhubung listrik bertindak sebagai repeater bagi sensor sekitarnya.',
        pros: 'Sangat hemat energi dan jangkauan dapat meluas otomatis lewat rantai node mesh.',
        cons: 'Laju data sangat kecil (250 Kbps), hanya untuk pesan kontrol dan telemetri sensor.',
        color: 'orange',
        category: 'IoT',
      },
      {
        name: 'LoRa / LoRaWAN',
        year: '2013',
        freq: '915 / 923 MHz (Sub-GHz ISM)',
        speed: '0.3 - 50 Kbps',
        range: '2 - 15 km (perkotaan), 30+ km (terbuka)',
        power: 'Ultra Low',
        usecase: 'Pertanian cerdas, pemantauan ketinggian air sungai, smart metering kota',
        features: 'Menggunakan modulasi Chirp Spread Spectrum (CSS) pada pita frekuensi Sub-GHz yang tahan terhadap derau dan sangat kuat menembus rintangan.',
        pros: 'Jangkauan luar biasa jauh hingga belasan kilometer dengan daya baterai bertahan bertahun-tahun.',
        cons: 'Kapasitas payload sangat kecil (hanya beberapa puluh byte per pengiriman), tidak bisa untuk suara/video.',
        color: 'green',
        category: 'LPWAN',
      },
      {
        name: 'NFC (Near Field Communication)',
        year: '2004',
        freq: '13.56 MHz (HF RFID)',
        speed: '424 Kbps',
        range: '< 4 cm',
        power: 'Pasif (Induksi Elektromagnetik)',
        usecase: 'Kartu uang elektronik (e-money), akses pintu gedung, pembayaran nirsentuh',
        features: 'Bekerja melalui induksi medan magnet jarak sangat dekat sehingga kartu/tag pasif dapat menyala tanpa baterai internal.',
        pros: 'Proses transaksi instan dalam hitungan milidetik dan aman dari penyadapan jarak jauh.',
        cons: 'Wajib ditempelkan sangat dekat (< 4 cm) dengan perangkat pembaca (reader).',
        color: 'slate',
        category: 'Short Range',
      },
    ],
    exercise: [
      {
        type: 'fill',
        question: 'Ekstensi standar Wi-Fi 6 yang mulai membuka akses ke spektrum frekuensi 6 GHz disebut Wi-Fi _______.',
        answer: ['6E', '6e'],
        hint: 'Wi-Fi 6 diikuti satu huruf tambahan',
      },
      {
        type: 'choice',
        question: 'Teknologi nirkabel manakah yang paling tepat untuk mengirim data sensor cuaca dari tengah lahan pertanian sejauh 10 km dengan daya baterai AA?',
        options: ['NFC', 'Wi-Fi 6E', 'LoRa / LoRaWAN', 'Bluetooth Classic'],
        answer: 2,
      },
      {
        type: 'choice',
        question: 'Fitur OFDMA pada Wi-Fi 6 (802.11ax) bertujuan utama untuk...',
        options: [
          'Mengganti kabel serat optik antar benua',
          'Membagi kanal frekuensi menjadi sub-kanal (Resource Unit) agar banyak klien terlayani serentak dengan efisien',
          'Menghilangkan kebutuhan autentikasi WPA2/WPA3',
          'Membatasi jarak pancaran menjadi 4 cm',
        ],
        answer: 1,
      },
      {
        type: 'fill',
        question: 'Standar Wi-Fi 7 (802.11be) mendukung kecepatan data teoritis hingga _______ Gbps.',
        answer: ['46'],
        hint: 'Angka dua digit (40-an Gbps)',
      },
    ],
  },

  {
    id: '08',
    title: 'Kelebihan, Kekurangan & Tantangan Desain',
    description:
      'Evaluasi objektif kelebihan, keterbatasan fisik medium udara, serta strategi rekayasa untuk mengatasi multipath dan kepadatan pengguna tinggi (High-Density WLAN).',
    type: 'pros-cons-extended',
    estimatedMinutes: 9,
    objectives: [
      'Mengidentifikasi keuntungan ekonomis dan operasional jaringan nirkabel dibanding instalasi kabel penuh.',
      'Menganalisis keterbatasan sifat half-duplex dan medium bersama (shared medium) pada komunikasi radio.',
      'Merumuskan solusi arsitektur untuk masalah Multipath Fading, regulasi spektrum, dan High-Density WLAN.',
    ],
    keyFormula: {
      title: 'Prinsip Desain High-Density WLAN (Stadion & Auditorium)',
      code: 'Kapasitas Sel = Jumlah AP × Kapasitas Kanal Bersih\nStrategi: Banyak AP Berdaya Rendah (Micro-Cell 5/6 GHz) > Satu AP Berdaya Tinggi',
      note: 'Menaikkan daya pancar satu AP di ruangan padat justru memperluas area tabrakan paket (collision domain). Solusinya adalah memperkecil ukuran sel dan memperbanyak AP pada kanal berbeda.',
    },
    intro:
      'Seorang perancang jaringan yang andal tidak hanya mengetahui cara menyalakan Wi-Fi, tetapi juga memahami kapan jaringan nirkabel menjadi solusi terbaik dan bagaimana mengantisipasi kelemahan alaminya melalui desain sel yang terukur.',
    content: {
      pros: [
        {
          title: 'Mobilitas Pengguna Tanpa Batas',
          description:
            'Pengguna dapat berpindah ruang rapat, lantai, atau area kerja sambil tetap terhubung ke jaringan tanpa harus mencabut-pasang kabel konektor.',
          detail:
            'Dengan protokol roaming cepat seperti IEEE 802.11r/k/v pada sistem AP terpusat, perpindahan asosiasi klien dari satu AP ke AP lain berlangsung di bawah 50 milidetik sehingga panggilan VoIP tidak terputus.',
        },
        {
          title: 'Kecepatan & Fleksibilitas Instalasi',
          description:
            'Mengurangi waktu pengerjaan sipil karena tidak perlu membobok dinding atau menarik ratusan jalur kabel UTP ke setiap meja pengguna.',
          detail:
            'Sangat krusial untuk bangunan cagar budaya yang tidak boleh dilubangi, ruang pameran sementara, atau pemulihan komunikasi darurat saat bencana.',
        },
        {
          title: 'Efisiensi Biaya Ekspansi (Scalability)',
          description:
            'Menambah jumlah perangkat yang terhubung dari 20 menjadi 100 unit tidak menuntut penambahan port switch fisik untuk setiap perangkat klien.',
          detail:
            'Selama kapasitas airtime AP masih mencukupi, perangkat baru seperti tablet, laptop, dan sensor IoT dapat langsung bergabung ke SSID yang sesuai.',
        },
        {
          title: 'Menembus Medan Geografis Sulit',
          description:
            'Menghubungkan lokasi yang terpisah sungai, lembah, jalan raya, atau perbukitan di mana penarikan kabel serat optik membutuhkan izin dan biaya sangat besar.',
          detail:
            'Link radio PTP dapat dibangun dalam waktu satu hari kerja di kedua titik menara, memberikan alternatif jalur utama maupun jalur cadangan (failover link).',
        },
      ],
      cons: [
        {
          title: 'Rentan Terhadap Interferensi Spektrum',
          description:
            'Frekuensi tidak berlisensi (ISM 2.4 GHz dan 5 GHz) digunakan bersama oleh publik, sehingga kepadatan AP tetangga dapat menurunkan kualitas sinyal.',
          detail:
            'Di kawasan perkantoran padat atau apartemen, puluhan SSID yang bertumpuk pada kanal yang sama menyebabkan peningkatan waktu tunggu (channel contention) dan penurunan throughput.',
        },
        {
          title: 'Permukaan Serangan Keamanan Lebih Luas',
          description:
            'Sinyal radio merambat menembus kaca dan tembok gedung hingga ke area parkir atau jalan umum, membuka peluang penyadapan maupun serangan dari luar gedung.',
          detail:
            'Berbeda dengan port LAN yang terlindung di dalam ruang server terkunci, jaringan nirkabel wajib menerapkan enkripsi kuat (WPA3/WPA2-Enterprise) dan pemisahan VLAN.',
        },
        {
          title: 'Redaman Penghalang Fisik (Attenuation)',
          description:
            'Dinding beton bertulang, kaca berlapis film logam (Low-E glass), dan partisi besi menyerap energi gelombang radio secara signifikan.',
          detail:
            'Satu dinding beton tebal dapat meredam sinyal sebesar 12 dB hingga 18 dB (mengurangi daya sinyal hingga lebih dari 90%), sehingga membutuhkan penempatan AP di tiap zona ruang.',
        },
        {
          title: 'Kapasitas Dibagi Bersama (Shared Half-Duplex Medium)',
          description:
            'Pada satu kanal radio, perangkat bergantian menggunakan medium udara (CSMA/CA), sehingga kecepatan bersih per klien menurun seiring bertambahnya perangkat aktif.',
          detail:
            'Untuk beban kerja server basis data, editing video mentah melalui jaringan (NAS), atau backbone utama dalam gedung, kabel serat optik dan Ethernet tetap menjadi pilihan utama.',
        },
        {
          title: 'Sensitif Terhadap Perubahan Lingkungan Luar Ruang',
          description:
            'Link outdoor jarak jauh dipengaruhi oleh pertumbuhan pepohonan baru, pembangunan gedung tinggi di lintasan, hujan lebat, dan korosi perangkat.',
          detail:
            'Link PTP yang awalnya memiliki LoS bersih dapat mengalami penurunan sinyal beberapa tahun kemudian ketika pohon di tengah jalur tumbuh memasuki zona Fresnel.',
        },
      ],
      challenges: [
        {
          title: 'Pantulan Jamak (Multipath Propagation)',
          description:
            'Gelombang radio yang memantul pada dinding, lantai, dan perabot logam tiba di antena penerima melalui banyak jalur dengan selisih waktu berbeda.',
          solution:
            'Teknologi modern mengubah pantulan ini menjadi keuntungan menggunakan modulasi OFDM (Orthogonal Frequency Division Multiplexing) dan MIMO (Multiple-Input Multiple-Output) yang menggabungkan beberapa aliran spasial sinyal.',
        },
        {
          title: 'Kepatuhan Regulasi Spektrum & EIRP',
          description:
            'Penggunaan frekuensi radio diatur oleh negara agar tidak mengganggu radar penerbangan, cuaca, maupun telekomunikasi vital.',
          solution:
            'Pastikan perangkat memiliki sertifikasi resmi (Postel/Komdigi di Indonesia), aktifkan kode negara (Country Code: Indonesia) pada konfigurasi radio, aktifkan fitur DFS (Dynamic Frequency Selection) di pita 5 GHz, dan patuhi batas EIRP maksimal 36 dBm.',
        },
        {
          title: 'Arsitektur Lingkungan Sangat Padat (High-Density WLAN)',
          description:
            'Menyediakan koneksi stabil bagi ratusan hingga ribuan pengguna serentak di aula wisuda, ruang konferensi, atau stadion.',
          solution:
            'Terapkan desain Micro-Cell: pasang lebih banyak Access Point Wi-Fi 6/6E dengan daya pancar rendah-menengah (agar sel tidak saling tumpang tindih), gunakan antena directional di langit-langit, matikan data-rate warisan yang lambat (1-6 Mbps), dan arahkan klien ke pita 5 GHz & 6 GHz (Band Steering).',
        },
      ],
    },
    exercise: [
      {
        type: 'choice',
        question: 'Apa keunggulan utama jaringan nirkabel dibandingkan jaringan kabel pada tahap implementasi fisik?',
        options: [
          'Bebas dari segala bentuk interferensi frekuensi',
          'Instalasi jauh lebih cepat dan fleksibel tanpa perlu menarik kabel ke setiap perangkat pengguna',
          'Sinyal tidak mungkin keluar dari dinding ruangan',
          'Memiliki kapasitas full-duplex tak terbatas di satu kanal',
        ],
        answer: 1,
      },
      {
        type: 'fill',
        question: 'Fenomena ketika sinyal radio memantul pada berbagai permukaan dan tiba di penerima melalui banyak jalur disebut efek _______.',
        answer: ['multipath', 'Multipath'],
        hint: 'Istilah bahasa Inggris yang berarti banyak jalur',
      },
      {
        type: 'choice',
        question: 'Bagaimana strategi rekayasa yang benar saat merancang Wi-Fi untuk aula berkapasitas 1.000 orang (High-Density)?',
        options: [
          'Memasang satu router di pojok ruangan dengan daya pancar dimaksimalkan',
          'Memasang banyak Access Point Wi-Fi 6 berdaya pancar terukur pada kanal 5/6 GHz yang berbeda (Micro-Cell)',
          'Hanya menggunakan frekuensi 2.4 GHz dengan lebar kanal 40 MHz',
          'Menonaktifkan enkripsi WPA2/WPA3',
        ],
        answer: 1,
      },
    ],
  },
];
