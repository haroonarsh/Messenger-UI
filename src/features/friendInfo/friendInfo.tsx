'use client';

import Image from 'next/image';
import React, { useState } from 'react'
import { MdPersonAdd } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { BiLink } from "react-icons/bi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoImages } from "react-icons/io5";
import { FaFileLines } from "react-icons/fa6";
import { MdNotificationsOff } from "react-icons/md";
import { MdReportProblem } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

function FriendInfo() {
  const [info, setInfo] = useState(false);
  const [members, setMembers] = useState(false);
  const [media, setMedia] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  // toggles
  const handleInfo = () => {
    setInfo(!info);
  }
  const handleMembers = () => {
    setMembers(!members);
  }
  const handleMedia = () => {
    setMedia(!media);
  }
  const handlePrivacy = () => {
    setPrivacy(!privacy);
  }
  return (
    <>
    <div className='hidden lg:flex flex-col gap-3 bg-[#ffffff] min-w-[23vw] mr-4 shadow-lg h-full my-4 rounded-xl text-[#595959] font-sans px-2 py-4 scrollbar-component'>
      <div className='w-full flex flex-col items-center justify-center gap-2'>
        <Image src="/side2.png" alt="Profile Image" width={100} height={100} className="w-[76px] h-[76px] cursor-pointer rounded-full border border-gray-300" />
        <h2 className='text-gray-950 text-[17px] font-medium'>Haroon Arshad</h2>
        <p className='text-gray-500 text-[13px]'>I'm a FullStack Web Developer</p>
        <div className='flex items-center gap-8 py-3'>
          <span className='flex flex-col items-center gap-1'>
          <span className='text-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <MdPersonAdd className='text-2xl text-gray-950 cursor-pointer' />
          </span>
          <p className='text-[13px] text-gray-950'>Invite</p>
          </span>
          <span className='flex flex-col items-center gap-1'>
          <span className='text-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <MdNotifications className='text-2xl text-gray-950 cursor-pointer' />
          </span>
          <p className='text-[13px] text-gray-950'>Mute</p>
          </span>
          <span className='flex flex-col items-center gap-1'>
          <span className='text-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <IoSearch className='text-2xl text-gray-950 cursor-pointer' />
          </span>
          <p className='text-[13px] text-gray-950'>Search</p>
          </span>
        </div>
      </div>
      <div className='flex flex-col py-4'>
        {/* chat info */}
        <div className='flex items-center justify-between py-3 px-2 hover:bg-gray-100 cursor-pointer rounded-md'
          onClick={handleInfo}>
          <h1 className='text-gray-950 text-[15px] font-medium'>Chat info</h1>
          <FaChevronRight className={`text-sm text-gray-950 cursor-pointer ${info ? 'rotate-90' : ''}`} />
        </div>
        <div className={`${info ? 'block' : 'hidden'}`}>
        <div className='flex items-center gap-2 py-2 px-2 hover:bg-gray-100 cursor-pointer rounded-md'>
          <span className='text-2xl bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <IoIosPeople className='text-lg text-gray-950 cursor-pointer' />
          </span>
          <p className='text-[15px] text-gray-950'>Go to NodeJs Developers</p>
        </div>
        <div className='flex items-center gap-2 py-2 px-2 hover:bg-gray-100 cursor-pointer rounded-md'>
          <span className='text-2xl bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <BiSolidMessageRoundedDetail className='text-lg text-gray-950 cursor-pointer' />
          </span>
          <p className='text-[15px] text-gray-950'>Sidechats (8)</p>
        </div>
        <div className='flex items-center gap-2 py-2 px-2 hover:bg-gray-100 cursor-pointer rounded-md'>
          <span className='text-2xl bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <BiLink className='text-lg text-gray-950 cursor-pointer' />
          </span>
          <p className='text-[15px] text-gray-950'>Copy link</p>
        </div>
        </div>
        {/* chat members */}
        <div className='flex items-center justify-between py-3 px-2 hover:bg-gray-100 cursor-pointer rounded-md'
          onClick={handleMembers}
        >
          <h1 className='text-gray-950 text-[15px] font-medium'>Chat members (1.9k)</h1>
          <FaChevronRight className={`text-sm text-gray-950 cursor-pointer ${members ? 'rotate-90' : ''}`} />
        </div>
        <div className={`${members ? 'block' : 'hidden'}`}>
        <div className='flex items-center justify-between py-2 px-2 hover:bg-gray-100 cursor-pointer rounded-md'>
          <span className='flex items-center gap-2'>
            <Image src="/side3.png" alt="Profile Image" width={100} height={100} className="w-[36px] h-[36px] cursor-pointer rounded-full border border-gray-300" />
            <p className='text-[15px] text-gray-950'>Aaron Trazona</p>
          </span>
          <span className='mr-2 hover:bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <HiOutlineDotsHorizontal className='text-[22px] text-gray-950 cursor-pointer' />
          </span>
        </div>
        <div className='flex items-center justify-between py-2 px-2 hover:bg-gray-100 cursor-pointer rounded-md'>
          <span className='flex items-center gap-2'>
            <Image src="/side4.png" alt="Profile Image" width={100} height={100} className="w-[36px] h-[36px] cursor-pointer rounded-full border border-gray-300" />
            <p className='text-[15px] text-gray-950'>Trazona rock</p>
          </span>
          <span className='mr-2 hover:bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <HiOutlineDotsHorizontal className='text-[22px] text-gray-950 cursor-pointer' />
          </span>
        </div>
        </div>
        {/* media */}
        <div className='flex items-center justify-between py-3 px-2 hover:bg-gray-100 cursor-pointer rounded-md'
          onClick={handleMedia}
        >
          <h1 className='text-gray-950 text-[15px] font-medium'>Media, files and links</h1>
          <FaChevronRight className={`text-sm text-gray-950 cursor-pointer ${media ? 'rotate-90' : ''}`} />
        </div>
        <div className={`${media ? 'block' : 'hidden'}`}>
        <div className='flex items-center gap-2 py-2 px-2 hover:bg-gray-100 cursor-pointer rounded-md'>
          <span className='text-2xl bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <IoImages className='text-lg text-gray-950 cursor-pointer' />
          </span>
          <p className='text-[15px] text-gray-950'>Media</p>
        </div>
        <div className='flex items-center gap-2 py-2 px-2 hover:bg-gray-100 cursor-pointer rounded-md'>
          <span className='text-2xl bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <FaFileLines className='text-lg text-gray-950 cursor-pointer' />
          </span>
          <p className='text-[15px] text-gray-950'>Files</p>
        </div>
        <div className='flex items-center gap-2 py-2 px-2 hover:bg-gray-100 cursor-pointer rounded-md'>
          <span className='text-2xl bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <BiLink className='text-lg text-gray-950 cursor-pointer' />
          </span>
          <p className='text-[15px] text-gray-950'>Links</p>
        </div>
        </div>
        {/* privacy */}
        <div className='flex items-center justify-between py-3 px-2 hover:bg-gray-100 cursor-pointer rounded-md'
          onClick={handlePrivacy}
        >
          <h1 className='text-gray-950 text-[15px] font-medium'>Privacy & support</h1>
          <FaChevronRight className={`text-sm text-gray-950 cursor-pointer ${privacy ? 'rotate-90' : ''}`} />
        </div>
        <div className={`${privacy ? 'block' : 'hidden'}`}>
        <div className='flex items-center gap-2 py-2 px-2 hover:bg-gray-100 cursor-pointer rounded-md'>
          <span className='text-2xl bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <MdNotificationsOff className='text-lg text-gray-950 cursor-pointer' />
          </span>
          <p className='text-[15px] text-gray-950'>Chat notifications</p>
        </div>
        <div className='flex items-center gap-2 py-2 px-2 hover:bg-gray-100 cursor-pointer rounded-md'>
          <span className='text-2xl bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <MdReportProblem className='text-lg text-gray-950 cursor-pointer' />
          </span>
          <p className='text-[15px] text-gray-950'>Report</p>
        </div>
        <div className='flex items-center gap-2 py-2 px-2 hover:bg-gray-100 cursor-pointer rounded-md'>
          <span className='text-2xl bg-gray-200 cursor-pointer p-[6px] rounded-full'>
            <TbLogout className='text-lg text-gray-950 cursor-pointer' />
          </span>
          <p className='text-[15px] text-gray-950'>Leave chat</p>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default FriendInfo;