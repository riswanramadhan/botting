"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("newChat");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 👉 Array FAQ
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
    "Lokasi posyandu di Watang Bacukiki"
  ];

  // fungsi untuk mengetik satu per satu
  const typeWriter = (text, callback) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        callback((prev) => {
          // update last message
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = text.slice(0, i + 1);
          return newMessages;
        });
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30); // kecepatan ketik
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
    } else if (msg.includes("posyandu") && (msg.includes("dimana") || msg.includes("lokasi"))) {
      botReply = `📍 <b>Lokasi Posyandu di Watang Bacukiki</b>:<br/>1. Posyandu Melati I - Jl. Bulu Cindea<br/>2. Posyandu Anggrek - BTN Blok B<br/>3. Posyandu Dahlia - Dekat Masjid Nurul Iman`;
    } else if (msg.includes("pencegahan stunting di watang bacukiki")) {
      botReply = `✅ <b>Pencegahan Stunting di Watang Bacukiki</b>:<br/>Warga dan kader sudah berupaya maksimal.<br/>Saat ini angka stunting sudah menurun drastis karena edukasi gizi, program posyandu rutin, dan dukungan pemerintah setempat.<br/><b>TUNTAS STUNTING! 💜</b>`;
    } else if (msg.includes("siapa") && (msg.includes("lurah") || msg.includes("nama lurah watang bacukiki"))) {
      botReply = `👩‍💼 Nama lurah Kelurahan Watang Bacukiki adalah <b>Ibu NUR MUHLISA S.E., M.M.</b><br/>Kami anak KKN akrab panggil beliau dengan sebutan <b>BUNDA</b>.`;
    } else if (msg.includes("siapa") && (msg.includes("developer") || msg.includes("pembuat website"))) {
      botReply = `👨‍💻 Developer atau pembuat bot website ini adalah mahasiswa KKNT-114 Universitas Hasanuddin atas nama <b>Riswan Ramadhan</b> (Teknik Informatika).`;
    } else if (msg.includes("penyebab stunting") || msg.includes("kenapa stunting terjadi")) {
      botReply = `⚠️ <b>Penyebab Stunting</b>:<br/>- Kurangnya asupan gizi ibu hamil<br/>- Pola makan balita yang tidak bergizi<br/>- Infeksi berulang<br/>- Kurangnya akses sanitasi`;
    } else if (msg.includes("ciri stunting") || msg.includes("tanda stunting")) {
      botReply = `👶 <b>Ciri-ciri Stunting</b>:<br/>- Tinggi badan anak lebih rendah dari standar<br/>- Perkembangan terlambat<br/>- Sering sakit<br/>- Nafsu makan kurang`;
    } else if (msg.includes("pencegahan stunting") || msg.includes("cara mencegah stunting")) {
      botReply = `✅ <b>Pencegahan Stunting</b>:<br/>- Pastikan ibu hamil cukup gizi<br/>- Berikan ASI eksklusif 6 bulan<br/>- MPASI bergizi<br/>- Imunisasi lengkap<br/>- Rutin cek di posyandu`;
    } else if (msg.includes("stunting sembuh") || msg.includes("apakah stunting bisa sembuh")) {
      botReply = `ℹ️ <b>Apakah Stunting Bisa Sembuh?</b><br/>Jika sudah terjadi, sulit untuk mengembalikan tinggi badan normal.<br/>Namun, intervensi gizi dan stimulasi dini bisa memperbaiki kualitas hidup.`;
    } else if (msg.includes("mpasi") || msg.includes("makanan pendamping asi")) {
      botReply = `🍲 <b>MPASI Sehat</b>:<br/>- Mulai usia 6 bulan<br/>- Berikan makanan padat bergizi<br/>- Sertakan daging, telur, ikan, dan sayuran <img src="/logo-kkn.png" alt="Logo KKN" className="w-14 mx-auto" />`;
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
    } else if (msg.includes("peran kader") || msg.includes("kader posyandu")) {
      botReply = `👩‍⚕️ <b>Peran Kader Posyandu</b>:<br/>- Menimbang balita<br/>- Memberi penyuluhan gizi<br/>- Membagikan PMT<br/>- Edukasi pencegahan stunting`;
    } else if (msg.includes("program pemerintah") || msg.includes("upaya pemerintah")) {
      botReply = `🏛️ <b>Program Pemerintah</b>:<br/>- Pemberian makanan tambahan<br/>- Edukasi gizi ibu hamil<br/>- Sanitasi sehat<br/>- Pemantauan posyandu`;
    } else if (msg.includes("pencegahan dini stunting") || msg.includes("apakah stunting bisa dicegah")) {
      botReply = `🌱 <b>Pencegahan Dini</b>:<br/>- Gizi cukup sejak hamil<br/>- ASI eksklusif<br/>- Imunisasi lengkap<br/>- MPASI tepat<br/>- Lingkungan sehat`;
    } else {
      botReply = "🙏 Maaf, saya hanya bisa menjawab pertanyaan seputar stunting, gizi, posyandu, dan struktur kader.";
    }
    

    // tampilkan bubble loading dulu
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: "..." }]);

      // delay sebentar baru mulai ketik
      setTimeout(() => {
        typeWriter(botReply, setMessages);
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
  const chatBubbleBot = darkMode ? "bg-purple-700 text-white" : "bg-purple-100 text-gray-800";
  const chatBubbleUser = darkMode ? "bg-purple-500 text-white" : "bg-green-100 text-gray-800";

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row ${themeBg} transition-colors duration-500 font-mono`}
    >
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-60 bg-purple-600 text-white flex-shrink-0 p-4 justify-between flex-col md:flex`}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">BOTTING</h2>

          <button
            onClick={handleNewChat}
            className={`font-semibold py-2 px-4 rounded-lg w-full transition ${
              activeMenu === "newChat"
                ? "bg-purple-300 text-purple-900"
                : "bg-transparent hover:bg-purple-500"
            }`}
          >
            New Chat
          </button>

          {messages.length > 0 && (
            <button
              onClick={() => setActiveMenu("aiChat")}
              className={`font-semibold py-2 px-4 rounded-lg w-full transition ${
                activeMenu === "aiChat"
                  ? "bg-purple-300 text-purple-900"
                  : "bg-transparent hover:bg-purple-500"
              }`}
            >
              AI Chat Sekarang
            </button>
          )}

          <button
            onClick={() => setShowAbout(!showAbout)}
            className={`font-semibold py-2 px-4 rounded-lg w-full transition ${
              showAbout
                ? "bg-purple-300 text-purple-900"
                : "bg-transparent hover:bg-purple-500"
            }`}
          >
            About
          </button>

          {showAbout && (
            <div className="mt-4 p-3 bg-purple-800 rounded-lg text-sm space-y-2">
              <p>
                Bot ini dibuat untuk membantu edukasi pencegahan stunting di
                Watang Bacukiki.
              </p>
              <img
                src="/foto-riswan.jpg"
                alt="Developer"
                className="w-20 h-20 rounded-full mx-auto border-2 border-white"
              />
              <p className="text-center font-semibold">Riswan Ramadhan</p>
              <p className="text-center text-xs">
                Mahasiswa Teknik Informatika UNHAS
              </p>
            </div>
          )}
          
        </div>
      <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">📌 FAQ Cepat</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {faqList.map((item, idx) => (
                <button
  key={idx}
  onClick={() => {
    setSidebarOpen(true); // pastikan sidebar tetap terbuka
    setInput(item.toLowerCase());
    setTimeout(handleSend, 0);
  }}
  className="w-full text-left px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-700 transition text-sm"
>
  {item}
</button>

              ))}
            </div>
          
        </div>
        <div className="mt-6 hidden md:block">
          <img src="/logo-kkn.png" alt="Logo KKN" className="w-32 mx-auto" />
          <p className="text-center text-xs mt-2">KKNT-114 UNHAS</p>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b border-purple-300">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-purple-700 text-xl font-bold"
            >
              ☰
            </button>
            <h1 className="font-bold text-lg">
              Bot Pintar Pencegahan Stunting Warga Kelurahan Watang Bacukiki
            </h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-1 rounded-full font-semibold transition ${
              darkMode
                ? "bg-white text-purple-800 hover:bg-purple-100"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {darkMode ? "☀️ Mode Terang" : "🌙 Mode Gelap"}
          </button>
        </header>

        {/* Chat Box */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex justify-center items-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-extrabold text-center"
              >
                YUK TANYA SEPUTAR STUNTING & POSYANDU
                <br /> DI WATANG BACUKIKI
              </motion.h1>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: msg.from === "bot" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`max-w-[90%] md:max-w-[75%] p-3 rounded-lg shadow-md break-words whitespace-pre-line ${
                  msg.from === "bot"
                    ? `${chatBubbleBot}`
                    : `${chatBubbleUser} ml-auto`
                    
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              </motion.div>
            ))
          )}
          <div ref={chatEndRef} />
        </main>

        {/* Input Box */}
        <div className="p-4 border-t border-purple-300">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Ketik pertanyaan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border rounded-lg px-4 py-2 text-lg focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-lg"
            >
              ↑
            </button>
          </div>

          {/* Quick Replies */}
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setInput("lokasi posyandu di watang bacukiki");
                setTimeout(handleSend, 0);
              }}
              className="px-3 py-1 rounded-full text-sm transition bg-green-500 text-white hover:bg-green-700"
            >
              Lokasi Posyandu di Watang Bacukiki
            </button>
            <button
              onClick={() => {
                setInput("pencegahan stunting di watang bacukiki");
                setTimeout(handleSend, 0);
              }}
              className="px-3 py-1 rounded-full text-sm transition bg-green-500 text-white hover:bg-green-700"
            >
              Pencegahan Stunting di Watang Bacukiki
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs p-2 border-t border-purple-300 italic">
          Developer: Riswan Ramadhan | KKNT-114 Universitas Hasanuddin
        </footer>
      </div>
    </div>
  );
}
