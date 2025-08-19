import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import HeroSection from "@/components/homeHeroSection/homeHeroSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#ffffff]">
      <Header />
      <HeroSection />
      <Footer />
    </main>
  );
}
