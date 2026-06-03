import HeroSection from "../components/HeroSection";
import ChapterSection from "../components/ChapterSection";
import GallerySection from "../components/GallerySection";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import MusicPlayer from "../components/MusicPlayer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <Preloader />
      <HeroSection />
      <ChapterSection />
      <GallerySection />
      <Footer />
      <MusicPlayer />
    </div>
  );
}