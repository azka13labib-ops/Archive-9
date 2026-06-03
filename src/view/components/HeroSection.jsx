import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoModal from "./VideoModal";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Data Siswa untuk modal galeri
const castMembers = [
  { name: "Rohman", badge: "Siswa", image: "" },
  { name: "Gofur", badge: "Siswa", image: "" },
  { name: "Labib", badge: "Siswa", image: "" },
  { name: "Ridwan", badge: "Siswa", image: "" },
  { name: "Putra", badge: "Siswa", image: "" },
  { name: "Danil", badge: "Siswa", image: "" },
  { name: "Dwi", badge: "Siswa", image: "" },
  { name: "Nayah", badge: "Siswa", image: "" },
  { name: "Santi", badge: "Siswa", image: "" },
  { name: "Iip", badge: "Siswa", image: "" },
  { name: "Mia", badge: "Siswa", image: "" },
  { name: "Qonita", badge: "Siswa", image: "" },
  { name: "Firoh", badge: "Siswa", image: "" },
  { name: "Suci", badge: "Siswa", image: "" },
  { name: "Mely", badge: "Siswa", image: "" },
];

export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (isInfoModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isInfoModalOpen]);

  return (
    <>
      {/* ============================================
          MAIN HERO PAGE - Art Direction
          ============================================ */}
      <section className="relative w-full min-h-screen bg-zinc-950 flex flex-col md:block overflow-hidden" id="hero">
        
        {/* --- HEADER / NAVBAR --- */}
        <motion.header
          className="absolute top-0 left-0 right-0 px-4 sm:px-6 md:px-8 py-4 md:py-5 flex items-center justify-between z-30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-4 md:gap-8">
            <h1 className="text-red-600 font-extrabold text-xl sm:text-2xl md:text-3xl tracking-wider italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              MEMORIES NEVER DIE
            </h1>
          </div>
        </motion.header>

        {/* --- BACKGROUND IMAGE (Responsive Art Direction) --- */}
        <div className="relative w-full h-[50vh] md:absolute md:inset-0 md:h-screen z-0">
          <img 
            src="/praktek9/foto bersama/tka.jpeg" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center"
          />
          
          {/* Overlay gradient for readability */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        {/* --- CONTENT AREA --- */}
        {/* Mobile: Pushed below image (flex-1). Desktop: Absolute bottom-left. */}
        <div className="relative z-10 flex-1 flex flex-col justify-end px-4 sm:px-6 pb-12 md:absolute md:bottom-0 md:left-0 md:right-0 md:px-16 md:pb-24">
          <motion.div 
            className="max-w-2xl text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Judul Utama */}
            <motion.h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold text-white leading-tight md:leading-none mb-3 md:mb-5 tracking-tight drop-shadow-xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
              variants={slideUp}
            >
              Akhir<br className="hidden md:block" /> Kisah
            </motion.h2>

            {/* Metadata Badges */}
            <motion.div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-neutral-300 mb-5 md:mb-6 tracking-wide" variants={slideUp}>
              <span className="text-green-500 font-bold">100% Memori</span>
              <span>2026</span>
              <span className="border border-neutral-500 px-1.5 py-0.5 rounded-sm text-xs leading-none">15+</span>
              <span>3 Tahun</span>
              <span className="border border-neutral-500 px-1.5 py-0.5 rounded-sm text-xs leading-none">LULUS</span>
            </motion.div>

            {/* Teks Deskripsi */}
            <motion.p className="text-sm sm:text-base md:text-lg text-neutral-300 mb-8 leading-relaxed max-w-xl text-shadow-sm" variants={slideUp}>
              Perjalanan tiga tahun penuh tawa, belajar hingga larut malam, dan ikatan yang tak tergoyahkan di MTs Raudlatul Ulum. Ini adalah bab terakhir kami di kelas sembilan sebelum melangkah ke awal yang baru.
            </motion.p>

            {/* Tombol Aksi */}
            <motion.div className="flex flex-wrap gap-3" variants={slideUp}>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-white text-black px-6 py-2.5 rounded font-bold text-base hover:bg-neutral-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Putar Kenangan
              </button>
              <motion.button
                layoutId="info-modal-trigger"
                className="flex items-center justify-center gap-2 bg-zinc-800/80 text-white px-6 py-2.5 rounded font-semibold text-base hover:bg-zinc-700 transition-colors backdrop-blur-md"
                onClick={() => setIsInfoModalOpen(true)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Tentang
              </motion.button>
            </motion.div>
          </motion.div>
        </div>



      </section>

      {/* ============================================
          SIMPLIFIED GALLERY MODAL (Existing)
          ============================================ */}
      <AnimatePresence>
        {isInfoModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
              onClick={() => setIsInfoModalOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              layoutId="info-modal-trigger"
              className="relative w-full sm:w-[95%] md:w-[90%] max-w-5xl max-h-[92vh] bg-[#141414] rounded-t-2xl sm:rounded-2xl overflow-y-auto z-10 border border-neutral-800 scrollbar-hide"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#e50914] to-transparent" />

              <button
                onClick={() => setIsInfoModalOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-9 h-9 sm:w-10 sm:h-10 bg-neutral-800/80 hover:bg-neutral-700 text-white rounded-full flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-110 group"
                aria-label="Close modal"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-[#e50914] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="px-5 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12">
                
                {/* ── HEADER ── */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="mb-12 sm:mb-16 text-center">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Tentang Angkatan 2026
                  </h2>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#e50914] to-transparent mx-auto mb-5" />
                  <p className="text-neutral-300 text-sm sm:text-base md:text-lg mt-3 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Di balik setiap kenangan, ada wajah-wajah yang menjadikan perjalanan ini istimewa. Inilah mereka — sutradara, pemeran, dan momen terbaik di balik kisah tiga tahun yang tak terlupakan.
                  </p>
                </motion.div>

                {/* ── CAST / SISWA ── */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mb-14 sm:mb-20 relative">
                  <div className="flex items-center gap-2 mb-8">
                    <span className="w-1 sm:w-1.5 h-5 sm:h-6 bg-[#e50914] rounded-full block"></span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide">
                      Para Pemeran Utama <span className="text-neutral-500 font-normal">/ Siswa</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                    {castMembers.map((member, i) => (
                      <motion.div key={member.name + i} className="flex flex-col items-center group" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.015, duration: 0.35 }}>
                        
                        <div className="w-14 h-14 sm:w-[4.2rem] sm:h-[4.2rem] md:w-[4.8rem] md:h-[4.8rem] rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-2 group-hover:border-[#e50914]/50 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.15)] transition-all duration-400 relative overflow-hidden">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover relative z-10" />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-b from-neutral-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                              <span className="text-neutral-300 group-hover:text-white font-semibold text-base sm:text-lg md:text-xl select-none transition-colors duration-300 relative z-10">
                                {member.name.charAt(0)}
                              </span>
                            </>
                          )}
                        </div>

                        <span className="text-[10px] sm:text-xs text-neutral-300 font-medium text-center group-hover:text-white transition-colors duration-300 truncate w-full">
                          {member.name}
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-neutral-600 group-hover:text-[#e50914]/70 transition-colors duration-300 text-center mt-0.5 truncate w-full italic">
                          {member.badge}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================
          VIDEO PLAYER MODAL
          ============================================ */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    </>
  );
}