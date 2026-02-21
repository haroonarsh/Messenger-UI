'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ForgottenPassword from '../modals/forgottenPassword-modal'
import { useAuth } from '@/hooks/auth/useAuth';
import Cookies from "js-cookie";

function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);
  const { login } = useAuth();
  const [payload, setPayload] = useState({
    emailOrUsername: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(payload)
  }

  useEffect(() => {
    const token = Cookies.get("jwt");
    console.log('Token in HeroSection:', token);
  }, []);

  return (
    <>
    <div className="min-h-screen mb-[3rem] max-w-7xl mx-auto px-4 md:px-10 bg-white">
            <div className="flex w-[100%] flex-col md:flex-row items-center justify-between gap-3 ">
              {/* Left Content */}
              <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[4.8rem] font-sans font-bold text-blue-600 leading-tight">
                  A place for meaningful conversations
                </h1>
    
                <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Messenger helps you connect with your Facebook friends and family, build your community and deepen your interests.
                </p>
                <div className="flex flex-col items-start space-y-4">
                <input type="email" name='emailOrUsername' onChange={handleChange} placeholder='Email address or Username'
                    className=" rounded-lg p-2 pl-3 w-full md:w-80 mb-4 text-black text-sm placeholder:text-gray-500 bg-[#f5f5f5]"
                />
                <input type="password" name='password' onChange={handleChange} placeholder='Password'
                    className="rounded-lg p-2 pl-3 w-full md:w-80 mb-4 text-black text-sm placeholder:text-gray-500 bg-[#f5f5f5]"
                />
                </div>
                <div className='flex items-baseline justify-between w-full md:w-80 space-x-2'>
                    <button type="submit" onClick={handleLogin} className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-200 text-xl font-medium font-sans cursor-pointer">
                        Log In
                    </button>
                    <a href="#" className="text-blue-600 text-md font-medium font-sans transition duration-200 border-b-[2px] border-transparent hover:border-blue-600" onClick={() => setIsOpen(true)}>Forgotten your password?</a>
                </div>
                <div>
                    <input id="remember" type="checkbox" className="mr-2 w-4 h-4" />
                    <label htmlFor="remember"  className="text-gray-600 text-[13.5px] font-sans">Keep me signed in</label>
                </div>
                <div className='flex items-center justify-between w-75'>
                    <Image src="/apple.svg" alt="Apple Logo" width={133} height={50} className='cursor-pointer' />
                    <Image src="/microsoft.png" alt="Microsoft Logo" width={150} height={50} className='cursor-pointer' />
                </div>
              </div>
              {/* Right Content */}
              <div className="flex items-center justify-center">
                <Image src="/hero-image.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
              </div>
            </div>
        </div>
        <ForgottenPassword isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
  )
}

export default HeroSection