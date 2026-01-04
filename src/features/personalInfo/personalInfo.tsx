import React, { useEffect } from 'react'
import { IoMdSettings } from "react-icons/io";
import { PiTextAaBold } from "react-icons/pi";
import { BsBanFill } from "react-icons/bs";
import { RiHomeGearFill } from "react-icons/ri";
import { FaUniversalAccess } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoIosHelpCircle } from "react-icons/io";
import { MdReportProblem } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { useAuth } from '@/hooks/auth/useAuth';

function PersonalInfo({ open, isClose}: any) {
    const { logout } = useAuth();

    // close if clicked outside
    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (event.target.classList.contains('fixed')) {
                isClose();
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isClose]);
    
  return (
    <>
    <div className={`${open ? 'flex' : 'hidden'} fixed top-2 left-3 z-50 bg-white text-gray-950 p-0.5 rounded-lg shadow-xl w-[350px] h-[85vh] scrollbar-component flex flex-col items-start`}>
        <div className='flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 w-full'>
            <span className='rounded-full bg-gray-100 p-[5px]'>
            <IoMdSettings className='text-lg' />
            </span>
            <h2 className='text-[15px] font-sans font-light'>Performances</h2>
        </div>
        <div className='h-[1px] w-[90%] mx-auto my-2 text-gray-300 z-50'><hr /></div>
        <div className='flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 w-full'>
            <span className='rounded-full bg-gray-100 p-[5px]'>
            <PiTextAaBold className='text-lg' />
            </span>
            <h2 className='text-[15px] font-sans font-light'>Edit username</h2>
        </div>
        <div className='h-[1px] w-[90%] mx-auto my-2 text-gray-300 z-50'><hr /></div>
        <div className='flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 w-full'>
            <span className='rounded-full bg-gray-100 p-[5px]'>
            <BsBanFill className='text-lg' />
            </span>
            <h2 className='text-[15px] font-sans font-light'>Restricted accounts</h2>
        </div>
        <div className='h-[1px] w-[90%] mx-auto my-2 text-gray-300 z-50'><hr /></div>
        <div className='flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 w-full'>
            <span className='rounded-full bg-gray-100 p-[5px]'>
            <RiHomeGearFill className='text-lg' />
            </span>
            <h2 className='text-[15px] font-sans font-light'>Privacy and safety</h2>
        </div>
        <div className='flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 w-full'>
            <span className='rounded-full bg-gray-100 p-[5px]'>
            <FaUniversalAccess className='text-lg' />
            </span>
            <h2 className='text-[15px] font-sans font-light'>Accessibility</h2>
        </div>
        <div className='h-[1px] w-[90%] mx-auto my-2 text-gray-300 z-50'><hr /></div>
        <div className='flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 w-full'>
            <span className='rounded-full bg-gray-100 p-[5px]'>
            <BsFillPeopleFill className='text-lg' />
            </span>
            <h2 className='text-[15px] font-sans font-light'>Family Center</h2>
        </div>
        <div className='h-[1px] w-[90%] mx-auto my-2 text-gray-300 z-50'><hr /></div>
        <div className='flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 w-full'>
            <span className='rounded-full bg-gray-100 p-[5px]'>
            <IoIosHelpCircle className='text-lg' />
            </span>
            <h2 className='text-[15px] font-sans font-light'>Help</h2>
        </div>
        <div className='flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 w-full'>
            <span className='rounded-full bg-gray-100 p-[5px]'>
            <MdReportProblem className='text-lg' />
            </span>
            <h2 className='text-[15px] font-sans font-light'>Report a problem</h2>
        </div>
        <div className='h-[1px] w-[90%] mx-auto my-2 text-gray-300 z-50'><hr /></div>
        <div className='flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 w-full'>
            <span className='rounded-full bg-gray-100 p-[5px]'>
            <HiOutlineMenuAlt2 className='text-lg' />
            </span>
            <h2 className='text-[15px] font-sans font-light'>Terms</h2>
        </div>
        <div className='flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 w-full'>
            <span className='rounded-full bg-gray-100 p-[5px]'>
            <HiOutlineMenuAlt2 className='text-lg' />
            </span>
            <h2 className='text-[15px] font-sans font-light'>Privacy Policy</h2>
        </div>
        <div className='flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 w-full'>
            <span className='rounded-full bg-gray-100 p-[5px]'>
            <IoMdSettings className='text-lg' />
            </span>
            <h2 className='text-[15px] font-sans font-light'>Cookie settings</h2>
        </div>
        <div className='h-[1px] w-[90%] mx-auto my-2 text-gray-300 z-50'><hr /></div>
        <div className='flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-50 w-full'
            onClick={() => logout()}
        >
            <span className='rounded-full bg-gray-100 p-[5px]'>
            <TbLogout className='text-lg' />
            </span>
            <h2 className='text-[15px] font-sans font-light'>Log out</h2>
        </div>
    </div>
    </>
  )
}

export default PersonalInfo