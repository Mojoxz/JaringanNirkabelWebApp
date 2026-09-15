import { images } from './images';

export const questions = [
  {
    id: 1,
    question: "Apa standar IEEE yang merujuk pada teknologi Wi-Fi yang kita gunakan sehari-hari?",
    options: ["802.3", "802.11", "802.15", "802.16"],
    answer: 1 // index 1 (802.11)
  },
  {
    id: 2,
    question: "Jenis antena apakah yang paling cocok digunakan untuk menyebarkan sinyal Wi-Fi di tengah ruangan (360 derajat)?",
    options: ["Antena Grid", "Antena Yagi", "Antena Omni Directional", "Antena Sectoral"],
    answer: 2
  },
  {
    id: 3,
    question: "Manakah dari teknologi berikut yang dirancang khusus untuk mengatasi kepadatan perangkat (high density) dengan fitur OFDMA?",
    options: ["Wi-Fi 4", "Wi-Fi 5", "Wi-Fi 6", "Bluetooth"],
    answer: 2
  },
  {
    id: 4,
    question: "Dalam membangun link nirkabel jarak jauh, rintangan fisik di antara dua antena disebut mengganggu faktor apa?",
    options: ["Line of Sight (LoS)", "Channel Width", "Bandwidth", "SSID"],
    answer: 0
  },
  {
    id: 5,
    question: "Topologi jaringan nirkabel di mana satu Access Point melayani banyak Client Station disebut:",
    options: ["Point-to-Point (PTP)", "Point-to-Multipoint (PTMP)", "Mesh Network", "Ad-hoc"],
    answer: 1
  },
  {
    id: 6,
    question: "Jenis antena apakah yang ditunjukkan pada gambar ini?",
    image: images.antennaParabolic,
    options: ["Omnidirectional", "Parabolic/Grid", "Panel", "Yagi"],
    answer: 1
  },
  {
    id: 7,
    question: "Manakah protokol keamanan nirkabel yang paling tidak aman dan mudah diretas saat ini?",
    options: ["WPA2", "WPA3", "WEP", "WPA-Enterprise"],
    answer: 2
  },
  {
    id: 8,
    question: "Frekuensi berapakah yang lebih baik dalam menembus halangan/tembok namun rentan terhadap interferensi dari perangkat lain (seperti microwave)?",
    options: ["2.4 GHz", "5 GHz", "6 GHz", "60 GHz"],
    answer: 0
  },
  {
    id: 9,
    question: "Serangan di mana penyerang membuat Access Point palsu dengan nama yang mirip dengan AP asli disebut:",
    options: ["DDoS", "Evil Twin / Rogue AP", "Ransomware", "SQL Injection"],
    answer: 1
  },
  {
    id: 10,
    question: "Area berbentuk elips di antara pemancar dan penerima yang harus bebas halangan untuk menjaga kualitas sinyal radio disebut:",
    options: ["Dead Zone", "Fresnel Zone", "Hotspot", "Coverage Area"],
    answer: 1
  }
];
