import React, { useState } from 'react'
import { TbMessageCircleFilled } from "react-icons/tb";
import { AiFillShop } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { BsFillArchiveFill } from "react-icons/bs";
import { CgList } from "react-icons/cg";
import Image from 'next/image';
import { IUser } from '@/libs/types';
import PersonalInfo from '../personalInfo/personalInfo';
import PendingFriendRequests from '../pendingFriendRequests/pendingFriendRequests';

type Props = {
  data: IUser
}
function Sidebar({ data }: Props) {
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
    <div className='md:flex md:flex-col md:relative md:items-start md:justify-start md:gap-5 md:p-4 md:w-[80px] ml-2 md:ml-0 w-0 h-0 md:h-screen'>
      <span className='absolute w-[12px] h-[12px] rounded-full border-2 md:top-[24px] bottom-[22px] z-20 left-[45px] md:right-[27px] md:border-white bg-blue-600' />
      <span className='hidden md:absolute md:w-[12px] md:h-[12px] md:rounded-full md:border-2 md:top-[112px] md:right-[27px] md:border-white md:bg-blue-600' />
      <div className='md:contents fixed bottom-0 left-0 w-full bg-gray-900 md:bg-transparent text-white flex z-10 items-center justify-between px-5'>
        <span>
        <TbMessageCircleFilled className='text-gray-600 w-[45px] h-[45px] cursor-pointer duration-200 hover:bg-gray-300 p-[10px] rounded-lg' />
        </span>
        <span>
        <AiFillShop className='text-gray-600 w-[45px] h-[45px] cursor-pointer duration-200 hover:bg-gray-300 p-[10px] rounded-lg' />
        </span>
        <span>
        <AiFillMessage className='text-gray-600 w-[45px] h-[45px] cursor-pointer duration-200 hover:bg-gray-300 p-[10px] rounded-lg' 
        onClick={() => setIsActive(true)}
        />
        </span>
        <span className='relative'>
          <span className='absolute right-[6px] top-[10px] w-[12px] h-[12px] rounded-full border-2 border-white bg-blue-600' />
          <BsFillArchiveFill className='text-gray-600 w-[45px] h-[45px] cursor-pointer duration-200 hover:bg-gray-300 p-[12px] rounded-lg' />
        </span>
        <span className='p-[9px] md:hidden'>
        <img src={data?.avatar?.url || "/side2.png"} alt="Hero Image" width={100} height={100} onClick={handleOpen} className="md:hidden w-[32px] h-[32px]  cursor-pointer rounded-full" />
        </span>
      </div>
      <div className='md:w-[35px] md:mx-auto md:h-[1px] md:bg-gray-300'></div>
      <div className='hidden md:w-full md:relative md:flex md:flex-col md:items-center md:justify-center md:gap-4'>
        <Image src="/side1.png" alt="Hero Image" width={100} height={100} className="w-[30px] h-[30px] cursor-pointer rounded-lg border border-gray-300" />
        <Image src="/side2.png" alt="Hero Image" width={100} height={100} className="w-[30px] h-[30px] cursor-pointer rounded-lg border border-gray-300" />
        <Image src="/side3.png" alt="Hero Image" width={100} height={100} className="w-[30px] h-[30px] cursor-pointer rounded-lg border border-gray-300" />
        <Image src="/side4.png" alt="Hero Image" width={100} height={100} className="w-[30px] h-[30px] cursor-pointer rounded-lg border border-gray-300" />
        <span className='absolute w-[12px] h-[12px] rounded-full border-2 top-[85px] right-[5px] border-white bg-blue-600' />
      </div>
      <div className='hidden md:absolute md:bottom-0 md:left-0 md:w-[80px] md:flex md:flex-col md:items-center md:justify-center md:gap-2 md:p-3 md:bg-[#f5f5f5]'>
        <img src={data?.avatar?.url || "/side2.png"} alt="Hero Image" width={100} height={100} onClick={handleOpen} className="w-[35px] h-[35px] cursor-pointer rounded-full" />
        <span className='flex items-center justify-center text-gray-950 w-[35px] h-[35px] cursor-pointer duration-200 bg-gray-200 hover:bg-gray-300 p-[6px] rounded-full'>
          <CgList  size={30}/>
        </span>
        
      </div>
    </div>
    {/* Personal Info */}
    <PersonalInfo open={open} isClose={() => setOpen(false)} />

      {/* Pending Friend Requests  */}
      <PendingFriendRequests open={isActive} onOpenChange={setIsActive} />
    </>
  )
}

export default Sidebar;