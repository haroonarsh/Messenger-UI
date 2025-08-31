'use client';

import React from 'react'
import { MdFacebook } from "react-icons/md";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { FaChevronRight } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from 'next/navigation';


function ForgottenPassword({isOpen, onClose}: any) {

    const router = useRouter();

    // when user click outside the modal, close it
    React.useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (event.target.classList.contains('fixed')) {
                onClose();
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [onClose]);

  return (
    <div className={`fixed inset-0 bg-[#ffffffc3] flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className='relative bg-white py-4 px-4 rounded-lg text-gray-800 shadow-xl w-11/12 max-w-[34rem]'>
        <span className='absolute flex items-center justify-center top-3 right-3 p-2 border border-gray-300 rounded-full hover:bg-gray-100'
          onClick={onClose}
        >
            <RxCross2 size={17} className='cursor-pointer' />
        </span>
        <h2 className='text-lg font-semibold font-sans mb-4 text-center'>Forgotten your password?</h2>
        <div className='flex flex-col'>
          <div className='flex items-center justify-between gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-50'
            onClick={() => router.push('/signup')}
          >
            <span className='p-2 bg-gray-100 text-gray-950 rounded-full'>
            <MdFacebook size={20} className='' />
            </span>
            <span>
                <h3 className='text-md font-sans'>Go to Facebook.com</h3>
                <p className='text-sm text-gray-500 font-sans'>If this is your first time logging in, you can create a new account.</p>
            </span>
            <FaChevronRight size={24} className='text-gray-300' />
          </div>
          <div className='flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-50'>
            <span className='p-2 bg-gray-100 text-gray-950 rounded-full'>
            <HiMiniDevicePhoneMobile size={20} className='' />
            </span>
            <span>
                <h3 className='text-md font-sans'>Open the Messenger app on a mobile device</h3>
                <p className='text-sm text-gray-500 font-sans'>Use the Messenger app on a mobile device to log in. Or use the web version. <span className='text-blue-600 font-bold cursor-pointer border-b border-transparent hover:border-blue-600'>Learn more</span></p>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgottenPassword