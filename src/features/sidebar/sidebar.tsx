import React, { useState } from 'react'
import { TbMessageCircleFilled } from "react-icons/tb";
import { AiFillShop } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { BsFillArchiveFill } from "react-icons/bs";
import { CgList } from "react-icons/cg";
import Image from 'next/image';
import { IUser } from '@/libs/types';
import PersonalInfo from '../personalInfo/personalInfo';

type Props = {
  data: IUser
}
function Sidebar({ data }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
    <div className='flex flex-col relative items-start justify-start gap-5 p-4 w-[80px] h-screen'>
      <span className='absolute w-[12px] h-[12px] rounded-full border-2 top-[24px] right-[27px] border-white bg-blue-600' />
      <span className='absolute w-[12px] h-[12px] rounded-full border-2 top-[112px] right-[27px] border-white bg-blue-600' />
      <div>
        <TbMessageCircleFilled className='text-gray-600 w-[45px] h-[45px] cursor-pointer duration-200 hover:bg-gray-300 p-[10px] rounded-lg' />
        <AiFillShop className='text-gray-600 w-[45px] h-[45px] cursor-pointer duration-200 hover:bg-gray-300 p-[10px] rounded-lg' />
        <AiFillMessage className='text-gray-600 w-[45px] h-[45px] cursor-pointer duration-200 hover:bg-gray-300 p-[10px] rounded-lg' />
        <BsFillArchiveFill className='text-gray-600 w-[45px] h-[45px] cursor-pointer duration-200 hover:bg-gray-300 p-[12px] rounded-lg' />
      </div>
      <div className='w-[35px] mx-auto h-[1px] bg-gray-300'></div>
      <div className='w-full relative flex flex-col items-center justify-center gap-4'>
        <Image src="/side1.png" alt="Hero Image" width={100} height={100} className="w-[30px] h-[30px] cursor-pointer rounded-lg border border-gray-300" />
        <Image src="/side2.png" alt="Hero Image" width={100} height={100} className="w-[30px] h-[30px] cursor-pointer rounded-lg border border-gray-300" />
        <Image src="/side3.png" alt="Hero Image" width={100} height={100} className="w-[30px] h-[30px] cursor-pointer rounded-lg border border-gray-300" />
        <Image src="/side4.png" alt="Hero Image" width={100} height={100} className="w-[30px] h-[30px] cursor-pointer rounded-lg border border-gray-300" />
        <span className='absolute w-[12px] h-[12px] rounded-full border-2 top-[85px] right-[5px] border-white bg-blue-600' />
      </div>
      <div className='absolute bottom-0 left-0 w-[80px] flex flex-col items-center justify-center gap-2 p-3 bg-[#f5f5f5]'>
        <img src={data?.avatar?.url || "/side2.png"} alt="Hero Image" width={100} height={100} onClick={handleOpen} className="w-[35px] h-[35px] cursor-pointer rounded-full" />
        <span className='flex items-center justify-center text-gray-950 w-[35px] h-[35px] cursor-pointer duration-200 bg-gray-200 hover:bg-gray-300 p-[6px] rounded-full'>
          <CgList  size={30}/>
        </span>
        
      </div>
    </div>
    {/* Personal Info */}
    <PersonalInfo open={open} isClose={() => setOpen(false)} />
    </>
  )
}

export default Sidebar;