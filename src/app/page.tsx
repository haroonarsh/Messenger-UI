import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/heroSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#ffffff]">
      <Header />
      <HeroSection />
      <Footer />
    </main>
  );
}
