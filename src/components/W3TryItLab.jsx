import { useState } from 'react';
import { Terminal, CheckCircle2, AlertTriangle, Sliders } from 'lucide-react';

const IEEE_STANDARDS = [
  { id: '802.11-1997', name: '802.11 (1997)', wifiGen: 'Legacy', maxMbps: 2, realMbps: 1.2, band: '2.4 GHz', mod: 'DSSS / FHSS', mimo: '1x1 SISO' },
  { id: '802.11b', name: '802.11b (1999)', wifiGen: 'Wi-Fi 1', maxMbps: 11, realMbps: 5.5, band: '2.4 GHz', mod: 'HR-DSSS (CCK)', mimo: '1x1 SISO' },
  { id: '802.11g', name: '802.11g (2003)', wifiGen: 'Wi-Fi 3', maxMbps: 54, realMbps: 24, band: '2.4 GHz', mod: 'OFDM (64-QAM)', mimo: '1x1 SISO' },
  { id: '802.11n', name: '802.11n (2009)', wifiGen: 'Wi-Fi 4', maxMbps: 600, realMbps: 220, band: '2.4 / 5 GHz', mod: 'OFDM (64-QAM)', mimo: '4x4 MIMO' },
  { id: '802.11ac', name: '802.11ac (2014)', wifiGen: 'Wi-Fi 5', maxMbps: 3500, realMbps: 1100, band: '5 GHz', mod: 'OFDM (256-QAM)', mimo: '4x4 MU-MIMO' },
  { id: '802.11ax', name: '802.11ax (2019)', wifiGen: 'Wi-Fi 6', maxMbps: 9600, realMbps: 3200, band: '2.4 / 5 GHz', mod: 'OFDMA (1024-QAM)', mimo: '8x8 MU-MIMO' },
  { id: '802.11be', name: '802.11be (2024)', wifiGen: 'Wi-Fi 7', maxMbps: 46000, realMbps: 12000, band: '2.4 / 5 / 6 GHz', mod: 'OFDMA (4096-QAM + MLO)', mimo: '16x16 MU-MIMO' },
];

