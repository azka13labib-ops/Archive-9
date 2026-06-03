import { useRef, useEffect } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3; // Volume lagu 30%

    const tryPlayAudio = () => {
      if (audio.paused) {
        audio.play().catch((error) => {
          console.log("Browser memblokir autoplay. Menunggu interaksi pengguna...");
        });
      }
    };

    // Coba putar langsung saat halaman dimuat
    tryPlayAudio();

    // Daftar event interaksi yang bisa memicu lagu
    const interactionEvents = ["click", "touchstart", "keydown", "scroll", "mousemove"];
    
    const onInteraction = () => {
      tryPlayAudio();
    };

    // Tambahkan listener ke seluruh window
    interactionEvents.forEach(event => {
      window.addEventListener(event, onInteraction, { passive: true });
    });

    // Hanya hapus listener jika lagu sudah benar-benar berhasil diputar
    const onPlay = () => {
      interactionEvents.forEach(event => {
        window.removeEventListener(event, onInteraction);
      });
    };

    audio.addEventListener("play", onPlay);

    return () => {
      interactionEvents.forEach(event => {
        window.removeEventListener(event, onInteraction);
      });
      audio.removeEventListener("play", onPlay);
    };
  }, []);

  return (
    <audio 
      ref={audioRef} 
      src="/backsound.mp3" 
      loop 
      preload="auto"
    />
  );
}
