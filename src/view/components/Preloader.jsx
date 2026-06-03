import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Mencegah scroll selama preloader aktif
    document.body.style.overflow = "hidden";
    
    // Munculkan tombol setelah animasi teks selesai (2.8 detik)
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2800);

    // Cleanup saat komponen dibongkar (unmount) atau preloader selesai
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    document.body.style.overflow = "unset";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Netflix Style "Tudum" Unfold Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center flex flex-col items-center"
          >
            <motion.h1 
              className="text-red-600 font-extrabold text-4xl sm:text-5xl md:text-7xl tracking-[0.2em] italic mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              MEMORIES
            </motion.h1>
            <motion.div 
              className="h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent w-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
            />
            <motion.p
              className="text-white mt-4 tracking-[0.3em] text-sm sm:text-lg font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              NEVER DIE
            </motion.p>

            {/* Tombol Lihat Kenangan */}
            <AnimatePresence>
              {showButton && (
                <motion.button
                  onClick={handleEnter}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(220, 38, 38, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mt-12 px-8 py-3.5 relative group overflow-hidden rounded-full bg-zinc-900/40 border border-red-600/30 text-white font-medium tracking-widest text-sm uppercase transition-all hover:border-red-500 backdrop-blur-sm"
                >
                  {/* Efek Kilauan (Shine) saat Hover */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    LIHAT KENANGAN
                    <motion.svg 
                      animate={{ x: [0, 5, 0] }} 
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="w-4 h-4 text-red-500 group-hover:text-red-400 transition-colors" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
