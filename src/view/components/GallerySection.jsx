import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["ABOUT US", "EPISODE", "ACHIEVEMENT", "MORE"];

const galleryDataByTab = {
  "ABOUT US": [
    { 
      title: "SINOPSIS: ANGKATAN 2026", 
      description: "Kisah persahabatan 3 tahun di MTs Raudlatul Ulum. Berawal dari bangku kelas 7 yang canggung di tahun 2024, tumbuh bersama di kelas 8, hingga lulus dengan kenangan indah di kelas 9 pada tahun 2026." 
    },
    { 
      title: "KILAS BALIK 3 SEASON", 
      description: "Merangkum setiap tawa, tangis, tugas kelompok yang dikerjakan mendadak, hingga coretan konyol di papan tulis. Tiga season perjalanan sekolah yang tidak akan pernah diproduksi ulang." 
    },
    { 
      title: "SET UTAMA: RUANG KELAS", 
      description: "Tempat segala drama, candaan di jam kosong, dan tidur siang tersembunyi terjadi. Saksi bisu perjuangan kami meraih masa depan bersama." 
    }
  ],
  "EPISODE": [
    { 
      image: "/praktek9/foto bersama/WhatsApp Image 2026-04-29 at 22.33.40.jpeg", 
      title: "EP 1: PERTEMUAN PERTAMA", 
      description: "Pertemuan pertama kita di kelas 7 pada tahun 2024. Masih saling diam, duduk berjauhan, pemalu, dan belum tahu kalau kita akan menjadi sahabat sedekat nadi." 
    },
    { 
      image: "/praktek9/praktek/WhatsApp Image 2026-04-27 at 09.51.07.jpeg", 
      title: "EP 2: DRAMA PASTEL BASAH", 
      description: "Ujian praktek membuat pastel basah yang penuh kekacauan. Mulai dari rebutan spatula, adonan yang robek, hingga isian pastel yang luber. Namun, tawa kita saat memasak membuatnya tiada duanya." 
    },
    { 
      image: "/praktek9/foto bersama/tka.jpeg", 
      title: "EP 3: SEASON FINAL (LULUS)", 
      description: "Momen menegangkan selama Tes Kemampuan Akademik (TKA) dan malam-malam begadang belajar bersama. Garis akhir perjuangan masa putih biru kami yang penuh haru." 
    }
  ],
  "ACHIEVEMENT": [
    {
      title: "PIALA SENI PERAN",
      description: "Kekompakan kelas saat ujian praktek Bahasa Indonesia mementaskan cerita legenda nusantara. Dari sutradara dadakan sampai pemeran pembantu, semua tampil all-out!"
    },
    {
      title: "BEST CREATIVE: NO BACKPACK DAY",
      description: "Kreativitas tingkat tinggi saat dilarang membawa tas punggung ke sekolah. Digantikan dengan ember, rice cooker, jemuran, hingga kantong belanja random."
    },
    {
      title: "PIALA NOSTALGIA BERSAMA",
      description: "Foto studio bersama yang sederhana namun bernilai tinggi. Bukti fisik terindah bahwa kita pernah tertawa lepas bersama di bawah satu atap sekolah yang sama."
    },
  ],
  "MORE": [
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.51.42 (1).jpeg", title: "AIB MOMENT 1" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.51.42.jpeg", title: "AIB MOMENT 2" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.51.43 (1).jpeg", title: "AIB MOMENT 3" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.51.43 (2).jpeg", title: "AIB MOMENT 4" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.51.43.jpeg", title: "AIB MOMENT 5" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.51.48.jpeg", title: "AIB MOMENT 6" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.51.49 (1).jpeg", title: "AIB MOMENT 7" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.51.49.jpeg", title: "AIB MOMENT 8" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.51.58 (1).jpeg", title: "AIB MOMENT 9" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.51.58.jpeg", title: "AIB MOMENT 10" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.51.59 (1).jpeg", title: "AIB MOMENT 11" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.51.59.jpeg", title: "AIB MOMENT 12" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.52.00 (1).jpeg", title: "AIB MOMENT 13" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.52.00.jpeg", title: "AIB MOMENT 14" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.52.02 (1).jpeg", title: "AIB MOMENT 15" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.52.02.jpeg", title: "AIB MOMENT 16" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.52.03.jpeg", title: "AIB MOMENT 17" },
    { image: "/praktek9/aib/WhatsApp Image 2026-05-16 at 20.52.04.jpeg", title: "AIB MOMENT 18" }
  ]
};

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState(3); // ACHIEVEMENT is active by default
  const currentTabName = tabs[activeTab];
  const currentData = galleryDataByTab[currentTabName];

  return (
    <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto overflow-hidden">
      {/* Navigation Tabs — horizontally scrollable on mobile */}
      <div className="flex md:justify-center gap-4 sm:gap-6 md:gap-12 mb-12 sm:mb-16 md:mb-20 overflow-x-auto whitespace-nowrap pb-4 hide-scrollbar">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`relative text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wide pb-2 transition-colors duration-300 flex-shrink-0 ${
              activeTab === i ? "text-white" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {tab}
            {activeTab === i && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 bottom-0 h-1 bg-netflix-red"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Gallery Grid — responsive columns */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentTabName}
          className={currentTabName === "MORE" ? "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentTabName === "MORE" ? (
            currentData.map((item, index) => (
              <div key={index} className="relative group overflow-hidden rounded-md sm:rounded-lg aspect-square sm:aspect-auto sm:h-64 cursor-pointer bg-neutral-800">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-6">
                  <div className="flex justify-between items-end w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-bold text-sm sm:text-lg tracking-wider shadow-black drop-shadow-md">
                      {item.title}
                    </h3>
                    <a 
                      href={item.image} 
                      download 
                      className="text-white bg-black/30 hover:bg-red-600 backdrop-blur-sm p-1.5 sm:p-2 rounded-full transition-all shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                      title="Download Image"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            currentData.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {item.image && (
                  <div className="w-full aspect-[4/3] rounded-md sm:rounded-lg overflow-hidden mb-4 sm:mb-6 bg-neutral-800 shadow-lg border border-white/5 relative group">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                    {/* Download Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3 sm:p-4 pointer-events-none">
                      <a 
                        href={item.image} 
                        download 
                        className="bg-black/30 hover:bg-red-600 text-white p-2 sm:p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 pointer-events-auto transform translate-y-4 group-hover:translate-y-0 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                        title="Download Image"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 uppercase tracking-wider">{item.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
