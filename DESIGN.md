# DESIGN.md: NetLab RF (Media Pembelajaran Jaringan Nirkabel)

## 1. Identitas & Karakter Produk
- **Nama Produk**: **NetLab RF** (Laboratorium Pembelajaran Interaktif Jaringan Nirkabel / IEEE 802.11)
- **Audiens**: Mahasiswa Pendidikan Teknik Informatika / Teknik Telekomunikasi dan siswa SMK Teknik Komputer & Jaringan (TKJ).
- **Karakter Visual**: *Precision RF Engineering Field Manual meets W3Schools Pedagogical Clarity*. Menggabungkan kejelasan struktur tutorial W3Schools (mudah dipindai, kotak eksperimen "Coba Sendiri" langsung di dalam bab, navigasi maju-mundur yang jelas) dengan estetika instrumen spektrum frekuensi radio (telemetri `dBm`, `GHz`, koordinat node, dan simulasi ruang 3D WebGL).
- **Design Read**:
  > Reading this as: `Interactive RF & Wireless Engineering Learning Platform` for `Informatics & Telecom Students`, in a `Precision RF Lab & W3Schools Structured Technical Reference` style, dial `ENERGY 2 / RHYTHM 3 / MOTION 2`.

## 2. Pengaturan Dials (Liveliness Toolkit)
- **ENERGY: 2 (Balanced)** — Tegas dan teknis pada kanvas simulasi 3D di beranda dan laboratorium bab, namun tenang dan bersih pada area bacaan teks panjang agar mata tidak lelah.
- **RHYTHM: 3 (Varied / Asymmetric)** — Komposisi antar bagian berubah sesuai fungsi konten: Hero beranda menggunakan grid asimetris 7:5 (Teks + Telemetri di kiri, Kanvas 3D Interaktif di kanan), diikuti pita kalkulator cepat *Free Space Path Loss* (FSPL), dan peta kurikulum interaktif dua kolom.
- **MOTION: 2 (Scroll-reveal, Spring Physics & Controlled 3D)** — Transisi antarmuka menggunakan pegas `framer-motion` untuk umpan balik interaksi (perpindahan bab, pemilihan frekuensi 3D, kartu soal), dilengkapi kontrol Jeda/Putar (Pause/Play) untuk objek 3D yang bergerak kontinu serta kepatuhan penuh pada `prefers-reduced-motion: reduce`.

## 3. Palet Warna (Maksimum 3 Warna Inti + 1 Aksen — R-29)
Tidak menggunakan gradien biru-ungu atau neon tanpa tujuan. Seluruh pasangan teks dan latar belakang memenuhi standar WCAG AA (>= 4.5:1 untuk teks normal, >= 3.0:1 untuk teks besar dan batas komponen).

1. **Inti 1 — Permukaan & Tinta Teknis (Slate / Carbon Neutral)**:
   - *Light Mode*: Latar utama `#f8fafc` (`slate-50`), kartu `#ffffff`, teks utama `#0f172a` (`slate-900`, rasio 17.4:1), teks sekunder `#334155` (`slate-700`, rasio 10.3:1), teks tersier/label `#475569` (`slate-600`, rasio 7.0:1).
   - *Dark Mode*: Latar utama `#090d16`, kartu `#0f172a` (`slate-900`), panel sekunder `#1e293b` (`slate-800`), teks utama `#f8fafc` (rasio 17.8:1), teks sekunder `#cbd5e1` (`slate-300`, rasio 11.9:1), teks tersier `#94a3b8` (`slate-400`, rasio 6.4:1 di atas `#0f172a`).
2. **Inti 2 — Gelombang Pembawa / Signal Cyan-Blue (`primary`)**:
   - `#0369a1` (`sky-700`, rasio 5.9:1 di atas putih) untuk tombol aksi utama, indikator bab aktif, dan pancaran gelombang 5 GHz. Pada mode gelap menggunakan `#38bdf8` (`sky-400`, rasio 8.6:1 di atas `#0f172a`).
3. **Inti 3 — Pedagogi & Laboratorium "Coba Sendiri" (`emerald`)**:
   - `#047857` (`emerald-700`, rasio 5.5:1 di atas putih) dan `#10b981` (pada latar gelap) sebagai penanda khusus blok interaktif **"Coba Sendiri (Try It Yourself)"** ala W3Schools, status kelulusan bab, serta indikator *Line of Sight (LoS)* aman.
