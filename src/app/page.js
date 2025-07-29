"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from 'react-confetti';


export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("newChat");
  const chatEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [popupImg, setPopupImg] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);


useEffect(() => {
  if (showConfetti) {
    const timeout = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timeout);
  }
}, [showConfetti]);


  useEffect(() => {
    const imgs = document.querySelectorAll(".chat-image");
    imgs.forEach((img) => {
      img.addEventListener("click", () => setPopupImg(img.src));
    });
    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("click", () => setPopupImg(img.src));
      });
    };
  }, [messages]);
  

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const imgs = document.querySelectorAll("img.chat-image");
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    imgs.forEach((img) => {
      img.onclick = () => {
        setPopupImg(img.src);
      };
    });
  }, [messages]);
  

  const faqList = [
    "Apa itu stunting?",
    "Penyebab stunting",
    "Ciri stunting",
    "Cara mencegah stunting",
    "Apakah stunting bisa sembuh?",
    "MPASI sehat",
    "ASI eksklusif",
    "Gizi ibu hamil",
    "Peran imunisasi",
    "Sanitasi dan stunting",
    "Program makanan tambahan",
    "Peran posyandu",
    "Tinggi badan normal",
    "Berat badan normal",
    "Peran ayah",
    "Menu sehat untuk balita",
    "Peran kader posyandu",
    "Program pemerintah",
    "Pencegahan dini stunting",
    "Lokasi posyandu di Kelurahan Watang Bacukiki",
    "Siapa kader posyandu dikelurahan watang bacukiki",
    "Siapa kader posyandu lansia di Kelurahan Watang Bacukiki",
    "Jadwal posyandu di Kelurahan Watang Bacukiki",
    "Siapa Developer Website"
  ];

  const typeWriter = (text, callback) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        callback((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = text.slice(0, i + 1);
          return newMessages;
        });
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    if (messages.length === 0) {
      setActiveMenu("aiChat");
    }

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const msg = input.toLowerCase();
    let botReply = "";

    if (msg.includes("apa itu stunting") || msg.includes("pengertian stunting")) {
      botReply = `Pengertian Stunting: Stunting adalah kondisi gagal tumbuh pada anak balita akibat kekurangan gizi kronis.`;
    } else if (msg.includes("makanan bergizi") || msg.includes("menu sehat")) {
      botReply = `🥗 <b>Menu Sehat untuk Balita</b>:<br/>- Karbohidrat (nasi, kentang)<br/>- Protein hewani (ikan, telur)<br/>- Protein nabati (tahu, tempe)<br/>- Sayuran hijau<br/>- Buah berwarna`;
    } else if (msg.includes("kader") && (msg.includes("posyandu") || msg.includes("watang bacukiki"))) {
      botReply = `📋 <b>Daftar Kader 6 Posyandu</b><br/>
      🏥 <b>Posyandu Kelinci 1</b>: Ervina (Ketua), A. Irma (Sekretaris), Andi Haliyah (Bendahara), Nurfaisah & Nilawati (Anggota)<br/>
      🏥 <b>Posyandu Kelinci 2</b>: Rusnah (Ketua), Sicilia Fatikasari (Sekretaris), Ernawati (Bendahara), Mawar Mentari & Fani (Anggota)<br/>
      🏥 <b>Posyandu Sumber Air</b>: Darwina (Ketua), Darmiati (Sekretaris), Satriani (Bendahara), Selpiani & Lestarina (Anggota)<br/>
      🏥 <b>Posyandu Sumber Ikhlas</b>: Nurhayati (Ketua), Rasni Asri (Sekretaris), Hasna (Bendahara), ST. Rahmah, S.E (Anggota)<br/>
      🏥 <b>Posyandu Nuri</b>: Susilawati (Ketua), Widya Astuti (Sekretaris), Hatipa (Bendahara), Reka Amalia & Bunati (Anggota)<br/>
      🏥 <b>Posyandu Alamanda</b>: Neda (Ketua), Diana (Sekretaris), Darmawati (Bendahara), Kasmawati & Nurjannah (Anggota)`;
      if (
        msg.includes("kader posyandu") &&
        (msg.includes("lansia") || msg.includes("lansia")))
      botReply = `🧓🏻 <b>Daftar Kader Posyandu Lansia di Watang Bacukiki</b><br/>
      🏥 <b>Posyandu Kelinci 1</b>: Rusni<br/>
      🏥 <b>Posyandu Kelinci 2</b>: Aisyah<br/>
      🏥 <b>Posyandu Sumber Air</b>: Faradita Julia<br/>
      🏥 <b>Posyandu Sumber Ikhlas</b>: Junarti<br/>
      🏥 <b>Posyandu Nuri</b>: Asma<br/>
      🏥 <b>Posyandu Alamanda</b>: Darni`;
    } else if (msg.includes("jadwal posyandu") || msg.includes("kapan posyandu") || msg.includes("tanggal posyandu")) {
      botReply = `📅 <b>Jadwal Posyandu di Kelurahan Watang Bacukiki</b><br/>
      🏥 <b>Posyandu Kelinci 1</b>: Tanggal 16 setiap bulan<br/>
      🏥 <b>Posyandu Kelinci 2</b>: Tanggal 14 setiap bulan<br/>
      🏥 <b>Posyandu Sumber Air</b>: Tanggal 17 setiap bulan<br/>
      🏥 <b>Posyandu Sumber Ikhlas</b>: Tanggal 15 setiap bulan<br/>
      🏥 <b>Posyandu Nuri</b>: Tanggal 10 setiap bulan<br/>
      🏥 <b>Posyandu Alamanda</b>: Tanggal 19 setiap bulan<br/><br/>
      👶 Ayo ajak balita datang ke posyandu setiap bulan! Pemeriksaan rutin adalah kunci tumbuh kembang anak yang sehat dan bebas stunting. 💪`;        
    } else if (msg.includes("kader posyandu kelinci 1")) {
      botReply = `<b>👩‍⚕️ Kader Posyandu Kelinci 1</b>:<br/>
      - Ketua: Ervina<br/>
      - Sekretaris: A. Irma<br/>
      - Bendahara: Andi Haliyah<br/>
      - Anggota: Nurfaisah dan Nilawati`;
    } else if (msg.includes("kader posyandu kelinci 2")) {
      botReply = `<b>👩‍⚕️ Kader Posyandu Kelinci 2</b>:<br/>
      - Ketua: Rusnah<br/>
      - Sekretaris: Sicilia Fatikasari<br/>
      - Bendahara: Ernawati<br/>
      - Anggota: Mawar Mentari dan Fani`;
    } else if (msg.includes("kader posyandu sumber air")) {
      botReply = `<b>👩‍⚕️ Kader Posyandu Sumber Air</b>:<br/>
      - Ketua: Darwina<br/>
      - Sekretaris: Darmiati<br/>
      - Bendahara: Satriani<br/>
      - Anggota: Selpiani dan Lestarina`;
    } else if (msg.includes("kader posyandu sumber ikhlas")) {
      botReply = `<b>👩‍⚕️ Kader Posyandu Sumber Ikhlas</b>:<br/>
      - Ketua: Nurhayati<br/>
      - Sekretaris: Rasni Asri<br/>
      - Bendahara: Hasna<br/>
      - Anggota: ST. Rahmah, S.E`;
    } else if (msg.includes("kader posyandu nuri")) {
      botReply = `<b>👩‍⚕️ Kader Posyandu Nuri</b>:<br/>
      - Ketua: Susilawati<br/>
      - Sekretaris: Widya Astuti<br/>
      - Bendahara: Hatipa<br/>
      - Anggota: Reka Amalia dan Bunati`;
    } else if (msg.includes("kader posyandu alamanda")) {
      botReply = `<b>👩‍⚕️ Kader Posyandu Alamanda</b>:<br/>
      - Ketua: Neda<br/>
      - Sekretaris: Diana<br/>
      - Bendahara: Darmawati<br/>
      - Anggota: Kasmawati dan Nurjannah`;
    } else if (msg.includes("lokasi posyandu") || msg.includes("nama posyandu") || msg.includes("alamat posyandu")) {
      botReply = `<b>📍 Nama & Lokasi Posyandu di Kelurahan Watang Bacukiki</b>:<br/>
      - Posyandu Nuri: RT.002/RW.05<br/>
      - Posyandu Sumber Ikhlas: RT.001/RW.04<br/>
      - Posyandu Kelinci 1: RT.001/RW.07<br/>
      - Posyandu Alamanda: RT.002/RW.06<br/>
      - Posyandu Sumber Air: RT.002/RW.02<br/>
      - Posyandu Kelinci 2: RT.002/RW.01<br/><br/>
      🔗 Untuk info peta/lokasi lebih lengkap, klik: <a href="https://linktr.ee/PanduWTB?utm_source=qr_code" target="_blank"><b><ins>DISINI</b></ins></a> <img src="/peta-posyandu-kelurahan.png" alt="Lokasi Posyandu" class="chat-image"/>
`;    
    } else if (msg.includes("pencegahan stunting di watang bacukiki")) {
      botReply = `✅ <b>Pencegahan Stunting di Watang Bacukiki</b>:<br/>Warga dan kader sudah berupaya maksimal.<br/>Saat ini angka stunting sudah menurun drastis karena edukasi gizi, program posyandu rutin, dan dukungan pemerintah setempat.<br/><b>TUNTAS STUNTING! 💜</b>`;
    } else if (msg.includes("siapa") && (msg.includes("lurah") || msg.includes("nama lurah watang bacukiki"))) {
      botReply = `👩‍💼 Nama lurah Kelurahan Watang Bacukiki adalah <b>Ibu NUR MUHLISA S.E., M.M.</b><br/>Kami anak KKN akrab panggil beliau dengan sebutan <b>BUNDA</b>.`;
    } else if (msg.includes("siapa") && (msg.includes("developer") || msg.includes("developer website"))) {
      botReply = `👨‍💻 Developer atau pembuat bot website ini adalah mahasiswa KKNT-114 Universitas Hasanuddin atas nama <b>Riswan Ramadhan</b> (Teknik Informatika).`;
      setShowConfetti(true);
    } else if (msg.includes("penyebab stunting") || msg.includes("kenapa stunting terjadi")) {
      botReply = `⚠️ <b>Penyebab Stunting</b>:<br/>- Kurangnya asupan gizi ibu hamil<br/>- Pola makan balita yang tidak bergizi<br/>- Infeksi berulang<br/>- Kurangnya akses sanitasi`;
    } else if (msg.includes("ciri stunting") || msg.includes("tanda stunting")) {
      botReply = `👶 <b>Ciri-ciri Stunting</b>:<br/>- Tinggi badan anak lebih rendah dari standar<br/>- Perkembangan terlambat<br/>- Sering sakit<br/>- Nafsu makan kurang`;
    } else if (msg.includes("pencegahan stunting") || msg.includes("cara mencegah stunting")) {
      botReply = `✅ <b>Pencegahan Stunting</b>:<br/>- Pastikan ibu hamil cukup gizi<br/>- Berikan ASI eksklusif 6 bulan<br/>- MPASI bergizi<br/>- Imunisasi lengkap<br/>- Rutin cek di posyandu`;
    } else if (msg.includes("stunting sembuh") || msg.includes("apakah stunting bisa sembuh")) {
      botReply = `ℹ️ <b>Apakah Stunting Bisa Sembuh?</b><br/>Jika sudah terjadi, sulit untuk mengembalikan tinggi badan normal.<br/>Namun, intervensi gizi dan stimulasi dini bisa memperbaiki kualitas hidup.`;
    } else if (msg.includes("mpasi") || msg.includes("makanan pendamping asi")) {
      botReply = `🍲 <b>MPASI Sehat</b>:<br/>- Mulai usia 6 bulan<br/>- Berikan makanan padat bergizi<br/>- Sertakan daging, telur, ikan, dan sayuran`;
    } else if (msg.includes("asi eksklusif") || msg.includes("asi saja")) {
      botReply = `🍼 <b>ASI Eksklusif</b>:<br/>- Berikan ASI saja tanpa tambahan apapun<br/>- Dilakukan selama 6 bulan pertama kehidupan bayi`;
    } else if (msg.includes("gizi ibu hamil") || msg.includes("makanan ibu hamil")) {
      botReply = `🤰 <b>Gizi Ibu Hamil</b>:<br/>- Konsumsi protein hewani<br/>- Sayuran hijau<br/>- Buah segar<br/>- Kacang-kacangan<br/>- Zat besi`;
    } else if (msg.includes("imunisasi") || msg.includes("vaksin")) {
      botReply = `💉 <b>Peran Imunisasi</b>:<br/>- Mencegah penyakit infeksi<br/>- Mengurangi risiko malnutrisi<br/>- Membantu pertumbuhan optimal anak`;
    } else if (msg.includes("sanitasi") || msg.includes("lingkungan bersih")) {
      botReply = `🚰 <b>Sanitasi dan Stunting</b>:<br/>- Jaga kebersihan lingkungan<br/>- Akses air minum layak<br/>- Cegah infeksi yang mengganggu tumbuh kembang`;
    } else if (msg.includes("pmt") || msg.includes("program makanan tambahan")) {
      botReply = `🥛 <b>Program Makanan Tambahan</b>:<br/>- Membantu balita mendapatkan asupan gizi tambahan<br/>- Dilakukan melalui posyandu<br/>- Membantu pencegahan stunting`;
    } else if (msg.includes("peran posyandu") || msg.includes("fungsi posyandu")) {
      botReply = `🏥 <b>Peran Posyandu</b>:<br/>- Memantau tumbuh kembang anak<br/>- Memberi penyuluhan gizi<br/>- Memberi imunisasi<br/>- Deteksi dini masalah stunting`;
    } else if (msg.includes("tinggi badan normal") || msg.includes("tinggi anak")) {
      botReply = `📏 <b>Tinggi Badan Normal</b>:<br/>- Ukur tiap bulan<br/>- Lihat kurva WHO<br/>- Jika lebih rendah dari -2 SD maka berisiko stunting`;
    } else if (msg.includes("berat badan normal") || msg.includes("berat ideal anak")) {
      botReply = `⚖️ <b>Berat Badan Normal</b>:<br/>- Pantau lewat KMS<br/>- Harus mengikuti garis hijau pertumbuhan<br/>- Konsultasi bila melenceng jauh`;
    } else if (msg.includes("peran ayah") || msg.includes("ayah stunting")) {
      botReply = `👨‍👩‍👧 <b>Peran Ayah</b>:<br/>- Mendukung kebutuhan pangan keluarga<br/>- Ikut edukasi gizi<br/>- Membantu membawa anak ke posyandu`;
    } else if (msg.includes("makanan bergizi") || msg.includes("menu sehat")) {
      botReply = `🥗 <b>Menu Sehat untuk Balita</b>:<br/>- Karbohidrat (nasi, kentang)<br/>- Protein hewani (ikan, telur)<br/>- Protein nabati (tahu, tempe)<br/>- Sayuran hijau<br/>- Buah berwarna`;
    } else if (msg.includes("peran") && (msg.includes("kader") || msg.includes("posyandu"))) {
      botReply = `👩‍⚕️ <b>Peran Kader Posyandu</b>:<br/>- Menimbang balita<br/>- Memberi penyuluhan gizi<br/>- Membagikan PMT<br/>- Edukasi pencegahan stunting`;
    } else if (msg.includes("program pemerintah") || msg.includes("upaya pemerintah")) {
      botReply = `🏛️ <b>Program Pemerintah</b>:<br/>- Pemberian makanan tambahan<br/>- Edukasi gizi ibu hamil<br/>- Sanitasi sehat<br/>- Pemantauan posyandu`;
    } else if (msg.includes("siapa pendiri") || msg.includes("pendiri bacukiki") || msg.includes("dan anggota bacukiki")) {
      botReply = `🏛️ <b>Pendiri dari Bacukiki ialah</b>:<br/>- IVAN PERDANA<br/>FOUNDER BACUKIKI SEJAK 292 SEBELUM MASEHI <br/>- Sementara anggotanya antara lain adalah:<br/>- Nanda Nicola yang bertugas sebagai pelindung watang bacukiki`;
    } else if (msg.includes("pencegahan dini stunting") || msg.includes("apakah stunting bisa dicegah")) {
      botReply = `🌱 <b>Pencegahan Dini</b>:<br/>- Gizi cukup sejak hamil<br/>- ASI eksklusif<br/>- Imunisasi lengkap<br/>- MPASI tepat<br/>- Lingkungan sehat`;
    } else {
      botReply = '🙏 Maaf yaa, aku cuma ngerti seputar stunting, gizi, posyandu, dan struktur kader di wilayah Watang Bacukiki. 🤖 Kalau belum ada jawabannya, mungkin aku belum sempat belajar topik itu. Stay tuned ya! Tim kami bakal update terus infonya 💬✨';
    }

    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: "<i>...</i>" }]);
      setTimeout(() => {
        typeWriter(botReply, setMessages);
        setIsTyping(false);
      }, 800);
    }, 500);

    setInput("");
  };

  const handleNewChat = () => {
    setMessages([]);
    setActiveMenu("newChat");
  };

  const themeBg = darkMode
    ? "bg-gradient-to-br from-purple-900 to-purple-800 text-white"
    : "bg-[#f1f6fb] text-gray-900";
  const chatBubbleBot = darkMode
    ? "bg-gradient-to-r from-purple-700 to-purple-800 text-white border border-purple-600"
    : "bg-gradient-to-r from-purple-100 to-purple-200 text-gray-800 border border-purple-300";
  const chatBubbleUser = darkMode
    ? "bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white border border-purple-500"
    : "bg-gradient-to-r from-violet-100 to-purple-300 text-gray-800 border border-purple-300";

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${themeBg} transition-colors duration-500 font-mono overflow-hidden`}>
      <aside className={`${sidebarOpen ? "block" : "hidden"} md:block w-full md:w-60 bg-purple-600 text-white flex-shrink-0 p-4 justify-between flex-col md:flex`}>
        <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
  <img
    src="/maskot2-botting.png"
    alt="Maskot Botting"
    className="w-14 h-14 md:w-16 md:h-16 floaty-animation pop-hover transition-transform duration-300 ease-in-out"
  />
  <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide botting-title stretch-hover">
    BOTTING
  </h2>
</div>


          <button
            onClick={handleNewChat}
            className={`font-semibold py-2 px-4 rounded-lg w-full transition ${
              activeMenu === "newChat"
                ? "bg-purple-300 text-purple-900"
                : "bg-transparent hover:bg-purple-500"
            }`}
          >New Chat</button>
          {messages.length > 0 && (
            <button
              onClick={() => setActiveMenu("aiChat")}
              className={`font-semibold py-2 px-4 rounded-lg w-full transition ${
                activeMenu === "aiChat"
                  ? "bg-purple-300 text-purple-900"
                  : "bg-transparent hover:bg-purple-500"
              }`}
            >AI Chat Sekarang</button>
          )}
          <button
            onClick={() => setShowAbout(!showAbout)}
            className={`font-semibold py-2 px-4 rounded-lg w-full transition ${
              showAbout ? "bg-purple-300 text-purple-900" : "bg-transparent hover:bg-purple-500"
            }`}
          >About</button>
          {showAbout && (
            <div className="mt-4 p-3 bg-purple-800 rounded-lg text-sm space-y-2">
              <p>Bot ini dibuat untuk membantu edukasi pencegahan stunting dan layanan informasi kesehatan di Watang Bacukiki.</p>
              <img src="/foto-riswan.jpg" alt="Developer" className="w-20 h-20 rounded-full mx-auto border-2 border-white" />
              <p className="text-center font-semibold">Riswan Ramadhan</p>
              <p className="text-center text-xs">Mahasiswa Teknik Informatika UNHAS</p>
            </div>
          )}
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">📌 FAQ Cepat</h3>
          <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
            {faqList.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSidebarOpen(true);
                  setInput(item.toLowerCase());
                  setTimeout(handleSend, 0);
                }}
                className="w-full text-left px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-700 transition text-sm"
              >{item}</button>
            ))}
          </div>
        </div>
        <div className="mt-6 hidden md:block transition-transform duration-300 hover:scale-110 hover:shadow-xl">
  <img src="/logo-kkn.png" alt="Logo KKN" className="w-24 h-auto mx-auto rounded-lg" />
  <p className="text-center text-xs mt-2">KKNT-114 UNHAS</p>
</div>
      </aside>

      <div className="flex-1 flex flex-col h-[100dvh] overflow-hidden">
        <header className="flex justify-between items-center p-4 border-b border-purple-300">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-purple-700 text-xl font-bold"
            >☰</button>
            <img src="/logo-parepare.png" alt="Logo Kota Parepare" className="w-10 h-10 rounded hover-tilt"/>

            <h1 className="font-bold text-lg">Bot Pintar Pencegahan Stunting Warga Kelurahan Watang Bacukiki</h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-1 rounded-full font-semibold transition ${
              darkMode ? "bg-white text-purple-800 hover:bg-purple-100" : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >{darkMode ? "☀️ Mode Terang" : "🌙 Mode Gelap"}</button>
        </header>


        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex justify-center items-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-extrabold text-center"
              >YUK TANYA SEPUTAR STUNTING & POSYANDU<br />DI WATANG BACUKIKI</motion.h1>
            </div>
          ) : (
            messages.map((msg, idx) => (
  <div
    key={idx}
    className={`flex items-start gap-3 ${
      msg.from === "bot" ? "justify-start" : "justify-end"
    }`}
  >
    {/* Avatar Bot di kiri luar chat */}
    {msg.from === "bot" && (
      <img
        src="/icon-botting.png" // pastikan ini sesuai file di public/
        alt="Botting Icon"
        className="w-10 h-10 rounded-full object-cover border border-purple-400 shadow-md mt-1"
      />
    )}

    {/* Bubble Chat */}
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`max-w-[90%] md:max-w-[75%] px-4 py-2 rounded-xl shadow-md break-words whitespace-pre-line text-base ${
        msg.from === "bot"
          ? `${chatBubbleBot}`
          : `${chatBubbleUser} ml-auto`
      } [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:cursor-pointer [&_img]:border [&_img]:border-purple-300 [&_img]:shadow-md`}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: msg.text.replace(
  /<img /g,
  `<img onclick="(function(){
    window.setPopupImg && (window.setPopupImg(null), setTimeout(() => window.setPopupImg('IMG_URL_REPLACE'), 10));
  })()" class="chat-image cursor-pointer max-w-full rounded-lg border border-purple-300 shadow-md" `
)
,
        }}
      />
      {popupImg && (
        <div className="image-popup" onClick={() => setPopupImg(null)}>
          <img src={popupImg} alt="popup" />
          <a
            href={popupImg}
            download
            className="absolute top-5 left-5 bg-white text-black font-bold px-4 py-2 rounded-md shadow"
          >
            ⬇ Unduh Gambar
          </a>
        </div>
      )}
    </motion.div>
  </div>
))

          )}
          <div ref={chatEndRef} />
        </main>

        <div className="p-4 border-t border-purple-300">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Ketik pertanyaan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className={`flex-1 border rounded-lg px-4 py-2 text-lg focus:outline-none transition-colors duration-300 ${
    darkMode
      ? "bg-[#2e2e3a] text-white placeholder-gray-400 border-purple-500"
      : "bg-white text-gray-900 placeholder-gray-500 border-purple-300"
              }`}
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-lg"
            >↑</button>
          </div>
        </div>


        <footer className="text-center text-xs p-4 border-t border-purple-300 bg-gradient-to-r from-purple-100 to-purple-200 text-gray-800 italic transition-all duration-300 hover:shadow-inner hover:from-purple-200 hover:to-purple-300">
  <p className="font-semibold tracking-wide">
    Developer:{" "}
    <a
      href="https://www.linkedin.com/in/riswan-ramadhan-821781257/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-purple-600 hover:underline hover:text-purple-800 transition-colors"
    >
      Riswan Ramadhan
    </a>{" "}
    | <span className="text-purple-600">KKNT-114 Universitas Hasanuddin</span>
  </p>
</footer>

      </div>
    </div>
  );
}
