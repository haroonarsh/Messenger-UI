import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import Helpcentre from '@/components/helpcentre/helpcentre'

function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#ffffff]">
      <Header />
      <Helpcentre />
      <Footer />
    </main>
  )
}

export default page