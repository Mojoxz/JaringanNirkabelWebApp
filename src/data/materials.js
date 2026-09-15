import { images } from './images';

export const materials = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 01 — SEJARAH
  // ─────────────────────────────────────────────────────────────
  {
    id: "01",
    title: "Sejarah Jaringan Nirkabel",
    description: "Perjalanan panjang teknologi komunikasi nirkabel — dari gelombang radio abad ke-19 hingga Wi-Fi 7 yang hadir di era kini. Klik setiap titik untuk melihat cerita di baliknya.",
    type: "timeline",
    intro: "Jaringan nirkabel bukanlah teknologi baru. Perjalanannya dimulai dari penemuan gelombang elektromagnetik oleh Heinrich Hertz pada akhir 1800-an dan terus berkembang pesat hingga hari ini.",
    content: [
      {
        year: "1888",
        event: "Penemuan Gelombang Radio",
        description: "Heinrich Hertz berhasil membuktikan keberadaan gelombang elektromagnetik secara eksperimental. Penemuannya menjadi fondasi ilmiah bagi seluruh teknologi komunikasi nirkabel. Satuan frekuensi 'Hertz (Hz)' dinamai untuk menghormati kontribusinya.",
        detail: "Hertz menggunakan peralatan sederhana — sebuah osilator dan detektor — untuk menghasilkan dan mendeteksi gelombang radio pertama di dunia. Frekuensi yang digunakan berkisar 100 MHz.",
        image: images.historyWireless
      },
      {
        year: "1895",
        event: "Transmisi Radio Pertama oleh Marconi",
        description: "Guglielmo Marconi berhasil mengirimkan sinyal Morse secara nirkabel sejauh 2 km di Bologna, Italia. Ia kemudian mendirikan perusahaan radio komersial pertama di dunia.",
        detail: "Marconi mengembangkan sistem komunikasi radio yang praktis. Pada tahun 1901, ia berhasil mengirimkan sinyal melintasi Samudra Atlantik — dari Cornwall, Inggris ke Newfoundland, Kanada — sebuah pencapaian luar biasa di zamannya.",
        image: images.historyWireless
      },
      {
        year: "1971",
        event: "ALOHAnet — Jaringan Komputer Nirkabel Pertama",
        description: "Universitas Hawaii mengoperasikan ALOHAnet, jaringan komputer nirkabel pertama di dunia. Sistem ini menghubungkan komputer di empat pulau yang berbeda menggunakan UHF radio.",
        detail: "ALOHAnet memperkenalkan protokol 'ALOHA' yang menjadi cikal bakal dari CSMA/CD yang digunakan Ethernet modern. Jaringan ini beroperasi pada kecepatan 9600 bps — sangat lambat dibanding standar saat ini.",
        image: images.historyWireless
      },
      {
        year: "1997",
        event: "IEEE 802.11 — Standar Wi-Fi Pertama",
        description: "IEEE (Institute of Electrical and Electronics Engineers) menerbitkan standar 802.11 pertama, yang memungkinkan transfer data nirkabel hingga 2 Mbps pada frekuensi 2.4 GHz atau infrared.",
        detail: "Standar ini menggunakan teknologi DSSS (Direct Sequence Spread Spectrum) dan FHSS (Frequency Hopping Spread Spectrum). Meski lambat, ini adalah titik awal dari ekosistem Wi-Fi yang kita kenal hari ini.",
        image: images.historyWireless
      },
      {
        year: "1999",
        event: "Wi-Fi Alliance & 802.11b (Wi-Fi 1)",
        description: "Istilah 'Wi-Fi' resmi diperkenalkan oleh Wi-Fi Alliance. Standar 802.11b hadir dengan kecepatan 11 Mbps dan menjadi adopsi pertama yang luas secara komersial.",
        detail: "802.11b bekerja pada pita 2.4 GHz dengan jangkauan dalam ruangan hingga ~38 meter. Karena harganya terjangkau, teknologi ini dengan cepat diadopsi di laptop, PDA, dan perangkat genggam lainnya.",
        image: images.historyWireless
      },
      {
        year: "2002–2003",
        event: "802.11a dan 802.11g (Wi-Fi 2 & 3)",
        description: "802.11a menggunakan pita 5 GHz dengan kecepatan hingga 54 Mbps. 802.11g hadir di 2.4 GHz dengan kecepatan yang sama namun kompatibel dengan 802.11b.",
        detail: "802.11g menjadi sangat populer karena menawarkan kecepatan tinggi dengan tetap kompatibel mundur ke 802.11b. Ini adalah era 'hot spot' Wi-Fi publik mulai bermunculan di kafe, bandara, dan hotel.",
        image: images.historyWireless
      },
      {
        year: "2009",
        event: "802.11n (Wi-Fi 4) — Revolusi MIMO",
        description: "Wi-Fi 4 memperkenalkan teknologi MIMO (Multiple Input Multiple Output), memungkinkan kecepatan teoritis hingga 600 Mbps menggunakan antena jamak. Pertama kali mendukung dual-band 2.4 & 5 GHz.",
        detail: "MIMO menggunakan beberapa antena pemancar dan penerima sekaligus untuk meningkatkan throughput dan mengurangi error. Ini adalah lompatan besar dalam kapasitas jaringan Wi-Fi.",
        image: images.wifi6
      },
      {
        year: "2013–2019",
        event: "Wi-Fi 5 & Wi-Fi 6 — Era Gigabit",
        description: "Wi-Fi 5 (802.11ac) membawa kecepatan Gigabit pertama di 5 GHz. Wi-Fi 6 (802.11ax) menghadirkan OFDMA untuk efisiensi jaringan padat, dengan kecepatan hingga 9.6 Gbps.",
        detail: "Wi-Fi 6 dirancang untuk lingkungan dengan sangat banyak perangkat — stadion, bandara, mal. Fitur TWT (Target Wake Time) menghemat baterai perangkat IoT secara drastis.",
        image: images.wifi6
      },
      {
        year: "2024+",
        event: "Wi-Fi 7 (802.11be) — Ultra-High Throughput",
        description: "Wi-Fi 7 menghadirkan kecepatan teoritis hingga 46 Gbps menggunakan saluran 320 MHz dan Multi-Link Operation (MLO) — kemampuan untuk menggunakan beberapa pita frekuensi secara bersamaan.",
        detail: "MLO memungkinkan perangkat mengirim dan menerima data di beberapa band sekaligus, mengurangi latensi drastis. Wi-Fi 7 sangat cocok untuk AR/VR, gaming cloud, dan streaming 8K.",
        image: images.wifi6
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 02 — ANTENA
  // ─────────────────────────────────────────────────────────────
  {
    id: "02",
    title: "Jenis-Jenis Antena Nirkabel",
    description: "Antena adalah 'mulut dan telinga' dari sistem nirkabel. Jenis antena yang dipilih sangat menentukan jangkauan, arah, dan kualitas sinyal. Klik setiap kartu untuk detail lengkap.",
    type: "cards-antenna",
    intro: "Dalam dunia nirkabel, tidak ada satu antena yang cocok untuk semua situasi. Pemilihan antena yang tepat bergantung pada kebutuhan: apakah sinyal harus disebarkan ke segala arah, atau difokuskan ke satu titik tertentu?",
    content: [
      {
        name: "Omni Directional",
        image: images.antennaOmni,
        badge: "360° Coverage",
        badgeColor: "blue",
        description: "Antena omni memancarkan dan menerima sinyal secara merata ke segala arah horizontal (360°), seperti balon yang mengembang ke semua sisi.",
        detail: "Antena ini ideal untuk titik akses di tengah ruangan atau menara yang perlu melayani banyak klien dari segala penjuru. Tradeoff-nya adalah gain rendah karena energi tersebar ke semua arah.",
        characteristics: ["Gain: 2–12 dBi", "Pola pancaran: 360° Horizontal, ~7° Vertikal", "Jangkauan: Pendek–Menengah", "Keuntungan: Coverage luas tanpa perlu arah"],
        usage: "Access Point indoor, hotspot publik, tower BTS tinggi, wireless router rumahan.",
        radiationPattern: "360° Omnidirectional — Sinyal menyebar ke seluruh arah seperti 'donat'. Semakin tinggi gain, semakin 'tipis' donat (vertikal makin sempit, horizontal makin kuat).",
        example: "Access Point Ubiquiti UniFi AP yang dipasang di langit-langit ruangan menggunakan antena omni agar bisa melayani seluruh area sekitarnya."
      },
      {
        name: "Antena Sectoral",
        image: images.antennaSectoral,
        badge: "60°–120°",
        badgeColor: "purple",
        description: "Antena sectoral memancarkan sinyal dalam sudut tertentu — biasanya 60°, 90°, atau 120°. Mirip seperti irisan pizza, bukan keseluruhan pizza.",
        detail: "Gain antena sectoral lebih tinggi daripada omni dalam sektor yang dipilih. Biasanya dipasang dalam kelompok 3 antena (masing-masing 120°) untuk menutupi area 360° penuh pada tower PTMP.",
        characteristics: ["Gain: 12–18 dBi", "Pola pancaran: 60°–120° Horizontal", "Jangkauan: Menengah–Jauh", "Cocok untuk: PTMP Base Station"],
        usage: "Base station WISP (Wireless Internet Service Provider), menara BTS, sistem PTMP komersial.",
        radiationPattern: "Directional dengan sudut sektor. Satu tower BTS biasanya memasang 3 antena sectoral masing-masing 120° untuk menutupi 360°.",
        example: "Tower ISP lokal yang menyediakan internet untuk pelanggan rumah menggunakan antena sectoral sebagai base station yang melayani ratusan pelanggan dalam radius tertentu."
      },
      {
        name: "Antena Panel",
        image: images.antennaPanel,
        badge: "Directional",
        badgeColor: "emerald",
        description: "Antena panel (flat panel) berbentuk persegi panjang datar dengan gain menengah. Memancarkan sinyal dalam pola directional yang lebih terfokus.",
        detail: "Antena panel lebih ringkas dan estetis dibanding antena grid. Cocok untuk dipasang di dinding atau tiang pendek. Sering digunakan sebagai CPE (Client Premises Equipment) untuk penerima di sisi pelanggan.",
        characteristics: ["Gain: 14–24 dBi", "Pola pancaran: Directional, ~30°–60°", "Jangkauan: Menengah (1–10 km)", "Cocok untuk: Client PTMP, PTP jarak dekat"],
        usage: "CPE (perangkat penerima di rumah pelanggan WISP), PTP jarak menengah, indoor wireless backhaul.",
        radiationPattern: "Directional dengan beamwidth sedang. Lebih mudah dikonfigurasi karena lebih ringan dan ringkas.",
        example: "Perangkat seperti Ubiquiti LiteBeam atau TP-Link CPE510 adalah contoh antena panel yang dipasang di atap rumah pelanggan untuk menerima sinyal dari tower ISP."
      },
      {
        name: "Antena Yagi",
        image: images.antennaYagi,
        badge: "Narrow Beam",
        badgeColor: "orange",
        description: "Antena Yagi-Uda terdiri dari sebuah dipole aktif, reflektor di belakang, dan beberapa director di depan. Menghasilkan berkas sinyal yang sempit dan terarah.",
        detail: "Semakin banyak elemen director, semakin tinggi gain dan semakin sempit beamwidth. Antena Yagi sangat sensitif terhadap arah, sehingga harus diarahkan dengan presisi ke pemancar.",
        characteristics: ["Gain: 7–20 dBi (tergantung jumlah elemen)", "Pola pancaran: Directional, berkas sempit", "Jangkauan: Menengah–Jauh", "Sensitif terhadap arah"],
        usage: "PTP jarak menengah (3–15 km), penerima TV digital, ekstensi jangkauan Wi-Fi.",
        radiationPattern: "Directional sangat spesifik. Berkas sempit ke depan dengan beberapa lobe sisi (side lobe) yang lebih kecil. Harus diarahkan tepat ke target.",
        example: "Sering digunakan untuk menghubungkan dua gedung dalam kampus atau untuk memperkuat sinyal TV digital di daerah yang jauh dari pemancar."
      },
      {
        name: "Antena Parabolic/Grid",
        image: images.antennaParabolic,
        badge: "High Gain",
        badgeColor: "red",
        description: "Antena parabolic menggunakan reflektor berbentuk parabola untuk memfokuskan sinyal radio ke titik tertentu (focus point). Menghasilkan gain tertinggi di antara jenis antena lainnya.",
        detail: "Desain grid (kisi-kisi) mengurangi hambatan angin secara signifikan dibanding solid dish, menjadikannya lebih aman untuk pemasangan di tiang tinggi. Sangat efektif untuk backhaul jarak sangat jauh.",
        characteristics: ["Gain: 24–34 dBi", "Pola pancaran: Highly Directional, berkas sangat sempit (<5°)", "Jangkauan: Sangat Jauh (10–100+ km)", "Memerlukan alignment akurat"],
        usage: "Backhaul jarak jauh, menghubungkan dua lokasi yang terpisah gunung atau laut, koneksi antar pulau.",
        radiationPattern: "Highly directional. Berkas sinyal sangat sempit. Bahkan beberapa derajat saja meleset akan menyebabkan penurunan sinyal drastis. Butuh level alignment (waterpass).",
        example: "Menghubungkan tower repeater di dua puncak gunung yang berjarak 30+ km, atau koneksi backhaul antar kota untuk operator WISP skala besar."
      },
      {
        name: "Antena Dipole",
        image: images.antennaOmni,
        badge: "Basic",
        badgeColor: "slate",
        description: "Antena dipole adalah antena paling fundamental — dua konduktor lurus yang saling berseberangan. Ini adalah antena yang ada di dalam router WiFi rumahan.",
        detail: "Meski terlihat sederhana, dipole memiliki gain sekitar 2.15 dBi dan pola omnidirectional. Banyak antena modern merupakan varian atau kombinasi dari prinsip dasar antena dipole.",
        characteristics: ["Gain: ~2.15 dBi", "Pola pancaran: Omnidirectional (donat)", "Jangkauan: Pendek", "Murah dan mudah diproduksi"],
        usage: "Antena bawaan router WiFi rumahan, perangkat Bluetooth, transceiver 2.4 GHz sederhana.",
        radiationPattern: "Omnidirectional dengan pola 'donat' toroidal. Sangat lemah di arah ujung antena (kutub) dan paling kuat di sisi (ekuator).",
        example: "Antena tongkat kecil yang menyerupai batang pena pada router WiFi rumahan Anda. Biasanya 2 atau 3 antena dipasang secara miring untuk mengurangi blind spot."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 03 — PTP & PTMP
  // ─────────────────────────────────────────────────────────────
  {
    id: "03",
    title: "Pemancar Nirkabel: PTP & PTMP",
    description: "Dua topologi utama jaringan nirkabel jarak jauh. Klik setiap node pada diagram untuk memahami peran masing-masing komponen.",
    type: "diagram",
    intro: "Saat membangun jaringan nirkabel antar gedung atau antar lokasi, dua topologi utama digunakan: Point-to-Point (PTP) untuk koneksi dua titik, dan Point-to-Multipoint (PTMP) untuk melayani banyak klien sekaligus.",
    content: {
      ptp: {
        description: "Point-to-Point (PTP) adalah koneksi nirkabel langsung antara dua titik/lokasi. Bayangkan seperti jembatan radio pribadi antara dua gedung.",
        detail: "Dalam PTP, dua perangkat radio dengan antena directional diarahkan satu sama lain untuk membentuk link yang dedicated. Tidak ada perangkat lain yang berbagi bandwidth link ini.",
        advantages: ["Bandwidth dedicated — tidak dibagi dengan siapapun", "Latensi rendah, cocok untuk video call dan VoIP", "Jarak bisa sangat jauh (50+ km dengan antena grid)", "Keamanan lebih baik — koneksi point-to-point"],
        usecases: ["Menghubungkan dua kantor (HQ ke Branch)", "Backhaul tower BTS ke NOC", "Koneksi antar gedung di kampus tanpa kabel", "Internet sharing antar desa yang berdekatan"],
        image: images.ptp
      },
      ptmp: {
        description: "Point-to-Multipoint (PTMP) menghubungkan satu base station (Access Point/AP) ke banyak client station (CPE) sekaligus. Seperti satu menara pemancar TV yang melayani ribuan rumah.",
        detail: "Base station biasanya menggunakan antena sectoral (120°) dan dipasang di ketinggian. Setiap client menggunakan antena directional yang diarahkan ke base station. Bandwidth dibagi bersama semua klien.",
        advantages: ["Efisien untuk melayani banyak pelanggan dari satu tower", "Biaya infrastruktur lebih rendah per klien", "Mudah ditambah klien baru tanpa mengubah infrastruktur", "Model bisnis WISP (Wireless ISP)"],
        usecases: ["Layanan internet perdesaan oleh WISP lokal", "Jaringan RT/RW-Net", "Distribusi koneksi internet di kawasan industri", "Sistem CCTV area luas yang terpusat"],
        image: images.ptmp
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 04 — FAKTOR KEBERHASILAN
  // ─────────────────────────────────────────────────────────────
  {
    id: "04",
    title: "Faktor Keberhasilan Jaringan Nirkabel",
    description: "Sebelum memasang jaringan nirkabel, ada banyak faktor teknis yang harus dipahami. Coba simulasi link wireless di bawah ini!",
    type: "factors",
    intro: "Membangun jaringan nirkabel yang handal bukan sekadar memasang alat dan mengarahkan antena. Ada banyak variabel yang menentukan apakah sebuah link akan berhasil atau gagal.",
    content: [
      {
        name: "Line of Sight (LoS)",
        icon: "Eye",
        color: "blue",
        summary: "Jalur pandang bebas hambatan antara dua antena.",
        description: "Line of Sight (LoS) berarti ada jalur visual lurus yang tidak terhalang antara antena pemancar dan penerima. Ini adalah syarat UTAMA untuk link nirkabel jarak jauh yang baik.",
        detail: "Meski dua antena bisa 'saling melihat' secara visual, gelombang radio membutuhkan area yang lebih lebar yang disebut Fresnel Zone untuk tidak terganggu. Pohon, gedung, atau bahkan tanah yang melengkung bisa jadi penghalang.",
        tips: "Gunakan Google Earth atau alat seperti RadioMobile untuk merencanakan LoS sebelum instalasi. Pertimbangkan pertumbuhan pohon di masa depan!"
      },
      {
        name: "Fresnel Zone",
        icon: "Circle",
        color: "purple",
        summary: "Area elips di sekitar LoS yang harus bebas dari halangan.",
        description: "Fresnel Zone adalah area berbentuk elips di sekitar garis LoS. Sinyal radio tidak hanya merambat dalam garis lurus, tetapi tersebar sedikit. Jika area Fresnel terhambat, sinyal bisa melemah meski ada LoS visual.",
        detail: "Aturan umumnya: minimal 60% dari radius Fresnel Zone pertama (F1) harus bebas dari hambatan. Semakin besar radius F1, semakin tinggi antena yang dibutuhkan. Rumus radius F1 (meter): r = 17.32 × √(d/(4f)), dimana d = jarak (km) dan f = frekuensi (GHz).",
        tips: "Pada frekuensi 5.8 GHz dengan jarak 10 km, radius F1 di titik tengah sekitar 11 meter. Artinya, tidak boleh ada pohon setinggi lebih dari 11 meter di tengah jalur (setelah dikurangi ketinggian antena)."
      },
      {
        name: "Frekuensi (2.4 vs 5 GHz)",
        icon: "Radio",
        color: "emerald",
        summary: "Pilihan frekuensi menentukan penetrasi dan jangkauan.",
        description: "Dua pita frekuensi utama untuk Wi-Fi adalah 2.4 GHz dan 5 GHz. Keduanya punya kelebihan dan kekurangan yang perlu disesuaikan dengan kebutuhan.",
        detail: "2.4 GHz: Panjang gelombang lebih besar → lebih baik menembus penghalang (tembok, pohon) → jangkauan lebih jauh → TAPI lebih padat karena banyak perangkat dan hanya ada 3 saluran non-overlapping (1, 6, 11). | 5 GHz: Panjang gelombang lebih kecil → lebih cepat terserap penghalang → jangkauan lebih pendek → TAPI lebih bersih (23 saluran non-overlapping), lebih cepat, lebih sedikit interferensi.",
        tips: "Untuk jaringan outdoor jarak jauh: gunakan 5.8 GHz (lebih sedikit interferensi). Untuk indoor dengan banyak penghalang: 2.4 GHz lebih penetratif. 5 GHz bagus untuk throughput tinggi dalam jarak pendek."
      },
      {
        name: "Interferensi",
        icon: "Zap",
        color: "orange",
        summary: "Gangguan dari sinyal lain di frekuensi yang sama atau berdekatan.",
        description: "Interferensi terjadi ketika dua atau lebih pemancar radio menggunakan frekuensi yang tumpang tindih di area yang sama. Akibatnya, paket data sering error, kecepatan turun drastis, dan koneksi menjadi tidak stabil.",
        detail: "Jenis interferensi: (1) Co-channel interference — dua AP menggunakan channel yang sama. (2) Adjacent-channel interference — dua AP menggunakan channel yang berdekatan (misal channel 1 dan channel 2 overlap). (3) Non-WiFi interference — microwave oven, baby monitor, Bluetooth, radar, yang beroperasi di 2.4 GHz.",
        tips: "Gunakan aplikasi WiFi analyzer (misal: NetSpot, WiFi Analyzer) untuk memetakan interferensi di lokasi. Pilih channel yang paling sepi. Di 2.4 GHz, hanya gunakan channel 1, 6, atau 11 (non-overlapping)."
      },
      {
        name: "Ketinggian Antena",
        icon: "TrendingUp",
        color: "cyan",
        summary: "Antena lebih tinggi = jangkauan lebih jauh dan LoS lebih mudah.",
        description: "Semakin tinggi antena dipasang, semakin kecil kemungkinan terhalang oleh pohon, gedung, atau topografi bumi. Ini juga membantu mengatasi lengkung bumi pada jarak yang jauh.",
        detail: "Untuk link 10 km pada frekuensi 5.8 GHz, jika tidak ada penghalang sama sekali, ketinggian antena minimal yang diperlukan bisa dihitung dengan mempertimbangkan kelengkungan bumi (~8m/10km²) ditambah klirens Fresnel Zone. Umumnya antena perlu setinggi 15–30 meter atau lebih untuk link ini.",
        tips: "Gunakan software Radio Mobile atau Path Loss untuk menghitung ketinggian antena optimal berdasarkan topografi nyata lokasi Anda."
      },
      {
        name: "Gain & EIRP",
        icon: "Signal",
        color: "pink",
        summary: "Kekuatan sinyal efektif yang dipancarkan sistem nirkabel.",
        description: "Gain antena menentukan seberapa fokus dan kuat sinyal yang dipancarkan/diterima. EIRP (Effective Isotropic Radiated Power) adalah power total efektif yang dipancarkan: EIRP (dBm) = Tx Power (dBm) + Antena Gain (dBi) - Kabel Loss (dB).",
        detail: "Contoh: Radio dengan daya kirim 20 dBm (100mW) + Antena 24 dBi - Kabel loss 2 dB = EIRP 42 dBm. Di Indonesia, EIRP maksimum untuk 2.4 GHz adalah 36 dBm sesuai regulasi Kominfo. Melampaui batas ini ilegal!",
        tips: "Selalu patuhi regulasi EIRP yang berlaku. Jangan sembarangan meningkatkan power transmit karena selain ilegal, juga bisa mengganggu jaringan tetangga dan memperpendek umur radio."
      },
      {
        name: "Channel & Bandwidth",
        icon: "Layers",
        color: "indigo",
        summary: "Lebar channel menentukan kapasitas bandwidth jaringan.",
        description: "Channel adalah 'jalur' di dalam spektrum frekuensi. Lebar channel (20, 40, 80, atau 160 MHz) menentukan seberapa banyak data yang bisa ditransmisikan sekaligus — seperti lebar jalan.",
        detail: "Channel 20 MHz: Aman, banyak channel tersedia, cocok untuk lingkungan padat. | Channel 40 MHz: Throughput 2x lipat, tapi membutuhkan 2 channel → lebih mudah interferensi. | Channel 80 MHz (Wi-Fi 5): Throughput sangat tinggi, digunakan untuk backhaul. | Channel 160 MHz (Wi-Fi 6): Tertinggi, hanya ada sedikit di 5 GHz.",
        tips: "Untuk lingkungan urban padat gunakan channel 20 MHz. Untuk link PTP backhaul dengan sedikit interferensi, gunakan channel 40 atau 80 MHz untuk throughput maksimal."
      },
      {
        name: "Kondisi Cuaca & Lingkungan",
        icon: "Cloud",
        color: "slate",
        summary: "Hujan, embun, dan angin mempengaruhi kualitas sinyal nirkabel.",
        description: "Frekuensi tinggi (terutama di atas 10 GHz) sangat rentan terhadap rain fade (pelemahan sinyal akibat hujan). Pohon basah juga bisa menyerap sinyal lebih banyak dibanding ketika kering.",
        detail: "Pada frekuensi 2.4 GHz dan 5 GHz, efek hujan relatif kecil, namun angin kencang bisa menggeser posisi antena (antenna misalignment) terutama pada antena high-gain seperti grid parabola. Embun/frost pada reflektor juga bisa menyebabkan atenuasi.",
        tips: "Gunakan klem antena berkualitas tinggi (mis: stainless steel). Pertimbangkan fade margin (cadangan sinyal extra) minimal 15-20 dB dalam desain link untuk mengkompensasi kondisi cuaca buruk."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 05 — PERANGKAT
  // ─────────────────────────────────────────────────────────────
  {
    id: "05",
    title: "Perangkat Wireless",
    description: "Kenali berbagai perangkat keras yang membangun ekosistem jaringan nirkabel — dari router rumahan hingga perangkat enterprise kelas atas.",
    type: "equipment",
    intro: "Dalam membangun jaringan nirkabel, diperlukan berbagai jenis perangkat yang bekerja bersama-sama. Mulai dari perangkat yang menerima sinyal internet (router/modem), menyebarkannya (access point), hingga menghubungkan lokasi yang jauh (PTP radio).",
    content: [
      {
        name: "Access Point (AP)",
        image: images.accessPoint,
        category: "Indoor / Outdoor",
        badge: "Paling Umum",
        description: "Perangkat yang memancarkan sinyal Wi-Fi untuk perangkat end-user seperti laptop, smartphone, dan tablet. AP menerima koneksi dari switch/router melalui kabel, lalu menyebarkannya secara nirkabel.",
        detail: "Access Point berbeda dari router — AP tidak memiliki fungsi routing (NAT, DHCP). AP hanya berfungsi sebagai jembatan antara jaringan kabel dan nirkabel. Dalam instalasi enterprise, puluhan AP dikelola oleh satu kontroler terpusat.",
        usage: "Hotel, kantor, sekolah, mall, atau rumah yang membutuhkan coverage Wi-Fi yang merata.",
        features: ["Dual-band 2.4 & 5 GHz", "Mendukung ratusan klien", "Manajemen terpusat via kontroler", "PoE (Power over Ethernet) — daya dari kabel LAN"],
        examples: ["Ubiquiti UniFi AP", "Cisco Aironet", "Ruckus R550", "TP-Link EAP Series"]
      },
      {
        name: "Wireless Router",
        image: images.router,
        category: "SOHO",
        badge: "Rumahan",
        description: "Perangkat all-in-one yang menggabungkan fungsi router (NAT, DHCP, firewall), switch 4-port, dan access point Wi-Fi. Ideal untuk rumah dan usaha kecil.",
        detail: "Router rumahan biasanya mendapat koneksi internet dari modem ISP (melalui port WAN), kemudian membagikannya ke perangkat yang terhubung via Wi-Fi maupun kabel LAN. Fitur modern termasuk QoS, parental control, VPN, dan MU-MIMO.",
        usage: "Rumah, warnet, kantor kecil, kafe — situasi yang membutuhkan satu perangkat serbaguna.",
        features: ["Router + Switch + AP dalam satu unit", "NAT & DHCP bawaan", "Mudah dikonfigurasi", "Harga terjangkau"],
        examples: ["TP-Link Archer AX55", "ASUS RT-AX88U", "Xiaomi AX3600", "MikroTik hAP"]
      },
      {
        name: "CPE (Customer Premises Equipment)",
        image: images.antennaPanel,
        category: "Outdoor",
        badge: "WISP/ISP",
        description: "Perangkat penerima yang dipasang di lokasi pelanggan (biasanya di atap atau tembok menghadap tower ISP). Menangkap sinyal dari base station WISP dan membagikannya ke dalam rumah.",
        detail: "CPE memiliki antena terintegrasi (biasanya panel atau yagi) dan radio dalam satu unit kompak. Perangkat ini dikonfigurasi dalam mode 'station' atau 'client' untuk berasosiasi dengan AP tower. Daya listrik diberikan melalui PoE injector.",
        usage: "Pelanggan layanan internet WISP perdesaan, penerima sinyal hotspot komunitas.",
        features: ["Antena terintegrasi (panel/yagi)", "Tahan cuaca outdoor (IP65+)", "Daya melalui PoE", "Mode Station/Client"],
        examples: ["Ubiquiti LiteBeam M5", "TP-Link CPE510", "MikroTik SXT", "Mimosa C5x"]
      },
      {
        name: "Ubiquiti UniFi",
        image: images.accessPoint,
        category: "Enterprise",
        badge: "Pilihan Pro",
        description: "Ekosistem jaringan enterprise dari Ubiquiti yang mencakup access point, switch, router, dan kamera — semua dikelola dari satu platform software UniFi Controller.",
        detail: "UniFi dikenal dengan rasio performa-harga yang sangat baik untuk pasar enterprise. Controller berbasis web memungkinkan admin mengelola puluhan atau ratusan AP, memantau klien secara real-time, dan membuat segmentasi VLAN dengan mudah.",
        usage: "Hotel, apartemen, kampus, gedung perkantoran, venue event besar.",
        features: ["Manajemen terpusat via UniFi Controller", "Cloud-managed option", "Zero-Handoff roaming untuk mobilitas mulus", "Beragam model AP: outdoor, indoor, high-density"],
        examples: ["UniFi U6 Pro", "UniFi U6 Long Range", "UniFi U6 Mesh", "UniFi AP-AC-M"]
      },
      {
        name: "MikroTik RouterOS",
        image: images.router,
        category: "Networking",
        badge: "Fleksibel",
        description: "MikroTik memproduksi perangkat jaringan serbaguna dengan RouterOS yang sangat powerful. Populer di kalangan network engineer karena kemampuan konfigurasi yang sangat mendalam.",
        detail: "RouterOS mendukung hampir semua fitur jaringan enterprise: BGP, OSPF, MPLS, VPN, firewall berfitur penuh, traffic shaping, QoS, hotspot management, dan masih banyak lagi — dengan harga yang sangat kompetitif.",
        usage: "ISP lokal, kantor dengan kebutuhan routing kompleks, jaringan RT/RW-Net, lab jaringan.",
        features: ["RouterOS yang sangat feature-rich", "CCR (Cloud Core Router) untuk ISP besar", "hAP, RB series untuk SOHO", "Winbox/WebFig GUI yang intuitif"],
        examples: ["MikroTik hAP ac²", "MikroTik RB951G", "MikroTik CCR2116", "MikroTik CRS series"]
      },
      {
        name: "TP-Link Pharos (Outdoor)",
        image: images.antennaPanel,
        category: "Outdoor WISP",
        badge: "Entry Level",
        description: "Lini produk outdoor TP-Link Pharos dirancang untuk link nirkabel jarak jauh dengan antena terintegrasi. Menawarkan performa yang cukup baik dengan harga terjangkau.",
        detail: "Pharos CPE menggunakan antena panel terintegrasi dengan gain 13–23 dBi. Mendukung mode AP, Station, WDS Bridge, dan Repeater. Dilengkapi dengan fitur Pharos Control untuk manajemen multi-AP.",
        usage: "WISP skala kecil-menengah, jaringan RT/RW-Net, koneksi antar gedung.",
        features: ["Gain antena 13–23 dBi", "Outdoor waterproof (IP65)", "Dual polarization (CPE710)", "Harga sangat terjangkau"],
        examples: ["TP-Link CPE510 (5 GHz, 13 dBi)", "TP-Link CPE610 (5 GHz, 23 dBi)", "TP-Link CPE710 (5 GHz, 23 dBi dual-pol)"]
      },
      {
        name: "PoE Injector & Switch PoE",
        image: images.accessPoint,
        category: "Power",
        badge: "Infrastruktur",
        description: "Power over Ethernet (PoE) memungkinkan pengiriman listrik melalui kabel LAN bersamaan dengan data. Sangat penting untuk AP dan CPE yang dipasang di lokasi tanpa stopkontak.",
        detail: "Standar PoE: 802.3af (15.4W), 802.3at/PoE+ (30W), 802.3bt/PoE++ (60W/90W). AP indoor modern biasanya cukup 802.3af. AP outdoor high-performance atau perangkat heating mungkin membutuhkan 802.3at/bt. Passive PoE (24V) digunakan oleh beberapa perangkat Ubiquiti dan MikroTik.",
        usage: "Memberi daya ke AP, IP Camera, VoIP phone, CPE yang jauh dari sumber listrik.",
        features: ["Eliminasi kebutuhan kabel listrik terpisah", "Jarak maksimum 100 meter (per segmen)", "Standar 802.3af/at/bt untuk kompatibilitas lintas merek", "Passive PoE 24V/48V untuk perangkat tertentu"],
        examples: ["TP-Link TL-PoE150S (PoE+ Injector)", "Ubiquiti POE-24 (Passive 24V)", "NETGEAR GS308P (Switch 8-port PoE)"]
      },
      {
        name: "Wireless Bridge (PTP Radio)",
        image: images.antennaParabolic,
        category: "Backhaul",
        badge: "Jarak Jauh",
        description: "Perangkat khusus yang dirancang untuk membentuk link wireless point-to-point jarak jauh. Biasanya sudah termasuk antena terintegrasi atau port untuk antena eksternal.",
        detail: "PTP radio beroperasi dalam mode bridge — semua traffic dari satu sisi diteruskan ke sisi lain seolah terhubung kabel. Beberapa mendukung IEEE 802.1Q VLAN tagging untuk membawa multiple VLAN melewati satu link.",
        usage: "Menghubungkan dua kantor yang berbeda gedung/kota, backhaul untuk repeater atau BTS.",
        features: ["Throughput hingga 1+ Gbps (tergantung model)", "Link jarak 1–100+ km", "Fitur AES encryption untuk keamanan link", "Adaptive coding & modulation"],
        examples: ["Ubiquiti PowerBeam M5", "Cambium PTP 450", "MikroTik NetMetal 5", "Mimosa B5c"]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 06 — KEAMANAN
  // ─────────────────────────────────────────────────────────────
  {
    id: "06",
    title: "Keamanan & Kerentanan Jaringan Nirkabel",
    description: "Jaringan nirkabel pada dasarnya bersifat terbuka — sinyal radio merambat ke mana-mana. Pahami ancaman yang ada dan cara melindungi diri.",
    type: "security",
    intro: "Berbeda dengan kabel yang membutuhkan akses fisik untuk disadap, siapa pun yang berada dalam jangkauan sinyal berpotensi mendengarkan komunikasi nirkabel. Karena itu, keamanan adalah aspek yang tidak bisa diabaikan.",
    protocols: [
      { name: "WEP (1999)", status: "broken", level: 1, description: "Wired Equivalent Privacy — algoritma enkripsi pertama untuk Wi-Fi. Menggunakan RC4 dengan kunci 40 atau 104 bit. SUDAH TIDAK AMAN — dapat dibobol dalam hitungan menit menggunakan tools gratis." },
      { name: "WPA (2003)", status: "weak", level: 2, description: "Wi-Fi Protected Access — perbaikan dari WEP menggunakan TKIP (Temporal Key Integrity Protocol). Lebih baik dari WEP tetapi masih memiliki kelemahan pada TKIP." },
      { name: "WPA2 (2004)", status: "good", level: 3, description: "Menggunakan AES-CCMP — enkripsi yang jauh lebih kuat. WPA2-Personal (PSK) cocok untuk rumah. WPA2-Enterprise menggunakan server RADIUS untuk autentikasi per-pengguna. Masih cukup aman jika menggunakan password kuat." },
      { name: "WPA3 (2018)", status: "best", level: 4, description: "Standar keamanan terbaru. Menggunakan SAE (Simultaneous Authentication of Equals) yang menggantikan PSK — lebih tahan terhadap serangan dictionary/brute force. WPA3-Enterprise menggunakan enkripsi 192-bit." }
    ],
    threats: [
      {
        name: "Evil Twin / Rogue AP",
        severity: "high",
        description: "Penyerang membuat Access Point palsu dengan nama (SSID) yang identik atau mirip dengan AP asli. Korban tanpa sadar terhubung ke AP palsu.",
        howItWorks: "Penyerang menempatkan AP palsu dengan sinyal lebih kuat dari AP asli. Perangkat korban otomatis berpindah ke AP palsu. Semua traffic korban dapat dipantau (Man-in-the-Middle).",
        prevention: "Selalu gunakan HTTPS, VPN, dan hindari melakukan aktivitas sensitif di Wi-Fi publik. Gunakan sistem WIDS/WIPS untuk mendeteksi rogue AP."
      },
      {
        name: "Brute Force Password",
        severity: "high",
        description: "Penyerang mencoba ribuan atau jutaan kemungkinan password untuk mendapatkan akses ke jaringan.",
        howItWorks: "Penyerang menangkap 'handshake' WPA2 saat perangkat terhubung, lalu mencoba memecahkannya secara offline menggunakan dictionary attack atau brute force.",
        prevention: "Gunakan password minimal 12 karakter, gabungan huruf besar-kecil, angka, dan simbol. Gunakan WPA3 yang tahan terhadap serangan offline."
      },
      {
        name: "Packet Sniffing",
        severity: "medium",
        description: "Penyadapan paket data yang dikirimkan melalui jaringan nirkabel, terutama pada jaringan yang tidak terenkripsi atau menggunakan enkripsi lemah.",
        howItWorks: "Dengan mode 'monitor' pada adapter Wi-Fi, penyerang dapat menangkap semua paket yang melintas di udara. Pada jaringan tanpa enkripsi, isi data dapat langsung dibaca.",
        prevention: "Selalu gunakan HTTPS untuk browsing. Gunakan VPN untuk mengenkripsi seluruh traffic. Aktifkan WPA2/WPA3 dengan password kuat."
      },
      {
        name: "Deauthentication Attack",
        severity: "medium",
        description: "Penyerang mengirimkan paket 'deauthentication' palsu yang memaksa perangkat memutuskan koneksi dari AP. Biasanya digunakan untuk memaksa reconnect guna menangkap handshake WPA.",
        howItWorks: "Protokol Wi-Fi awal tidak mengautentikasi frame manajemen. Penyerang dapat memalsukan paket deauthentication yang terlihat berasal dari AP sah, memutuskan koneksi klien.",
        prevention: "WPA3 dan fitur Management Frame Protection (802.11w) melindungi dari serangan ini. Pastikan AP mendukung dan mengaktifkan fitur ini."
      },
      {
        name: "WPS PIN Attack",
        severity: "medium",
        description: "Wi-Fi Protected Setup (WPS) memiliki kelemahan desain pada metode PIN 8 digit — PIN diverifikasi dalam dua bagian terpisah, sehingga hanya perlu 11.000 percobaan (bukan 100 juta).",
        howItWorks: "Penyerang menggunakan tools seperti Reaver untuk bruteforce PIN WPS. Proses ini bisa berlangsung beberapa jam hingga hari.",
        prevention: "Nonaktifkan WPS pada router Anda! Terutama metode PIN WPS. Gunakan metode koneksi biasa (password WPA2/3)."
      }
    ],
    scenario: {
      title: "Skenario Keamanan Interaktif",
      question: "Anda adalah admin jaringan di sebuah kafe. Beberapa pelanggan mengeluh koneksi lambat dan mencurigai ada AP palsu di sekitar. Apa yang Anda lakukan?",
      options: [
        { text: "Mengabaikan laporan pelanggan karena koneksi masih berjalan", correct: false, feedback: "Salah! Mengabaikan laporan bisa berbahaya. AP palsu (Evil Twin) dapat mencuri data sensitif pelanggan yang tidak curiga." },
        { text: "Scan jaringan dengan WIDS/WiFi analyzer untuk mencari AP dengan SSID mirip", correct: true, feedback: "Benar! Gunakan tools seperti WiFi Analyzer atau sistem WIDS (Wireless Intrusion Detection) untuk mengidentifikasi AP mencurigakan. Bandingkan BSSID (MAC address) AP yang terdeteksi." },
        { text: "Meningkatkan power transmit AP agar lebih kuat dari AP palsu", correct: false, feedback: "Salah! Ini melanggar regulasi EIRP dan tidak menyelesaikan masalah. AP palsu bisa terus ikut meningkatkan powernya juga." },
        { text: "Memberitahu seluruh pelanggan SSID dan password baru melalui media sosial", correct: false, feedback: "Salah! Ini malah menyebarkan password ke publik dan tidak menyelesaikan masalah AP palsu." }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 07 — TEKNOLOGI WIRELESS
  // ─────────────────────────────────────────────────────────────
  {
    id: "07",
    title: "Jenis Teknologi Wireless",
    description: "Wi-Fi bukan satu-satunya teknologi nirkabel. Ada berbagai teknologi dengan jangkauan, kecepatan, dan kegunaan yang berbeda-beda.",
    type: "tech-comparison",
    intro: "Ekosistem teknologi nirkabel sangat luas. Selain Wi-Fi yang kita gunakan sehari-hari, ada Bluetooth untuk jarak dekat, Zigbee untuk IoT hemat daya, LoRa untuk jangkauan sangat jauh, dan masih banyak lagi.",
    content: [
      {
        name: "Wi-Fi 4 (802.11n)",
        year: "2009",
        freq: "2.4 & 5 GHz",
        speed: "600 Mbps",
        range: "~70 m (indoor)",
        power: "Medium",
        usecase: "Laptop, smartphone generasi sebelumnya",
        features: "MIMO (Multiple-Input Multiple-Output) pertama kali diperkenalkan. Dual-band pertama. Backward compatible ke 802.11a/b/g.",
        pros: "Dual-band, MIMO, jangkauan lebih baik dari generasi sebelumnya.",
        cons: "Sudah mulai usang. Tidak mendukung MU-MIMO.",
        color: "slate",
        category: "WiFi"
      },
      {
        name: "Wi-Fi 5 (802.11ac)",
        year: "2014",
        freq: "5 GHz",
        speed: "3.5 Gbps",
        range: "~35 m (indoor)",
        power: "Medium-High",
        usecase: "4K streaming, gaming, laptop modern",
        features: "MU-MIMO (multi-user), saluran hingga 160 MHz, Beamforming, Wave 2 menghadirkan 4x4 MIMO.",
        pros: "Kecepatan Gigabit pertama, MU-MIMO, efisien untuk multi-device.",
        cons: "5 GHz tidak penetratif seperti 2.4 GHz. Tidak efisien di lingkungan sangat padat.",
        color: "blue",
        category: "WiFi"
      },
      {
        name: "Wi-Fi 6 (802.11ax)",
        year: "2019",
        freq: "2.4 & 5 GHz",
        speed: "9.6 Gbps",
        range: "~35 m (indoor)",
        power: "Optimized",
        usecase: "Stadion, mal, lingkungan padat perangkat, IoT",
        features: "OFDMA (bisa melayani banyak klien bersamaan efisien), TWT untuk hemat baterai IoT, 8x8 MU-MIMO, BSS Coloring (kurangi interferensi).",
        pros: "Efisiensi spektrum jauh lebih baik, hemat baterai IoT (TWT), performa konsisten di lingkungan padat.",
        cons: "Membutuhkan perangkat klien yang juga mendukung Wi-Fi 6 untuk manfaat penuh.",
        color: "primary",
        category: "WiFi"
      },
      {
        name: "Wi-Fi 6E",
        year: "2021",
        freq: "6 GHz",
        speed: "9.6 Gbps",
        range: "~30 m (indoor)",
        power: "Optimized",
        usecase: "AR/VR, ultra-HD video, link backhaul indoor",
        features: "Semua fitur Wi-Fi 6 ditambah akses ke pita 6 GHz yang BERSIH (minim interferensi, karena perangkat lama tidak bisa mengaksesnya).",
        pros: "Spektrum 6 GHz sangat bersih dari interferensi. 14 channel 80 MHz atau 7 channel 160 MHz tersedia.",
        cons: "Jangkauan lebih pendek dari 5 GHz. Regulasi 6 GHz bervariasi antar negara.",
        color: "emerald",
        category: "WiFi"
      },
      {
        name: "Wi-Fi 7 (802.11be)",
        year: "2024+",
        freq: "2.4, 5, 6 GHz",
        speed: "46 Gbps",
        range: "~35 m (indoor)",
        power: "Optimized",
        usecase: "8K streaming, cloud gaming, XR (Extended Reality), industri 4.0",
        features: "Multi-Link Operation (MLO) — gunakan beberapa band sekaligus. Channel hingga 320 MHz. 16x16 MU-MIMO. 4096-QAM (modulasi lebih efisien).",
        pros: "Latensi ultra-rendah berkat MLO, throughput masif, sangat futuristik.",
        cons: "Perangkat masih sangat baru dan mahal. Ekosistem masih berkembang.",
        color: "purple",
        category: "WiFi"
      },
      {
        name: "Bluetooth",
        year: "1999",
        freq: "2.4 GHz",
        speed: "3 Mbps (Classic) / 50 Mbps (BT 5.x LE)",
        range: "10–100 m",
        power: "Very Low (BLE)",
        usecase: "Audio nirkabel, wearable, keyboard, mouse, sensor IoT",
        features: "Bluetooth Classic untuk audio/data. Bluetooth Low Energy (BLE) untuk IoT hemat daya. BT 5.0+ menghadirkan Broadcast Audio (Auracast).",
        pros: "Sangat hemat daya (BLE), ubiquitous (ada di semua smartphone), banyak profil standar (A2DP, HFP, GATT).",
        cons: "Kecepatan rendah dibanding Wi-Fi, jangkauan terbatas.",
        color: "blue",
        category: "Short Range"
      },
      {
        name: "Zigbee",
        year: "2004",
        freq: "2.4 GHz",
        speed: "250 Kbps",
        range: "10–100 m",
        power: "Ultra Low",
        usecase: "Smart home (lampu, sensor suhu, smart lock), industri",
        features: "Topologi mesh — perangkat Zigbee dapat melewatkan sinyal satu sama lain (relay). Daya sangat rendah — baterai AA bisa bertahan bertahun-tahun.",
        pros: "Mesh networking, ultra-low power, standar terbuka, cocok untuk jaringan sensor besar.",
        cons: "Kecepatan sangat rendah, tidak cocok untuk transfer data besar.",
        color: "orange",
        category: "IoT"
      },
      {
        name: "LoRa / LoRaWAN",
        year: "2013",
        freq: "433/868/915 MHz (sub-GHz)",
        speed: "0.3–50 Kbps",
        range: "2–15 km (urban), 40+ km (rural/LoS)",
        power: "Ultra Low",
        usecase: "Smart city, pertanian pintar, pelacak GPS, monitoring lingkungan",
        features: "Jangkauan sangat jauh dengan daya sangat rendah (LPWAN). LoRaWAN adalah protokol jaringan di atas LoRa yang mendukung keamanan end-to-end AES-128.",
        pros: "Jangkauan luar biasa jauh (km), hemat daya ekstrem, penetrasi gedung sangat baik (sub-GHz).",
        cons: "Bandwidth sangat rendah — hanya cocok untuk paket data kecil.",
        color: "green",
        category: "LPWAN"
      },
      {
        name: "NFC (Near Field Communication)",
        year: "2004",
        freq: "13.56 MHz",
        speed: "424 Kbps",
        range: "~4 cm",
        power: "Passive (no battery needed for tag)",
        usecase: "Pembayaran nirsentuh (e-money, kartu kredit), akses kartu, pairing Bluetooth",
        features: "Tag NFC bisa pasif (tidak butuh baterai) — perangkat pembaca menginduksi arus listrik ke tag. Tiga mode: read/write, peer-to-peer, card emulation.",
        pros: "Sangat aman karena jarak sangat pendek (hampir mustahil disadap dari jauh), tidak butuh pairing, instan.",
        cons: "Jangkauan sangat pendek (<4 cm), kecepatan sangat rendah.",
        color: "slate",
        category: "Short Range"
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 08 — KELEBIHAN & KEKURANGAN
  // ─────────────────────────────────────────────────────────────
  {
    id: "08",
    title: "Kelebihan, Kekurangan & Tantangan",
    description: "Tidak ada teknologi yang sempurna. Memahami pro dan kontra jaringan nirkabel membantu dalam membuat keputusan desain yang tepat.",
    type: "pros-cons-extended",
    intro: "Jaringan nirkabel menawarkan fleksibilitas yang luar biasa, namun juga datang dengan keterbatasan dan tantangan tersendiri. Klik setiap kartu untuk melihat penjelasan lebih lengkap.",
    content: {
      pros: [
        { title: "Mobilitas Penuh", description: "Pengguna dapat bergerak bebas sambil tetap terhubung ke jaringan tanpa perlu mencabut dan menancapkan kabel. Ini memungkinkan pola kerja modern yang fleksibel.", detail: "Dengan teknologi seperti seamless roaming (802.11r) dan Zero-Handoff pada sistem enterprise, pengguna bahkan bisa berpindah antar AP tanpa terputus — koneksi VoIP pun tetap berjalan lancar." },
        { title: "Instalasi Fleksibel & Cepat", description: "Tidak perlu menarik kabel melalui dinding, langit-langit, atau lantai. Jaringan Wi-Fi dapat dipasang dalam hitungan jam.", detail: "Sangat menguntungkan untuk gedung bersejarah yang tidak boleh dilubangi, atau instalasi sementara seperti acara atau pameran yang membutuhkan jaringan dalam waktu singkat." },
        { title: "Pengurangan Kabel", description: "Mengurangi biaya dan kerumitan manajemen kabel fisik, terutama di area yang luas atau sulit dijangkau kabel.", detail: "Di gedung bertingkat tinggi, biaya penarikan kabel bisa mencapai jutaan rupiah. Wi-Fi mengeliminasi sebagian besar biaya tersebut, meskipun tetap dibutuhkan kabel untuk backbone dan power AP." },
        { title: "Mudah Diperluas (Scalable)", description: "Menambah coverage area hanya membutuhkan penambahan AP baru, tanpa infrastruktur kabel yang rumit.", detail: "Sistem mesh Wi-Fi modern bahkan memungkinkan penambahan node tanpa konfigurasi manual — sistem otomatis menyesuaikan routing dan channel untuk optimasi." },
        { title: "Konektivitas di Area Sulit", description: "Menjangkau area yang tidak mungkin atau sangat mahal dijangkau kabel: lahan pertanian, kawasan hutan, daerah pegunungan, dan pulau-pulau terpencil.", detail: "WISP (Wireless Internet Service Provider) memanfaatkan ini untuk memberikan internet ke desa-desa terpencil menggunakan link PTP/PTMP dengan antena directional." }
      ],
      cons: [
        { title: "Rentan Interferensi", description: "Spektrum frekuensi adalah sumber daya terbatas yang digunakan bersama. Terlalu banyak AP di area yang sama menyebabkan interferensi dan penurunan performa.", detail: "Di apartemen padat, setiap unit mungkin punya router sendiri. Jika semua menggunakan channel yang sama, throughput efektif tiap router bisa turun hingga 50-80% dari kapasitas nominalnya." },
        { title: "Keamanan Lebih Kompleks", description: "Sinyal nirkabel merambat melewati dinding dan bisa diterima oleh siapa saja dalam jangkauan. Ini menciptakan permukaan serangan yang jauh lebih luas dibanding kabel.", detail: "Dengan kabel, penyerang harus mendapatkan akses fisik ke jaringan. Dengan Wi-Fi, cukup berada dalam radius sinyal. Enkripsi yang lemah (WEP, WPA-TKIP) atau password yang mudah ditebak bisa membahayakan seluruh jaringan." },
        { title: "Jangkauan & Penetrasi Terbatas", description: "Sinyal Wi-Fi semakin melemah dengan jarak dan penghalang. Dinding beton, logam, dan interferensi dapat sangat mengurangi jangkauan.", detail: "Dinding beton 15 cm bisa mengurangi sinyal 2.4 GHz sekitar 10-15 dB. Lemari logam bisa memantulkan dan menyerap sinyal. Lantai beton bertulang sangat sulit ditembus bahkan oleh 2.4 GHz." },
        { title: "Bandwidth Dibagi (Shared Medium)", description: "Dalam Wi-Fi, semua perangkat di area yang sama berbagi medium yang sama. Semakin banyak perangkat aktif, semakin sedikit bandwidth yang tersedia untuk masing-masing.", detail: "Ini adalah sifat inheren wireless (half-duplex pada protokol legacy). Wi-Fi 6 dengan OFDMA mulai mengatasi masalah ini dengan melayani banyak klien secara bersamaan dalam satu transmisi, tapi masih ada overhead manajemen." },
        { title: "Dipengaruhi Kondisi Fisik", description: "Perubahan lingkungan fisik — pohon bertumbuh, gedung baru dibangun, cuaca buruk, atau bahkan manusia yang bergerak — dapat mempengaruhi kualitas link nirkabel.", detail: "Khususnya untuk link outdoor jarak jauh (PTP/PTMP), rain fade, angin kencang yang menggeser antena, dan vegetasi yang tumbuh bisa mengubah link yang semula baik menjadi tidak stabil." }
      ],
      challenges: [
        { title: "Obstacle & Multipath", description: "Sinyal radio yang memantul dari berbagai permukaan menciptakan banyak salinan sinyal yang tiba di penerima pada waktu berbeda (multipath). Ini menyebabkan interferensi terhadap diri sendiri (Inter-Symbol Interference/ISI).", solution: "Teknologi OFDM (Orthogonal Frequency Division Multiplexing) dan MIMO (Multiple-Input Multiple-Output) dirancang khusus untuk memanfaatkan efek multipath daripada melawannya." },
        { title: "Manajemen Spektrum", description: "Spektrum frekuensi adalah sumber daya alam yang terbatas dan diatur secara ketat oleh pemerintah. Penggunaan frekuensi yang tidak tepat bisa melanggar hukum dan mengakibatkan interferensi masif.", solution: "Di Indonesia, penggunaan frekuensi diatur oleh Kementerian Komunikasi dan Informatika (Kominfo). Pita 2.4 GHz dan 5.8 GHz unlicensed, namun tetap ada batasan power (EIRP). Operator seluler membeli lisensi frekuensi dari pemerintah." },
        { title: "Skalabilitas di Lingkungan Sangat Padat", description: "Merancang jaringan Wi-Fi untuk ribuan perangkat di area terbatas (stadion, konser, pameran) adalah tantangan engineering yang sangat kompleks.", solution: "Pendekatan: High Density WLAN design menggunakan AP dengan daya rendah yang banyak (bukan sedikit AP dengan daya tinggi). Setiap AP hanya melayani puluhan klien. Teknologi seperti Band Steering, OFDMA (Wi-Fi 6), dan agresifnya penggunaan 5/6 GHz." }
      ]
    }
  }
];
