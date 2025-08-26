import React from 'react'
import { MdFacebook } from "react-icons/md";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import Image from 'next/image';

function FriendsBar() {
  return (
    <div className='flex flex-col gap-3 bg-[#ffffff] min-w-[338px] xl:min-w-[352px] h-full shadow-lg my-4 rounded-xl text-[#595959] font-sans px-4 py-2'>
      <div className='flex items-center justify-between text-gray-950'>
        <h1 className='text-2xl font-bold'>Chats</h1>
        <span className='flex items-center gap-2'>
          <span className='relative text-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer p-[6px] rounded-full'><MdFacebook />
          <span className='absolute w-[12px] h-[12px] rounded-full border-2 top-0 right-0 border-white bg-blue-600' />
          </span>
          <span className='text-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer p-[6px] rounded-full'><HiMiniPencilSquare /></span>
        </span>
      </div>
      <div className='flex items-center justify-start gap-2 bg-gray-100 hover:bg-gray-200 cursor-pointer px-[6px] py-[3px] rounded-full'>
        <IoSearch className='text-3xl pl-2 text-gray-500'/>
        <input type="text" placeholder='Search Messenger' className='text-gray-950 focus:outline-none'/>
      </div>
      <div className='flex flex-col scrollbar-component pr-1'>
        <div className='group flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-lg duration-75'>
          <Image src="/side1.png" alt="Hero Image" width={100} height={100} className="w-[45px] h-[45px] cursor-pointer rounded-full border border-gray-300" />
          <div className='relative'>
            <h2 className='text-gray-950'>Haroon Arshad</h2>
            <p className='text-gray-500 text-sm'>Haroon send you a message. <span>1 min</span></p>
            <span className='hidden group-hover:block absolute rounded-full border-2 top-1 cursor-pointer right-0 border-gray-200 bg-white shadow-xs hover:bg-gray-100 p-2'>
              <BsThreeDots className='text-md text-gray-500' />
            </span>
          </div>
        </div>
        <div className='group flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-lg duration-75'>
          <Image src="/side2.png" alt="Hero Image" width={100} height={100} className="w-[45px] h-[45px] cursor-pointer rounded-full border border-gray-300" />
          <div className='relative'>
            <h2 className='text-gray-950'>Haroon Arshad</h2>
            <p className='text-gray-500 text-sm'>Haroon send you a message. <span>1 min</span></p>
            <span className='hidden group-hover:block absolute rounded-full border-2 top-1 cursor-pointer right-0 border-gray-200 bg-white shadow-xs hover:bg-gray-100 p-2'>
              <BsThreeDots className='text-md text-gray-500' />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendsBar;