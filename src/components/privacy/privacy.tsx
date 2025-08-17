'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

function Privacy() {
  const router = useRouter();
  return (
    <>
    <div className="min-h-screen mb-[3rem] max-w-7xl mx-auto px-4 md:px-10 bg-white">
      <div className="flex w-[100%] flex-col items-center justify-center text-center gap-[4rem] ">
        {/* Left Content */}
        <div className="space-y-6 w-full lg:w-[80%]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[4.8rem] font-sans font-semibold text-gray-950 leading-tight">
            Message with <br /> <span className="text-blue-600">peace of mind</span>
          </h1>
        </div>
        {/* Right Content */}
        <div className="flex items-center justify-center">
          <Image src="/privacy1.png" alt="Hero Image" width={950} height={900} className="max-w-full h-auto" />
        </div>
        <div className="space-y-6 w-full lg:w-[80%]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
            <span className="text-blue-600">Safely and securely</span> connect with your friends, family and the communities that matter to you
          </h1>
        </div>
      </div>
    </div>
    <div className={`w-full bg-white duration-300`}>
      <div className='max-w-[95%] md:max-w-[90%] lg:max-w-[86%] mx-auto xl:px-10 py-4 font-sans'>
      <div className={`flex lg:flex-row flex-col justify-between items-center gap-4`}>
        <div className='bg-[#f4f9fe] w-full h-[340px] px-6 py-5 rounded-xl flex flex-col justify-between gap-4'>
          <div>
          <h1 className='text-3xl font-semibold font-sans text-gray-950'>Preventing harm</h1>
          <p className='text-[19px] font-sans pt-3 text-[#595959]'>We prevent harm from reaching you through proactive measures, such as warning you of content that may contain misinformation and reducing unwanted interactions.</p>
          </div>
          <p className='text-[#0a7cff] font-semibold w-fit cursor-pointer border-b border-[#0a7cff]'
          onClick={() => router.push("/features#useful")}
          >Learn more</p>
        </div>
        <div className='bg-[#f4f9fe] w-full h-[340px] px-6 py-5 rounded-xl flex flex-col justify-between gap-4'>
          <div>
          <h1 className='text-3xl font-semibold font-sans text-gray-950'>Giving you choice and control</h1>
          <p className='text-[19px] font-sans pt-3 text-[#595959]'>We give you control of your messaging experience by providing privacy and safety tools, settings and resources.</p>
          </div>
          <p className='text-[#0a7cff] font-semibold w-fit cursor-pointer border-b border-[#0a7cff]' 
          onClick={() => router.push("/features#social")}>Learn more</p>
        </div>
        <div className='bg-[#f4f9fe] w-full h-[340px] px-6 py-5 rounded-xl flex flex-col justify-between gap-4'>
          <div>
          <h1 className='text-3xl font-semibold font-sans text-gray-950'>Responding with care</h1>
          <p className='text-[19px] font-sans pt-3 text-[#595959]'>We review and respond to potential abuse on our platform by using both machine learning technology and human reviewers. We also enforce our Community Standards and provide post-report updates and support resources.</p>
          </div>
          <p className='text-[#0a7cff] font-semibold w-fit cursor-pointer border-b border-[#0a7cff]'
          onClick={() => router.push("/features#expressive")}>Learn more</p>
        </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Privacy;