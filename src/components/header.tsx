'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { TiArrowSortedDown } from "react-icons/ti";
import { HiOutlineMenu } from "react-icons/hi";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className="fixed max-w-7xl mx-auto px-4 md:px-10 py-8 flex w-full justify-between items-center h-26 bg-[#ffffff] text-white">
        <Image src="/messenger.png" alt="Logo" width={40} height={40} />
        <ul className="hidden md:flex space-x-7 text-black font-semibold  font-sans">
          <li className="flex items-center cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]">Features <TiArrowSortedDown /></li>
          <li className='cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]'>Privacy and safety</li>
          <li className='cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]'>Desktop app</li>
          <li className='cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]'>For developers</li>
          <li className='cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]'>Help Centre</li>
        </ul>
        <HiOutlineMenu onClick={toggleMenu} className="w-8 h-8 text-black cursor-pointer md:hidden" />
      </div>
      <div className="h-28 md:h-45"></div> {/* Spacer for fixed header */}

      {/* For small screens */}
      <div className={`fixed top-25 left-0 bg-white w-full md:hidden ${isMenuOpen ? 'block' : 'hidden'} shadow-lg z-50`}>
          <ul className="flex flex-col gap-4 p-4 md:hidden space-x-7 text-black font-semibold  font-sans">
          <li className="flex items-center cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]">Features <TiArrowSortedDown /></li>
          <li className='cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]'>Privacy and safety</li>
          <li className='cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]'>Desktop app</li>
          <li className='cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]'>For developers</li>
          <li className='cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]'>Help Centre</li>
        </ul>
      </div>
    </>
  )
}

export default Header