import Privacy from '@/components/privacy/privacy'
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import React from 'react'

function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#ffffff]">
      <Header />
      <Privacy />
      <Footer />
    </main>
  )
}

export default page