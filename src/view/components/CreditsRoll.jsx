import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const creditData = [
  { role: "SUTRADARA & WALI KELAS", names: ["Bapak / Ibu Guru Tercinta"] },
  { role: "PEMERAN UTAMA (SISWA)", names: [
    "Rohman", "Gofur", "Labib", "Ridwan", "Putra", "Danil", "Dwi", 
    "Nayah", "Santi", "Iip", "Mia", "Qonita", "Firoh", "Suci", "Mely"
  ]},
  { role: "SOUNDTRACK", names: ["Kenangan Terindah - Samsons", "Memories - Maroon 5"] },
  { role: "SPECIAL THANKS TO", names: ["Orang Tua Kami", "Sahabat Seperjuangan", "Bapak Ibu Guru"] },
];

export default function CreditsRoll({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black text-white overflow-hidden flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 text-neutral-400 hover:text-white transition-colors"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Scrolling Content Container */}
          <motion.div
            className="w-full max-w-2xl px-6 text-center absolute top-full"
            animate={{ y: ["0vh", "-250vh"] }}
            transition={{ 
              duration: 40, // Scrolling duration (40 seconds)
              ease: "linear",
              repeat: Infinity // loop if it reaches the end
            }}
          >
            {/* Header */}
            <div className="mb-32">
              <h2 className="text-4xl sm:text-6xl font-extrabold text-red-600 mb-6 tracking-widest italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                AKHIR KISAH
              </h2>
              <p className="text-xl sm:text-2xl text-neutral-400 font-light tracking-[0.2em]">
                ANGKATAN 2026
              </p>
            </div>

            {/* Roles */}
            {creditData.map((section, idx) => (
              <div key={idx} className="mb-24">
                <h3 className="text-sm sm:text-base text-neutral-500 tracking-[0.3em] font-bold mb-6">
                  {section.role}
                </h3>
                <div className="flex flex-col gap-4">
                  {section.names.map((name, i) => (
                    <span key={i} className="text-xl sm:text-3xl font-medium tracking-wide">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Footer / End */}
            <div className="mt-48 mb-[100vh]">
              <div className="w-16 h-1 bg-red-600 mx-auto mb-8" />
              <p className="text-lg sm:text-xl text-neutral-400 font-light tracking-[0.2em] mb-4">
                TERIMA KASIH
              </p>
              <p className="text-sm text-neutral-600 tracking-widest">
                © 2026 DIGITAL YEARBOOK
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
