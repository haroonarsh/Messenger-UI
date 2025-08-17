import Developers from "@/components/developers/developers";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#ffffff]">
      <Header />
      <Developers />
      <Footer />
    </main>
  )
}
