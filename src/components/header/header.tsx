'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { TiArrowSortedDown } from "react-icons/ti";
import { HiOutlineMenu } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeatureMenuOpen, setIsFeatureMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleFeatureMenu = () => {
    setIsFeatureMenuOpen(!isFeatureMenuOpen);
  };
  return (
    <>
      {/* For large screens */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 flex w-full justify-between items-center h-26 text-white">
        <Image src="/messenger.png" alt="Logo" width={40} height={40} className='cursor-pointer' onClick={() => router.push('/')}/>
        <ul className="hidden md:flex space-x-7 text-black font-semibold  font-sans">
          <li className="flex items-center cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]" onClick={toggleFeatureMenu} >Features <TiArrowSortedDown className={`w-4 h-4 ${isFeatureMenuOpen ? 'rotate-180' : ''}`}/></li>
          <li className='cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]' onClick={() => router.push('/privacy')}>Privacy and safety</li>
          <li className='cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]' onClick={() => router.push('/desktop')}>Desktop app</li>
          <li className='cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]' onClick={() => router.push('/developers')}>For developers</li>
          <li className='cursor-pointer border-b-[3.5px] border-transparent hover:border-[#0a7cff]' onClick={() => router.push('/help')}>Help Centre</li>
        </ul>
        <HiOutlineMenu onClick={toggleMenu} className={`w-8 h-8 text-black cursor-pointer md:hidden ${isMenuOpen ? 'hidden' : 'block'}`} />
        <RxCross1 onClick={toggleMenu} className={`w-7 h-7 text-black cursor-pointer md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} />
      </div>
      </div>
      <div className="h-28 md:h-45"></div> {/* Spacer for fixed header */}

      {/* Feature Menu for medium and large screens */}
      <div className={`fixed hidden md:flex top-0 left-0 z-50 w-full bg-white ${isFeatureMenuOpen ? 'md:top-25' : 'md:top-[-48rem]'} duration-300`}>
      <div className='max-w-[94%] mx-auto xl:px-10 py-4 font-sans'>
      <div className={`justify-between items-center gap-6  ${isFeatureMenuOpen ? 'flex' : 'hidden'}`}>
        <div className='bg-[#f4f9fe] w-full px-6 py-8 rounded-xl flex flex-col gap-4 cursor-pointer'
          onClick={() => router.push("/features#useful")}
          >
          <h1 className='text-2xl font-semibold font-sans text-[#333333]'>Useful</h1>
          <p className='text-[19px] font-sans text-[#595959]'>Show up for your family and friends with everyday connection.</p>
          <FaArrowRightLong className='text-[#0a7cff] h-5 w-5' />
        </div>
        <div className='bg-[#f4f9fe] w-full px-6 py-8 rounded-xl flex flex-col gap-4 cursor-pointer'
          onClick={() => router.push("/features#social")}
        >
          <h1 className='text-2xl font-semibold font-sans text-[#333333]'>Social</h1>
          <p className='text-[19px] font-sans text-[#595959]'>Build community with people who share your passions and interests.</p>
          <FaArrowRightLong className='text-[#0a7cff] h-5 w-5' />
        </div>
        <div className='bg-[#f4f9fe] w-full px-6 py-8 rounded-xl flex flex-col gap-4 cursor-pointer'
          onClick={() => router.push("/features#expressive")}
        >
          <h1 className='text-2xl font-semibold font-sans text-[#333333]'>Expressive</h1>
          <p className='text-[19px] font-sans text-[#595959]'>Let your personality shine and express yourself beyond words.</p>
          <FaArrowRightLong className='text-[#0a7cff] h-5 w-5' />
        </div>
        </div>
      </div>
      </div>

      {/* For small screens */}
      <div className={`fixed top-25 py-4 left-0 bg-white w-full md:hidden ${isMenuOpen ? 'block border-t-[1px]' : 'hidden'} shadow-lg z-50`}>
          <ul className="flex flex-col gap-7 md:hidden space-x-7 text-[#333333] font-semibold  font-sans">
          <li className="flex items-center justify-between w-full px-4 cursor-pointer text-3xl font-semibold font-sans" onClick={toggleFeatureMenu}><span className='border-b-[3.5px] border-transparent hover:border-[#0a7cff]'>Features</span> <FaAngleDown className={`w-5 h-5 ${isFeatureMenuOpen ? 'rotate-180' : ''}`}/></li>
          <li className={`w-full flex flex-col gap-2 ${isFeatureMenuOpen ? 'block' : 'hidden'}`}>
            <span className='flex items-center justify-between p-4 md:hidden cursor-pointer w-full bg-[#f4f9fe] border-b-[3.5px] border-transparent hover:border-[#0a7cff] text-2xl font-semibold font-sans' onClick={() => router.push("/features#useful")}>Useful <FaArrowRightLong className='text-[#0a7cff] h-5 w-5' /></span>
            <span className='flex items-center justify-between p-4 md:hidden cursor-pointer w-full bg-[#f4f9fe] border-b-[3.5px] border-transparent hover:border-[#0a7cff] text-2xl font-semibold font-sans' onClick={() => router.push("/features#social")}>Social <FaArrowRightLong className='text-[#0a7cff] h-5 w-5' /></span>
            <span className='flex items-center justify-between p-4 md:hidden cursor-pointer w-full bg-[#f4f9fe] border-b-[3.5px] border-transparent hover:border-[#0a7cff] text-2xl font-semibold font-sans' onClick={() => router.push("/features#expressive")}>Expressive <FaArrowRightLong className='text-[#0a7cff] h-5 w-5' /></span>
          </li>
          <li className='cursor-pointer w-fit px-4 border-b-[3.5px] border-transparent hover:border-[#0a7cff] text-3xl font-semibold font-sans'>Privacy and safety</li>
          <li className='cursor-pointer w-fit px-4 border-b-[3.5px] border-transparent hover:border-[#0a7cff] text-3xl font-semibold font-sans'>Desktop app</li>
          <li className='cursor-pointer w-fit px-4 border-b-[3.5px] border-transparent hover:border-[#0a7cff] text-3xl font-semibold font-sans'>For developers</li>
          <li className='cursor-pointer w-fit px-4 border-b-[3.5px] border-transparent hover:border-[#0a7cff] text-3xl font-semibold font-sans'>Help Centre</li>
        </ul>
      </div>
    </>
  )
}

export default Header