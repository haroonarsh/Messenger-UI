import Image from 'next/image'
import React from 'react'
import { TiArrowSortedDown } from "react-icons/ti";

function Footer() {
  return (
      <footer className="border-t w-full border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
              <p className="text-black text-sm">© Meta 2025</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center space-x-2 text-gray-500 text-sm">
              <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-6">
                <a href="#" className="text-black text-[13px] cursor-pointer">
                  Privacy Policy
                </a>
                <a href="#" className="text-black text-[13px] cursor-pointer">
                  Cookie Policy
                </a>
                <a href="#" className="text-black text-[13px] cursor-pointer">
                  Terms
                </a>
                <a href="#" className="text-gray-500 hover:text-black border-b-[2px] border-transparent hover:border-black text-[13px] flex items-center space-x-2 cursor-pointer">
                  English (UK)<TiArrowSortedDown className="w-4 h-4" />
                </a>
              </div>
              <div className="pl-0 md:pl-8 lg:pl-16 lx:pl-24">
                <Image src="/meta-logo.png" alt="Meta Logo" width={150} height={100} />
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer