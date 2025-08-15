import Image from 'next/image'
import React from 'react'
// import { ChevronDown } from "";

function HeroSection() {
  return (
    <div className="max-h-screen mb-[3rem] md:mb-[12rem] max-w-7xl mx-auto px-4 md:px-10 bg-white">
        <div className="flex w-[100%] flex-col md:flex-row items-center justify-between gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[65%]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[4.8rem] font-sans font-bold text-blue-600 leading-tight">
              Go big with Messenger
            </h1>

            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              A simple app that lets you text, video call and stay close to people you care about. For Mac and PC.
            </p>

            <div className="space-y-4">
              <Image src="/microsoft.png" alt="Microsoft Logo" width={150} height={150} />
              <p className="text-sm text-gray-500">
                You need to be on macOS 12 (Monterey) or higher to use the desktop app.
              </p>
            </div>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/heroImage.png" alt="Hero Image" width={1200} height={1200} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
  )
}

export default HeroSection