export default function W3TryItLab({ chapterId }) {
  // Chapter 01 state
  const [stdIndex, setStdIndex] = useState(5);
  const [fileSizeGb, setFileSizeGb] = useState(2);

  // Chapter 02 state
  const [antennaGainDbi, setAntennaGainDbi] = useState(15);

  // Chapter 03 state
  const [sectorCapMbps, setSectorCapMbps] = useState(450);
  const [cpeCount, setCpeCount] = useState(20);

  // Chapter 04 state
  const [txPowerDbm, setTxPowerDbm] = useState(18);
  const [gainDbi4, setGainDbi4] = useState(23);
  const [cableLossDb, setCableLossDb] = useState(2);
  const [distKm4, setDistKm4] = useState(8);
  const [freqGhz4, setFreqGhz4] = useState(5.8);

  // Chapter 05 state
  const [poeStd, setPoeStd] = useState('at');
  const [cableMeters, setCableMeters] = useState(45);
  const [apPowerWatts, setApPowerWatts] = useState(14);

  // Chapter 06 state
  const [secProto, setSecProto] = useState('WPA2');
  const [passLen, setPassLen] = useState(12);
  const [pmfEnabled, setPmfEnabled] = useState(true);
  const [wpsEnabled, setWpsEnabled] = useState(false);

  // Chapter 07 state
  const [reqRange, setReqRange] = useState('far');
  const [reqPower, setReqPower] = useState('battery');

  // Chapter 08 state
  const [auditoriumUsers, setAuditoriumUsers] = useState(400);
  const [apCount8, setApCount8] = useState(8);

  const renderChapterLab = () => {
    if (chapterId === '01') {
      const std = IEEE_STANDARDS[stdIndex];
      const fileMegabits = fileSizeGb * 1024 * 8;
      const seconds = fileMegabits / std.realMbps;
      const formattedTime =
        seconds < 1
          ? `${(seconds * 1000).toFixed(0)} milidetik`
          : seconds < 60
            ? `${seconds.toFixed(1)} detik`
            : seconds < 3600
              ? `${(seconds / 60).toFixed(1)} menit`
              : `${(seconds / 3600).toFixed(1)} jam`;

      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="ch01-std-select" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Pilih Standar IEEE 802.11:
              </label>
              <select
                id="ch01-std-select"
                value={stdIndex}
                onChange={(e) => setStdIndex(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
              >
                {IEEE_STANDARDS.map((s, idx) => (
                  <option key={s.id} value={idx}>
                    {s.name} [{s.wifiGen}]
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <label htmlFor="ch01-file-range">Ukuran File Uji Unduh:</label>
                <span className="font-mono text-emerald-700 dark:text-emerald-400">{fileSizeGb} GB</span>
              </div>
              <input
                id="ch01-file-range"
                type="range"
                min={1}
                max={20}
                value={fileSizeGb}
                onChange={(e) => setFileSizeGb(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-emerald-600"
              />
            </div>
          </div>

          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs grid grid-cols-2 sm:grid-cols-4 gap-3 border border-slate-800">
            <div>
              <p className="text-slate-400">GENERASI &amp; PITA</p>
              <p className="text-sm font-bold text-sky-400 mt-0.5">{std.wifiGen}</p>
              <p className="text-slate-300">{std.band}</p>
            </div>
            <div>
              <p className="text-slate-400">MODULASI &amp; ANTENA</p>
              <p className="text-sm font-bold text-white mt-0.5">{std.mod}</p>
              <p className="text-slate-300">{std.mimo}</p>
            </div>
            <div>
              <p className="text-slate-400">KECEPATAN TEORITIS</p>
              <p className="text-sm font-bold text-emerald-400 mt-0.5">
                {std.maxMbps >= 1000 ? `${std.maxMbps / 1000} Gbps` : `${std.maxMbps} Mbps`}
              </p>
              <p className="text-slate-300">Riil ~{std.realMbps} Mbps</p>
            </div>
            <div>
              <p className="text-slate-400">ESTIMASI UNDUH {fileSizeGb} GB</p>
              <p className="text-sm font-bold text-amber-400 mt-0.5">{formattedTime}</p>
              <p className="text-slate-300">Kondisi SNR Optimal</p>
            </div>
          </div>
        </div>
      );
    }

    if (chapterId === '02') {
      const approxBeamwidth = Math.max(4, Math.round(360 / Math.pow(antennaGainDbi / 2, 1.15)));
      const approxRangeKm = Math.round(Math.pow(1.22, antennaGainDbi - 2) * 0.4 * 10) / 10;
      const antennaClass =
        antennaGainDbi <= 6
          ? 'Omnidirectional (Dipole / Ceiling AP): 360° Horizontal'
          : antennaGainDbi <= 16
            ? 'Sectoral Antenna: Sektor 60° hingga 120° Base Station'
            : antennaGainDbi <= 23
              ? 'Panel / Yagi Directional: CPE Pelanggan & PTP Menengah'
              : 'Parabolic Grid / Solid Dish: Backhaul Jarak Jauh';

      return (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              <label htmlFor="ch02-gain-slider">Atur Penguatan Antena (Gain dBi):</label>
              <span className="font-mono text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {antennaGainDbi} dBi
              </span>
            </div>
            <input
              id="ch02-gain-slider"
              type="range"
              min={2}
              max={32}
              value={antennaGainDbi}
              onChange={(e) => setAntennaGainDbi(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-1">
              <span>2 dBi (Omni Indoor)</span>
              <span>15 dBi (Sectoral)</span>
              <span>24+ dBi (Parabolic Dish)</span>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-4 border border-slate-800">
            <div>
              <p className="text-slate-400">ESTIMASI SUDUT PANCAR</p>
              <p className="text-base font-bold text-sky-400 mt-0.5">
                {antennaGainDbi <= 6 ? '360° (Horiz)' : `~${approxBeamwidth}° Fokus`}
              </p>
              <p className="text-slate-300 mt-0.5">Makin tinggi dBi, berkas makin sempit</p>
            </div>
            <div>
              <p className="text-slate-400">PERKIRAAN JANGKAUAN EFEKTIF</p>
              <p className="text-base font-bold text-emerald-400 mt-0.5">~{approxRangeKm} km</p>
              <p className="text-slate-300 mt-0.5">Dengan syarat Line of Sight bersih</p>
            </div>
            <div>
              <p className="text-slate-400">KLASIFIKASI ANTENA</p>
              <p className="text-xs font-bold text-amber-400 mt-0.5 leading-relaxed">{antennaClass}</p>
            </div>
          </div>
        </div>
      );
    }

    if (chapterId === '03') {
      const effectivePool = Math.round(sectorCapMbps * 0.78);
      const perClientMbps = Math.round((effectivePool / cpeCount) * 10) / 10;

      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <label htmlFor="ch03-cap-slider">Kapasitas Radio Base Station:</label>
                <span className="font-mono text-emerald-700 dark:text-emerald-400">{sectorCapMbps} Mbps</span>
              </div>
              <input
                id="ch03-cap-slider"
                type="range"
                min={100}
                max={1000}
                step={50}
                value={sectorCapMbps}
                onChange={(e) => setSectorCapMbps(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <label htmlFor="ch03-cpe-slider">Jumlah Pelanggan CPE Aktif (PTMP):</label>
                <span className="font-mono text-emerald-700 dark:text-emerald-400">{cpeCount} Klien</span>
              </div>
              <input
                id="ch03-cpe-slider"
                type="range"
                min={1}
                max={50}
                value={cpeCount}
                onChange={(e) => setCpeCount(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-emerald-600"
              />
            </div>
          </div>

          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-4 border border-slate-800">
            <div>
              <p className="text-slate-400">MODE POINT-TO-POINT (1:1)</p>
              <p className="text-base font-bold text-sky-400 mt-0.5">{effectivePool} Mbps Dedicated</p>
              <p className="text-slate-300">Seluruh kapasitas untuk 1 titik cabang</p>
            </div>
            <div>
              <p className="text-slate-400">MODE PTMP ({cpeCount} KLIEN AKTIF)</p>
              <p className="text-base font-bold text-emerald-400 mt-0.5">~{perClientMbps} Mbps / CPE</p>
              <p className="text-slate-300">Saat seluruh klien mengunduh serentak</p>
            </div>
            <div>
              <p className="text-slate-400">STATUS KEPADATAN SEKTOR</p>
              <p className={`text-sm font-bold mt-0.5 ${cpeCount <= 25 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {cpeCount <= 25 ? 'Optimal (Airtime Stabil)' : 'Padat (Tambah Sektor Baru)'}
              </p>
              <p className="text-slate-300">Efisiensi protokol TDMA ~78%</p>
            </div>
          </div>
        </div>
      );
    }

    if (chapterId === '04') {
      const eirpDbm = txPowerDbm + gainDbi4 - cableLossDb;
      const eirpWatts = (Math.pow(10, eirpDbm / 10) / 1000).toFixed(2);
      const isLegal = eirpDbm <= 36;
      const f1RadiusM = (17.32 * Math.sqrt(distKm4 / (4 * freqGhz4))).toFixed(1);

      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <label htmlFor="ch04-tx">Tx Power Radio:</label>
                <span className="font-mono">{txPowerDbm} dBm</span>
              </div>
              <input
                id="ch04-tx"
                type="range"
                min={5}
                max={27}
                value={txPowerDbm}
                onChange={(e) => setTxPowerDbm(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <label htmlFor="ch04-gain">Gain Antena:</label>
                <span className="font-mono">+{gainDbi4} dBi</span>
              </div>
              <input
                id="ch04-gain"
                type="range"
                min={5}
                max={30}
                value={gainDbi4}
                onChange={(e) => setGainDbi4(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <label htmlFor="ch04-loss">Redaman Kabel (Loss):</label>
                <span className="font-mono">-{cableLossDb} dB</span>
              </div>
              <input
                id="ch04-loss"
                type="range"
                min={0}
                max={8}
                value={cableLossDb}
                onChange={(e) => setCableLossDb(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <label htmlFor="ch04-dist">Jarak Link (d):</label>
                <span className="font-mono">{distKm4} km pada {freqGhz4} GHz</span>
              </div>
              <input
                id="ch04-dist"
                type="range"
                min={1}
                max={30}
                value={distKm4}
                onChange={(e) => setDistKm4(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-emerald-600"
              />
            </div>
            <div className="flex items-end gap-2">
              {[2.4, 5.8].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFreqGhz4(f)}
                  className={`flex-1 py-2 px-3 rounded-lg font-mono text-xs font-bold border transition-colors ${
                    freqGhz4 === f
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  Pita {f} GHz
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-4 border border-slate-800">
            <div>
              <p className="text-slate-400">HASIL HITUNG EIRP</p>
              <p className="text-base font-bold text-sky-400 mt-0.5">
                {txPowerDbm} + {gainDbi4} - {cableLossDb} = {eirpDbm} dBm
              </p>
              <p className="text-slate-300">Setara daya pancar ~{eirpWatts} Watt</p>
            </div>
            <div>
              <p className="text-slate-400">STATUS REGULASI (MAKS 36 dBm)</p>
              <p className={`text-sm font-bold mt-0.5 flex items-center gap-1.5 ${isLegal ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isLegal ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                <span>{isLegal ? 'PATUH REGULASI (<= 36 dBm)' : 'MELEBIHI BATAS (> 36 dBm)'}</span>
              </p>
              <p className="text-slate-300">
                {isLegal ? 'Konfigurasi radio aman dioperasikan' : `Turunkan Tx Power sebesar ${eirpDbm - 36} dBm`}
              </p>
            </div>
            <div>
              <p className="text-slate-400">RADIUS FRESNEL F1 ({distKm4} KM)</p>
              <p className="text-base font-bold text-emerald-400 mt-0.5">{f1RadiusM} meter</p>
              <p className="text-slate-300">Klirens 60% wajib bebas: {(f1RadiusM * 0.6).toFixed(1)} m</p>
            </div>
          </div>
        </div>
      );
    }

    if (chapterId === '05') {
      const maxPortWatts = poeStd === 'af' ? 15.4 : poeStd === 'at' ? 30.0 : 60.0;
      const cableLossWatts = Number(((cableMeters / 100) * 2.4).toFixed(1));
      const totalRequired = Number((apPowerWatts + cableLossWatts).toFixed(1));
      const lengthValid = cableMeters <= 100;
      const powerValid = totalRequired <= maxPortWatts;

      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="ch05-poe-std" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Standar Switch PoE:
              </label>
              <select
                id="ch05-poe-std"
                value={poeStd}
                onChange={(e) => setPoeStd(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="af">IEEE 802.3af (PoE 15.4W)</option>
                <option value="at">IEEE 802.3at (PoE+ 30W)</option>
                <option value="bt">IEEE 802.3bt (PoE++ 60W)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <label htmlFor="ch05-cable">Panjang Kabel LAN UTP:</label>
                <span className="font-mono">{cableMeters} m</span>
              </div>
              <input
                id="ch05-cable"
                type="range"
                min={5}
                max={120}
                step={5}
                value={cableMeters}
                onChange={(e) => setCableMeters(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <label htmlFor="ch05-ap-watt">Konsumsi Daya AP/CPE:</label>
                <span className="font-mono">{apPowerWatts} W</span>
              </div>
              <input
                id="ch05-ap-watt"
                type="range"
                min={6}
                max={35}
                value={apPowerWatts}
                onChange={(e) => setApPowerWatts(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-emerald-600"
              />
            </div>
          </div>

          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-4 border border-slate-800">
            <div>
              <p className="text-slate-400">BEBAN TOTAL DI PORT SWITCH</p>
              <p className="text-base font-bold text-sky-400 mt-0.5">
                {totalRequired} W / {maxPortWatts} W
              </p>
              <p className="text-slate-300">Termasuk disipasi kabel ~{cableLossWatts}W</p>
            </div>
            <div>
              <p className="text-slate-400">VALIDASI JARAK ETHERNET</p>
              <p className={`text-sm font-bold mt-0.5 ${lengthValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                {lengthValid ? `Aman (${cableMeters}m <= 100m)` : `Melebihi Standar (${cableMeters}m > 100m)`}
              </p>
              <p className="text-slate-300">Batas spesifikasi IEEE 802.3 adalah 100m</p>
            </div>
            <div>
              <p className="text-slate-400">STATUS SUPLAI DAYA POE</p>
              <p className={`text-sm font-bold mt-0.5 ${powerValid && lengthValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                {powerValid && lengthValid
                  ? 'AP Menyala Normal & Stabil'
                  : !powerValid
                    ? 'Daya Kurang! Naikkan ke PoE+ / PoE++'
                    : 'Gunakan PoE Extender / Serat Optik'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (chapterId === '06') {
      let score = 0;
      if (secProto === 'WPA3') score += 60;
      else if (secProto === 'WPA2') score += 40;
      else if (secProto === 'WPA') score += 15;

      if (passLen >= 12) score += 20;
      else if (passLen >= 8) score += 10;

      if (pmfEnabled || secProto === 'WPA3') score += 15;
      if (!wpsEnabled) score += 5;
      else score -= 25;

      const finalSecScore = Math.max(5, Math.min(100, score));

      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label htmlFor="ch06-proto" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Protokol Enkripsi:
              </label>
              <select
                id="ch06-proto"
                value={secProto}
                onChange={(e) => setSecProto(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="WEP">WEP (RC4 - Usang)</option>
                <option value="WPA">WPA (TKIP - Lemah)</option>
                <option value="WPA2">WPA2-PSK (AES-CCMP)</option>
                <option value="WPA3">WPA3-Personal (SAE)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <label htmlFor="ch06-pass">Panjang Karakter Sandi:</label>
                <span className="font-mono">{passLen} krk</span>
              </div>
              <input
                id="ch06-pass"
                type="range"
                min={6}
                max={20}
                value={passLen}
                onChange={(e) => setPassLen(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-emerald-600 mt-2"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => setPmfEnabled((v) => !v)}
                className={`w-full py-2 px-3 rounded-lg font-mono text-xs font-bold border transition-colors ${
                  pmfEnabled || secProto === 'WPA3'
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                }`}
              >
                802.11w PMF: {pmfEnabled || secProto === 'WPA3' ? 'AKTIF' : 'MATI'}
              </button>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => setWpsEnabled((v) => !v)}
                className={`w-full py-2 px-3 rounded-lg font-mono text-xs font-bold border transition-colors ${
                  wpsEnabled
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-slate-800 text-emerald-400 border-slate-700'
                }`}
              >
                WPS PIN: {wpsEnabled ? 'AKTIF (RENTAN!)' : 'DINONAKTIFKAN'}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-4 border border-slate-800">
            <div>
              <p className="text-slate-400">SKOR AUDIT KEAMANAN SSID</p>
              <p className={`text-lg font-extrabold mt-0.5 ${finalSecScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {finalSecScore} / 100
              </p>
              <p className="text-slate-300">Enkripsi: {secProto}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-slate-400">DIAGNOSIS KERENTANAN UDARA</p>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                {secProto === 'WEP' && 'KRITIS: Kunci RC4 WEP dapat dipecahkan dalam beberapa menit. Segera ganti ke WPA2/WPA3.'}
                {wpsEnabled && ' PERINGATAN: Fitur WPS PIN aktif sehingga rentan ditembus lewat 11.000 kombinasi PIN.'}
                {secProto !== 'WEP' && !wpsEnabled && !(pmfEnabled || secProto === 'WPA3') && ' RENTAN DEAUTH: Aktifkan 802.11w (PMF) agar klien tidak bisa diputus paksa.'}
                {secProto !== 'WEP' && !wpsEnabled && (pmfEnabled || secProto === 'WPA3') && passLen >= 12 && ' AMAN: Kombinasi enkripsi modern, PMF aktif, WPS mati, dan sandi panjang melindungi jaringan dari serangan umum.'}
                {secProto !== 'WEP' && !wpsEnabled && passLen < 12 && ' SARAN: Perpanjang kata sandi minimal 12 karakter untuk mencegah serangan kamus offline.'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (chapterId === '07') {
      const recommendation =
        reqRange === 'touch'
          ? { name: 'NFC (13.56 MHz)', speed: '424 Kbps', note: 'Sangat aman untuk pembayaran nirsentuh & akses pintu (< 4 cm), tag tidak butuh baterai.' }
          : reqRange === 'far'
            ? { name: 'LoRa / LoRaWAN (Sub-GHz)', speed: '0.3 - 50 Kbps', note: 'Jangkauan 2 hingga 15+ km dengan baterai bertahan bertahun-tahun untuk sensor pertanian/kota.' }
            : reqPower === 'battery'
              ? { name: 'Zigbee (802.15.4) / BLE', speed: '250 Kbps - 2 Mbps', note: 'Hemat daya untuk jaringan sensor rumah pintar (Smart Home Mesh) & perangkat wearable.' }
              : { name: 'Wi-Fi 6 / Wi-Fi 7 (802.11ax/be)', speed: '9.6 - 46 Gbps', note: 'Throughput multi-Gigabit untuk laptop, smartphone, streaming 4K/8K, dan jaringan kantor.' };

      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ch07-range" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kebutuhan Jarak Jangkauan:
              </label>
              <select
                id="ch07-range"
                value={reqRange}
                onChange={(e) => setReqRange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="touch">Sangat Dekat / Sentuh (&lt; 4 cm)</option>
                <option value="room">Dalam Ruangan / Gedung (10 - 70 m)</option>
                <option value="far">Luar Ruang Jarak Jauh (2 - 15+ km)</option>
              </select>
            </div>

            <div>
              <label htmlFor="ch07-power" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Konsumsi Daya &amp; Trafik:
              </label>
              <select
                id="ch07-power"
                value={reqPower}
                onChange={(e) => setReqPower(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="battery">Baterai Kecil Hemat Daya (Paket Sensor Kecil)</option>
                <option value="high">Daya Penuh / Throughput Tinggi (Video &amp; Internet)</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-4 border border-slate-800">
            <div>
              <p className="text-slate-400">PROTOKOL DIREKOMENDASIKAN</p>
              <p className="text-sm font-bold text-sky-400 mt-0.5">{recommendation.name}</p>
              <p className="text-emerald-400">Laju Data: {recommendation.speed}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-slate-400">ALASAN REKAYASA</p>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">{recommendation.note}</p>
            </div>
          </div>
        </div>
      );
    }

    const usersPerAp = Math.round(auditoriumUsers / apCount8);
    const cellStatus =
      usersPerAp <= 45
        ? 'IDEAL (Micro-Cell Wi-Fi 6 Stabil)'
        : usersPerAp <= 80
          ? 'PADAT (Aktifkan Band Steering 5/6 GHz)'
          : 'OVERLOAD (Airtime Penuh, Tambah Jumlah AP!)';

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <label htmlFor="ch08-users">Jumlah Pengguna Serentak di Aula:</label>
              <span className="font-mono">{auditoriumUsers} Orang</span>
            </div>
            <input
              id="ch08-users"
              type="range"
              min={50}
              max={1000}
              step={50}
              value={auditoriumUsers}
              onChange={(e) => setAuditoriumUsers(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-emerald-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <label htmlFor="ch08-aps">Jumlah Access Point Wi-Fi 6 Dipasang:</label>
              <span className="font-mono">{apCount8} Unit AP</span>
            </div>
            <input
              id="ch08-aps"
              type="range"
              min={1}
              max={24}
              value={apCount8}
              onChange={(e) => setApCount8(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-emerald-600"
            />
          </div>
        </div>

        <div className="bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-4 border border-slate-800">
          <div>
            <p className="text-slate-400">BEBAN KLIEN PER ACCESS POINT</p>
            <p className="text-base font-bold text-sky-400 mt-0.5">{usersPerAp} Klien / AP</p>
            <p className="text-slate-300">Target ideal High-Density: &lt;= 45 klien/AP</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-slate-400">STATUS KINERJA JARINGAN AULA</p>
            <p className={`text-sm font-bold mt-0.5 ${usersPerAp <= 45 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {cellStatus}
            </p>
            <p className="text-slate-300 mt-0.5">
              Gunakan daya pancar rendah per AP dan kanal 20/40 MHz non-overlapping agar antar AP tidak saling berinterferensi.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="section-try-it"
      aria-label="Laboratorium Coba Sendiri"
      className="my-8 bg-emerald-50/60 dark:bg-slate-900 border-l-4 border-l-emerald-600 border-y border-r border-slate-200 dark:border-slate-800 rounded-r-xl p-5 sm:p-6 space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-200/70 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
            <Sliders size={15} aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase">
              [COBA SENDIRI // W3SCHOOLS INTERACTIVE LAB]
            </p>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Eksperimen Parameter Teknis Bab {chapterId}
            </h3>
          </div>
        </div>
        <span className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
          <Terminal size={13} aria-hidden="true" />
          <span>Kalkulasi Real-Time</span>
        </span>
      </div>

      {renderChapterLab()}
    </section>
  );
}
