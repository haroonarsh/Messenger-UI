import React from 'react'
import Image from 'next/image';
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { BsImage } from "react-icons/bs";
import { RiEmojiStickerFill } from "react-icons/ri";
import { HiGif } from "react-icons/hi2";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { BiSolidShare } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";

function FriendChat() {
  return (
    <>
    <div className='flex flex-col gap-3 relative bg-[#ffffff] w-full mx-4 shadow-lg h-[97%] my-4 rounded-xl text-[#595959] font-sans'>
      {/* header */}
      <div className='absolute top-0 left-0 w-full px-2 py-1 rounded-t-xl flex items-center justify-between border-b border-gray-300 bg-white shadow-xs'>
        <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-[5px] py-[2px] rounded-md'>
          <Image src="/side2.png" alt="Profile Image" width={100} height={100} className="w-[36px] h-[36px] cursor-pointer rounded-full border border-gray-300" />
          <span className='flex flex-col'>
            <h2 className='text-gray-950 text-md'>Haroon Arshad</h2>
            <p className='text-gray-500 text-[13px]'>FullStack Developer</p>
          </span>
        </div>
        <div className='flex items-center gap-2 pr-1'>
          <span className='flex items-center justify-center p-[6px] rounded-full hover:bg-gray-200'>
          <BiSolidMessageRoundedDetail className='text-[22px] text-[#aa00ff] cursor-pointer' />
          </span>
          <span className='flex items-center justify-center p-[6px] rounded-full hover:bg-gray-200'>
            <PiDotsThreeCircleFill className='text-[22px] text-[#aa00ff] cursor-pointer' />
          </span>
        </div>
      </div>
      {/* chat */}
      <div className='w-full h-full scrollbar-component flex flex-col gap-2 flex-grow items-start justify-end mb-16 p-4'>
        <div className='group flex items-center gap-2'>
          <Image src="/side2.png" alt="Profile Image" width={100} height={100} className="w-[36px] h-[36px] rounded-full" />
          <p className='bg-gray-200 px-3 py-1 rounded-full text-gray-950'>Hello</p>
          <span className='hidden group-hover:flex items-center justify-center'>
            <MdEmojiEmotions className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
            <BiSolidShare className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
            <BiSolidMessageRoundedDetail className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
            <BiDotsVerticalRounded className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
          </span>
        </div>
        <div className='group flex items-center gap-2'>
          <Image src="/side2.png" alt="Profile Image" width={100} height={100} className="w-[36px] h-[36px] rounded-full" />
          <p className='bg-gray-200 px-3 py-1 rounded-full text-gray-950'>How are you doing?</p>
          <span className='hidden group-hover:flex items-center justify-center'>
            <MdEmojiEmotions className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
            <BiSolidShare className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
            <BiSolidMessageRoundedDetail className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
            <BiDotsVerticalRounded className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
          </span>
        </div>
        <div className='group flex items-start gap-2 self-end my-3'>
          <span className='hidden group-hover:flex items-center mt-1 justify-center'>
            <BiDotsVerticalRounded className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
            <BiSolidMessageRoundedDetail className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
            <BiSolidShare className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />

            <MdEmojiEmotions className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
          </span>
          <div className='self-end'>
            <p className='bg-[#3050f9] px-3 py-1 rounded-full text-gray-50'>I am fine. What about you?</p>
            <p className='text-gray-500 text-end text-[12px] mr-2'>Sent 23min ago</p>
          </div>
        </div>
      </div>
      {/* input */}
      <div className='absolute bottom-0 left-0 w-full px-2 py-3 flex items-center rounded-b-xl justify-between bg-white shadow-xs'>
        <div className='flex items-center gap-2'>
          <span className='flex items-center justify-center p-[6px] rounded-full hover:bg-gray-200'>
            <HiMiniPlusCircle className='text-[22px] text-[#3050f9] cursor-pointer' />
          </span>
          <span className='flex items-center justify-center p-[8px] rounded-full hover:bg-gray-200'>
            <BsImage className='text-[18px] text-[#3050f9] cursor-pointer' />
          </span>
          <span className='flex items-center justify-center p-[6px] rounded-full hover:bg-gray-200'>
            <RiEmojiStickerFill className='text-[22px] text-[#3050f9] cursor-pointer' />
          </span>
          <span className='flex items-center justify-center p-[6px] rounded-full hover:bg-gray-200'>
            <HiGif className='text-[22px] text-[#3050f9] cursor-pointer' />
          </span>
        </div>
        <div className='flex items-center gap-2 w-full bg-gray-100 cursor-pointer px-[0px] py-[0px] mx-2 rounded-full'>
          <input type="text" placeholder='Aa' className='w-full rounded-full px-3 bg-gray-100 focus:outline-none' />
          <BsFillEmojiSmileFill className='text-[35px] text-[#3050f9] cursor-pointer flex items-center justify-center p-[8px] rounded-full hover:bg-gray-200' />
        </div>
        <div className='flex items-center justify-center p-[6px] cursor-pointer rounded-full hover:bg-gray-200'>👋</div>
      </div>
    </div>
    </>
  )
}

export default FriendChat;