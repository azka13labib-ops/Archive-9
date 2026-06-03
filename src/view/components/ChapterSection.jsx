import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chapters = [
  {
    number: "07",
    title: "CLASS 7",
    subtitle: "The Beginning of Our Journey",
    image: "/praktek9/foto bersama/WhatsApp Image 2026-04-29 at 22.33.40.jpeg",
    description: "Masa-masa awal di sekolah menengah. Awal dari persahabatan, penyesuaian diri dengan lingkungan baru, dan momen-momen pertama yang penuh keceriaan saat pertama kali kita bertemu di kelas 7.",
    tags: ["Orientation", "New Friends", "The Beginning"]
  },
  {
    number: "08",
    title: "CLASS 8",
    subtitle: "Growing Together",
    image: "/praktek9/foto bersama/WhatsApp Image 2026-04-29 at 22.33.41.jpeg",
    description:
      "Tahun kedua yang penuh warna. Ikatan pertemanan semakin kuat melalui berbagai kegiatan sekolah, canda tawa di kantin, dan kenangan indah yang mulai terbentuk semakin dalam di kelas 8.",
    tags: ["Solidarity", "School Events", "Middle Journey"]
  },
    {
    number: "09",
    title: "CLASS 9",
    subtitle: "The Final Chapter",
    image: "/praktek9/foto bersama/IMG_20260429_043511_393.png",
    description: "Tahun terakhir yang penuh perjuangan dan kenangan. Mulai dari ujian praktek hingga persiapan kelulusan, setiap detik menjadi sangat berharga sebelum kita melangkah ke jenjang berikutnya.",
    tags: ["Graduation", "Final Exams", "Unforgettable"]
  },
];

const cardVariants = (fromLeft) => ({
  hidden: { opacity: 0, x: fromLeft ? -120 : 120 },
  visible: {
    opacity: 1, x: 0,
    transition: { type: "spring", stiffness: 60, damping: 18, mass: 1 },
  },
});

const textVariants = (fromLeft) => ({
  hidden: { opacity: 0, x: fromLeft ? -60 : 60 },
  visible: {
    opacity: 1, x: 0,
    transition: { type: "spring", stiffness: 60, damping: 18, mass: 1, delay: 0.15 },
  },
});

function ChapterCard({ chapter, index, onSelect }) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col items-center gap-6 md:gap-14 py-8 md:py-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Card Side (Clickable for Modal) — appears FIRST on mobile */}
      <motion.div
        layoutId={`chapter-card-${chapter.number}`}
        className="w-full md:w-1/2 relative aspect-video border-2 border-transparent rounded overflow-hidden transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] group cursor-pointer order-1 md:order-none"
        variants={cardVariants(!isEven)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        onClick={() => onSelect(chapter)}
      >
        <motion.img
          layoutId={`chapter-img-${chapter.number}`}
          src={chapter.image}
          alt={chapter.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <motion.div 
          layoutId={`chapter-overlay-${chapter.number}`}
          className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" 
        />

        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-start justify-between z-10 pointer-events-none">
          <motion.span layoutId={`chapter-subtitle-${chapter.number}`} className="text-[10px] sm:text-xs text-neutral-300 font-medium tracking-wide">
            {chapter.subtitle}
          </motion.span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <motion.h3
            layoutId={`chapter-title-${chapter.number}`}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[0.15em] sm:tracking-[0.2em] uppercase text-center leading-tight"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            {chapter.title}
          </motion.h3>
        </div>
      </motion.div>

      {/* Text Side — appears SECOND on mobile */}
      <motion.div
        className={`w-full md:w-1/2 text-center md:text-left order-2 md:order-none ${isEven ? "" : "md:text-right"}`}
        variants={textVariants(isEven)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className={`flex items-baseline gap-3 sm:gap-4 mb-3 sm:mb-4 justify-center ${isEven ? "md:justify-start" : "md:justify-end"}`}>
          <span className="text-xs sm:text-sm text-neutral-500 font-medium tracking-widest uppercase">
            Chapter
          </span>
          <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white/10" style={{ fontFamily: "'Playfair Display', serif" }}>
            {chapter.number}
          </span>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed mb-4 sm:mb-6 max-w-md mx-auto md:mx-0">
          {chapter.description}
        </p>
        <div className={`flex flex-wrap items-center gap-3 sm:gap-4 justify-center ${isEven ? "md:justify-start" : "md:justify-end"}`}>
          {chapter.tags.map((tag, i) => (
            <span
              key={tag}
              className={`text-[10px] sm:text-xs font-semibold tracking-wider uppercase ${
                i === 1 ? "text-netflix-red" : "text-neutral-500"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ChapterSection() {
  const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    if (selectedChapter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedChapter]);

  // Prevent closing when clicking inside the modal content box
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto space-y-16 sm:space-y-20 md:space-y-24" id="chapters">
        {chapters.map((chapter, index) => (
          <ChapterCard 
            key={chapter.number} 
            chapter={chapter} 
            index={index} 
            onSelect={setSelectedChapter} 
          />
        ))}
      </section>

      {/* EXPANDED MODAL (Shared Element Transition) */}
      <AnimatePresence>
        {selectedChapter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-10">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedChapter(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div
              layoutId={`chapter-card-${selectedChapter.number}`}
              onClick={handleModalClick}
              className="relative w-[95%] sm:w-[90%] md:w-full max-w-4xl lg:max-w-5xl max-h-[85vh] sm:max-h-[90vh] bg-[#181818] rounded-xl overflow-y-auto shadow-2xl flex flex-col z-10 border border-neutral-800 scrollbar-hide"
              style={{ overflowX: "hidden" }}
            >
              {/* Header Image Area */}
              <div className="relative w-full h-[30vh] sm:h-[35vh] md:h-[50vh] shrink-0 border-b-4 border-netflix-red">
                <motion.img
                  layoutId={`chapter-img-${selectedChapter.number}`}
                  src={selectedChapter.image}
                  alt={selectedChapter.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <motion.div 
                  layoutId={`chapter-overlay-${selectedChapter.number}`}
                  className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" 
                />
                
                {/* Netflix Top Bar */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-12 sm:right-16 flex justify-between z-10">
                  <motion.span layoutId={`chapter-subtitle-${selectedChapter.number}`} className="text-xs sm:text-sm md:text-base text-neutral-300 font-medium tracking-wide">
                    {selectedChapter.subtitle}
                  </motion.span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedChapter(null)}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-[#181818]/60 hover:bg-[#181818] text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border border-white/10 hover:scale-110 group"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-netflix-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-8 md:p-12 relative -mt-10 sm:-mt-14 md:-mt-16 z-20">
                <motion.h3
                  layoutId={`chapter-title-${selectedChapter.number}`}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-widest uppercase mb-3 sm:mb-4"
                  style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
                >
                  {selectedChapter.title}
                </motion.h3>

                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm md:text-base text-neutral-400 mb-6 sm:mb-8 font-semibold tracking-wide items-center">
                  <span className="text-[#46d369] font-bold">100% Match</span>
                  <span className="text-netflix-red">Chapter {selectedChapter.number}</span>
                  <span>2023</span>
                  <span className="border border-neutral-600 px-1.5 sm:px-2 py-0.5 rounded-sm text-[10px] sm:text-xs">HD</span>
                </div>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 leading-relaxed max-w-3xl">
                  {selectedChapter.description} Ini adalah momen epik di mana seluruh kelas bersatu, mengerahkan seluruh kreativitas, dan menciptakan kenangan tak terlupakan.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
