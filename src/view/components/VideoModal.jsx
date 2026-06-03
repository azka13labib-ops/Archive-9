import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isHoveringVolume, setIsHoveringVolume] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset state when opened
      setCurrentTime(0);
      setIsPlaying(false);
      setShowControls(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    } else {
      document.body.style.overflow = "unset";
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle auto-hiding controls
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  const handleMouseLeave = () => {
    setShowControls(false);
  };

  useEffect(() => {
    if (isPlaying) {
      handleMouseMove();
    }
    return () => clearTimeout(controlsTimeoutRef.current);
  }, [isPlaying, handleMouseMove]);

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const m = Math.floor(timeInSeconds / 60).toString().padStart(2, "0");
    const s = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Video Event Handlers
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSkip = (amount) => {
    if (videoRef.current) {
      videoRef.current.currentTime += amount;
    }
  };

  const handleProgressScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = percent * duration;
      setCurrentTime(percent * duration);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (newMuted) {
        setVolume(0);
      } else {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Listen for native fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Close Button */}
          <motion.button
            className="absolute top-6 right-6 z-[60] w-12 h-12 flex items-center justify-center rounded-full bg-neutral-900/60 text-white hover:bg-neutral-800 hover:scale-110 transition-all border border-white/10"
            onClick={onClose}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            title="Tutup"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Video Container */}
          <div
            ref={containerRef}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group flex flex-col justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => { if (showControls) handleMouseMove(); }}
          >
            {/* Click area to toggle play/pause when controls are hidden */}
            <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} />

            <video
              ref={videoRef}
              src="/video-kenangan.mp4"
              className="w-full h-full object-contain bg-black"
              controls={false}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlay}
            />

            {/* Top Gradient Overlay for Info */}
            <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 to-transparent pointer-events-none transition-opacity duration-500 z-20 ${showControls && !isFullscreen ? 'opacity-100' : 'opacity-0'}`} />

            {/* Bottom Gradient Overlay for Controls */}
            <div className={`absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none transition-opacity duration-500 z-20 ${showControls ? 'opacity-100' : 'opacity-0'}`} />

            {/* "Special Memory" Info Overlay (Top Left) */}
            <div className={`absolute top-6 sm:top-10 left-6 sm:left-10 right-6 sm:right-20 z-30 pointer-events-none transition-all duration-500 ${showControls && !isFullscreen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <h2 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl mb-2 drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                Video Kenangan Angkatan
              </h2>
              <p className="text-neutral-300 text-xs sm:text-sm md:text-base max-w-2xl drop-shadow-md leading-relaxed hidden sm:block">
                Sebuah dedikasi singkat untuk merangkum tawa, air mata, dan perjuangan kita selama 3 tahun bersama di sekolah. Jangan lupakan setiap detik yang pernah kita ukir.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
                <span></span>
                <span className="italic">Kenangan Terindah - Samsons</span>
              </div>
            </div>

            {/* Custom Controls (Bottom) */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-30 transition-all duration-500 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              
              {/* Progress Bar Area */}
              <div 
                className="w-full h-1.5 sm:h-2 bg-neutral-700/60 rounded-full mb-4 sm:mb-6 cursor-pointer relative group/progress"
                onClick={handleProgressScrub}
              >
                <div 
                  className="absolute top-0 left-0 h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.7)] rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow-md" />
                </div>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Play / Pause */}
                  <button onClick={togglePlay} className="text-white hover:text-red-500 transition-colors hover:scale-110">
                    {isPlaying ? (
                      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    ) : (
                      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>

                  {/* Skip -10s */}
                  <button onClick={() => handleSkip(-10)} className="text-white hover:text-neutral-300 transition-colors hidden sm:block">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                    </svg>
                  </button>

                  {/* Skip +10s */}
                  <button onClick={() => handleSkip(10)} className="text-white hover:text-neutral-300 transition-colors hidden sm:block">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z" />
                    </svg>
                  </button>

                  {/* Volume Control */}
                  <div 
                    className="flex items-center gap-2 group/volume relative"
                    onMouseEnter={() => setIsHoveringVolume(true)}
                    onMouseLeave={() => setIsHoveringVolume(false)}
                  >
                    <button onClick={toggleMute} className="text-white hover:text-neutral-300 transition-colors w-6 sm:w-8">
                      {isMuted || volume === 0 ? (
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                      ) : volume < 0.5 ? (
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072" /></svg>
                      ) : (
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                      )}
                    </button>
                    {/* Volume Slider */}
                    <div className={`w-0 overflow-hidden transition-all duration-300 ease-in-out ${isHoveringVolume ? 'w-20 sm:w-24' : ''}`}>
                      <input 
                        type="range" 
                        min="0" max="1" step="0.05" 
                        value={isMuted ? 0 : volume} 
                        onChange={handleVolumeChange}
                        className="w-full h-1 bg-neutral-600 rounded-lg appearance-none cursor-pointer accent-red-600"
                      />
                    </div>
                  </div>

                  {/* Time Counter */}
                  <div className="text-white text-xs sm:text-sm font-medium tracking-wide">
                    {formatTime(currentTime)} <span className="text-neutral-500 mx-1">/</span> {formatTime(duration)}
                  </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-4">
                  {/* Fullscreen Toggle */}
                  <button onClick={toggleFullscreen} className="text-white hover:text-neutral-300 transition-colors">
                    {isFullscreen ? (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4H4v7m16 0V4h-7M4 20h7m6 0h7v-7" /></svg>
                    ) : (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