4. **Aksen Tunggal — Peringatan Atenuasi & Fokus Spektrum (`amber`)**:
   - `#b45309` (`amber-700`, rasio 5.0:1 di atas putih) dan `#f59e0b` (pada latar gelap) digunakan secara hemat hanya untuk sorotan titik fokus (peringatan halangan *Fresnel Zone*, indikator soal ditandai ragu-ragu, dan sorotan metrik kritis).

## 4. Tipografi (R-06)
- **Huruf Utama (Sans)**: `Plus Jakarta Sans`, `Inter`, atau sistem sans-serif geometris untuk keterbacaan optimal teks akademik bahasa Indonesia dengan tinggi baris (`line-height`) `1.65` pada paragraf materi.
- **Huruf Teknis (Monospace)**: `JetBrains Mono` / `Fira Code` digunakan **hanya** untuk data teknis nyata: nomor standar IEEE (`802.11be`), frekuensi (`5.8 GHz`), satuan daya (`36 dBm`, `24 dBi`), rumus *Link Budget*, BSSID/MAC address, dan blok kode/konfigurasi di kotak "Coba Sendiri".

## 5. Motif Identitas (Identity Motif)
- **Emblem Vektor Zona Fresnel (`BrandLogo`)**: Menggantikan ikon stok dengan diagram SVG kustom *First Fresnel Zone* ($F_1$), batas *clearance* 60% putus-putus, gelombang pembawa termodulasi, dan sepasang antena dipol TX/RX berdampingan dengan wordmark `NetLab RF`.
- **Label Indeks Telemetri**: Setiap modul dan simulasi memiliki header berformat indeks teknis seperti `[BAB 02 // 10 MNT]` atau `[LAB-RF // FRESNEL & EIRP]` dengan font monospace berukuran kecil dan kontras tinggi.
- **Kotak "Coba Sendiri" (W3Schools Lab Box)**: Setiap bab memiliki komponen interaktif berbingkai hijau zamrud (`emerald`) di sisi atas dengan tombol eksperimen langsung agar pengguna dapat mengubah variabel teknis dan melihat hasilnya seketika tanpa meninggalkan halaman materi.

## 6. Alasan Keputusan Visual (R-31 One-Line Reasons)
- **Mengapa menggunakan emblem SVG kustom Zona Fresnel dan navigasi teks tanpa ikon?** Menghindari kesan template AI-slop dari ikon stok di dalam kotak warna sekaligus langsung merepresentasikan konsep inti propagasi nirkabel (elips Fresnel & gelombang pembawa) pada identitas merek.
- **Mengapa palet Sky-Cyan, Emerald, dan Slate?** Mencerminkan layar instrumen penganalisis spektrum RF (Cyan/Slate) sekaligus mempertahankan kejelasan visual ala W3Schools (Emerald untuk laboratorium praktik) dengan kontras WCAG AA penuh.
- **Mengapa tata letak Beranda menggunakan kanvas 3D *full-viewport* yang dikendalikan guliran (*scroll-driven*)?** Agar pengunjung langsung menjelajahi cakupan 8 stasiun bab di sekitar *Access Point* secara spasial tanpa terhalang kotak pembungkus atau kartu statistik dekoratif.
- **Mengapa tata letak Materi 3-kolom bergaya W3Schools?** Memudahkan mahasiswa berpindah antar bab (sidebar kiri), membaca teori & mencoba simulasi langsung di tempat (kolom tengah), serta melompat ke sub-topik spesifik (daftar isi kanan).
- **Mengapa sistem radius bertingkat (`rounded-lg` untuk tombol/input, `rounded-xl` untuk kartu materi, `rounded-2xl` untuk kanvas 3D)?** Membedakan fungsi elemen secara visual: kontrol input tampak presisi, sementara kanvas simulasi 3D terbingkai jelas sebagai jendela instrumen.
- **Mengapa menyediakan Mode Terang dan Gelap?** Mahasiswa sering membaca materi panjang di ruang terang (nyaman dengan Light Mode) namun juga melakukan simulasi visualisasi 3D di malam hari (nyaman dengan Dark Mode).
