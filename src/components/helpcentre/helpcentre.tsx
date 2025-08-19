import Image from 'next/image';
import React from 'react'
import { IoSearch } from "react-icons/io5";
import { MdKey } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";

function Helpcentre() {
  return (
    <div className="min-h-screen w-[100%] md:pt-32 py-16 md:py-0">
        <div className="flex flex-col max-w-4xl mx-auto px-4 md:px-9 items-start justify-between gap-3 text-gray-950">
        <h1 className='text-2xl font-bold font-sans text-gray-950'>How can we help you?</h1>
        <div className='flex items-center justify-start px-4 py-4 w-full rounded-xl bg-[#f5f5f5]'>
            <IoSearch className='text-[27px] text-gray-500'/>
            <input type="text" placeholder='Search help articles...' className="rounded-md p-2 pl-3 w-full md:w-80 text-black text-sm placeholder:text-gray-500 focus:outline-none bg-[#f5f5f5]"/>
        </div>
        <div className='flex items-center justify-between px-4 py-4 w-full rounded-xl bg-[#e7f3ff]'>
            <div className='flex items-center gap-2'>
                <MdKey className='text-[50px] border border-blue-600 bg-blue-600 text-white rounded-full p-3'/>
                <span>
                <h2 className='text-[19px] text-[#0099ff] font-semibold font-sans'>Need help with logging in?</h2>
                <p className='text-[15px] font-sans font-extralight text-gray-600'>Learn what to do if you're having trouble with getting back on the Messenger app.</p>
                </span>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-[15px] font-semibold font-sans cursor-pointer">Get Help</button>
        </div>
        <div className='flex md:flex-row flex-col items-center justify-between gap-4 my-16'>
            <div className='flex flex-col gap-2 text-[#0099ff] text-[17px] font-bold font-sans'>
                <h2 className='text-gray-950 text-xl'>Trending topics</h2>
                <h2 className='cursor-pointer w-fit border-b-[1px] border-transparent hover:border-[#0a7cff]'>Ask Meta AI on Messenger</h2>
                <h2 className='cursor-pointer w-fit border-b-[1px] border-transparent hover:border-[#0a7cff]'>Generate images with Meta AI in chats on Messenger</h2>
                <h2 className='cursor-pointer w-fit border-b-[1px] border-transparent hover:border-[#0a7cff]'>Create a channel on Facebook or Messenger</h2>
                <h2 className='cursor-pointer w-fit border-b-[1px] border-transparent hover:border-[#0a7cff]'>Block someone's profile on Messenger</h2>
                <h2 className='cursor-pointer w-fit border-b-[1px] border-transparent hover:border-[#0a7cff]'>Unable to send messages on Messenger</h2>
                <h2 className='cursor-pointer w-fit border-b-[1px] border-transparent hover:border-[#0a7cff] '>What end-to-end encryption on Messenger means and how it works</h2>
                <h2 className='cursor-pointer w-fit border-b-[1px] border-transparent hover:border-[#0a7cff]'>What to do if someone's bothering you on Messenger</h2>
            </div>
            <Image src="/help1.png" alt="Help Image" width={500} height={500} className="max-w-full h-auto" />
        </div>
        <h1 className='text-2xl font-bold font-sans text-gray-950'>Looking for something else?</h1>
        <div className='flex items-center justify-between px-4 py-4 cursor-pointer w-full mb-20 rounded-xl bg-[#f5f5f5]'>
            <div className='flex items-center gap-2'>
                <Image src="/help2.png" alt="Help Image" width={100} height={100}/>
                <span>
                <h2 className='text-[19px] font-semibold font-sans'>Visit Business Help Centre</h2>
                <p className='text-[15px] font-sans font-extralight text-gray-900'>Learn more about promoting your business on Messenger</p>
                </span>
            </div>
            <GoArrowRight className='text-[25px] text-gray-500'/>
        </div>
        </div>
    </div>
  )
}

export default Helpcentre