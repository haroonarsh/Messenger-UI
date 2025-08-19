import Image from 'next/image';
import React from 'react';
import { FaArrowRight } from "react-icons/fa6";

function Developers() {
  return (
    <>
    <div className="min-h-screen w-[100%] bg-[#f6f6f6] md:pt-16 py-16 md:py-0">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row items-center justify-between gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[19px] font-medium font-sans text-gray-600'>Build for Messenger</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-normal text-gray-950 leading-tight">
              Messenger for Business
            </h1>

            <p className="text-md md:text-lg text-gray-600 leading-relaxed max-w-lg">
              Build lasting customer relationships through conversation. Messenger allows you to connect with billions of people in a channel they prefer[1] — making business personal and convenient.
            </p>
            <div className='flex items-center gap-2 text-gray-950 hover:text-gray-600 cursor-pointer'>
                <FaArrowRight className='text-[37px] border border-gray-950 rounded-full p-2'/> <span className='font-medium font-sans'>Explore Messenger Solutions and Feaures</span>
            </div>
            <div className='flex items-center gap-2 text-gray-950 hover:text-gray-600 cursor-pointer'>
                <FaArrowRight className='text-[37px] border border-gray-950 rounded-full p-2'/> <span className='font-medium font-sans'>Learn hoe Messenger can Help your Business</span>
            </div>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/developer1.png" alt="Hero Image" width={1200} height={1200} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
        <div className="min-h-screen w-[100%] py-16">
            <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row items-center justify-between gap-3 ">
              {/* Left Content */}
              <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
                <Image src="/developer5.png" alt="Hero Image" width={130} height={130} className="max-w-full h-auto" />
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-sans font-medium text-gray-900 leading-tight">
                    Instagram Messaging 
                </h1>
    
                <p className="text-md md:text-lg lg:text-[16px] text-gray-500 font-medium font-sans leading-relaxed max-w-lg">
                  Businesses can now connect Instagram messages with existing tools and data to drive business outcomes
                </p>
                <div className='flex items-center gap-2 text-gray-950 hover:text-gray-600 cursor-pointer'>
                <FaArrowRight className='text-[37px] border border-gray-950 rounded-full p-2'/> <span className='font-medium font-sans'>Explore Instagram Messaging Solutions</span>
                </div>
              </div>
              {/* Right Content */}
              <div className="flex items-center justify-center">
                <Image src="/developer2.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
              </div>
            </div>
        </div>
              {/* =================== */}
    <div className="min-h-screen w-[100%] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row-reverse items-center justify-between lg:gap-16 md:gap-6 gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-sans font-medium text-gray-900 leading-tight">
                    Lead Generation 
                </h1>
    
                <p className="text-md md:text-lg lg:text-[16px] text-gray-500 font-medium font-sans leading-relaxed max-w-lg">
                  Businesses can generate, qualify, and follow up with leads at scale through automated or live chat experiences.
                </p>
                <div className='flex items-center gap-2 text-gray-950 hover:text-gray-600 cursor-pointer'>
                <FaArrowRight className='text-[37px] border border-gray-950 rounded-full p-2'/> <span className='font-medium font-sans'>Explore Lead Generation Solutions</span>
                </div>
              </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/developer3.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
      {/* =================== */}
        <div className="max-h-screen w-[100%] py-16">
            <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row items-center justify-between gap-3 ">
              {/* Left Content */}
              <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-sans font-medium text-gray-900 leading-tight">
                    Commerce 
                </h1>
    
                <p className="text-md md:text-lg lg:text-[16px] text-gray-500 font-medium font-sans leading-relaxed max-w-lg">
                  Messenger helps businesses in retail, e-commerce, telcom, and more <span className='text-blue-600 border-b border-blue-600'>remove friction</span> along the path to purchase, giving people confidence to move from consideration to action. 
                </p>
                <div className='flex items-center gap-2 text-gray-950 hover:text-gray-600 cursor-pointer'>
                <FaArrowRight className='text-[37px] border border-gray-950 rounded-full p-2'/> <span className='font-medium font-sans'>Explore Commerce Solutions</span>
                </div>
              </div>
              {/* Right Content */}
              <div className="flex items-center justify-center">
                <Image src="/developer1.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
              </div>
            </div>
        </div>
                  {/* =================== */}
    <div className="min-h-screen w-[100%] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row-reverse items-center justify-between lg:gap-16 md:gap-6 gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-sans font-medium text-gray-900 leading-tight">
                    Customer Service
                </h1>
    
                <p className="text-md md:text-lg lg:text-[16px] text-gray-500 font-medium font-sans leading-relaxed max-w-lg">
                  Messenger allows customers to communicate with your business without waiting on hold or repeating support issues to multiple agents - the conversation stays in Messenger, an easily accessible channel for questions and re-engagement. 
                </p>
                <div className='flex items-center gap-2 text-gray-950 hover:text-gray-600 cursor-pointer'>
                <FaArrowRight className='text-[37px] border border-gray-950 rounded-full p-2'/> <span className='font-medium font-sans'>Customer Service Solutions</span>
                </div>
              </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/developer4.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
         {/* =================== */}
        <div className="min-h-screen w-[100%] py-16">
            <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row items-center justify-between gap-3 ">
              {/* Left Content */}
              <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-sans font-medium text-gray-900 leading-tight">
                    Re-Engagement
                </h1>
    
                <p className="text-md md:text-lg lg:text-[16px] text-gray-500 font-medium font-sans leading-relaxed max-w-lg">
                  Messenger enables businesses to proactively send notifications to customers that increase engagement and drive faster results.
                </p>
                <div className='flex items-center gap-2 text-gray-950 hover:text-gray-600 cursor-pointer'>
                <FaArrowRight className='text-[37px] border border-gray-950 rounded-full p-2'/> <span className='font-medium font-sans'>Explore Recurring Notifications</span>
                </div>
              </div>
              {/* Right Content */}
              <div className="flex items-center justify-center">
                <Image src="/developer6.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
              </div>
            </div>
        </div>
         {/* =================== */}
        <div className="max-h-screen w-[100%] pt-16 bg-[#f7f7f7]">
            <div className="flex flex-col max-w-7xl mx-auto px-4 md:px-9 items-center justify-between gap-3 ">
              {/* Left Content */}
              <div className="flex flex-col text-center w-full gap-6 lg:w-[80%] mb-5">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-sans font-medium text-gray-900 leading-tight">
                    Messenger Solutions
                </h1>
    
                <p className="text-md md:text-lg lg:text-[16px] text-gray-500 font-medium font-sans max-w-xl m-auto">
                  These are the building blocks of your Messenger experience. Whether you’re looking to generate leads, drive sales, or provide customer service, we have the solutions you need.
                </p>
                <div className='flex items-center justify-center gap-2 text-gray-950 hover:text-gray-600 cursor-pointer'>
                <FaArrowRight className='text-[37px] border border-gray-950 rounded-full p-2'/> <span className='font-medium font-sans'>Explore Solutions</span>
                </div>
              </div>
              {/* Right Content */}
              <div className="flex items-center justify-center">
                <Image src="/developer7.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
              </div>
            </div>
        </div>
        {/* =================== */}
        <div className='w-full flex md:flex-row flex-col items-center justify-between'>
            <div className='bg-[#333537] w-full md:w-[50%] h-[400px] px-4 md:px-8 lg:px-24 xl:px-39 flex flex-col items-start justify-center gap-2'>
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-sans font-medium text-gray-100 leading-tight">
                    Find a Developer Partner
                </h1>
                <p className='text-gray-100 font-medium font-sans'>Our Partner Directory will help you find a developer partner with experience building Messenger solutions.</p>
                <div className='flex items-center justify-start gap-2 text-gray-100 hover:text-gray-300 cursor-pointer'>
                <FaArrowRight className='text-[37px] border border-gray-100 rounded-full p-2'/> <span className='font-medium font-sans'>Partner Directory</span>
                </div>
            </div>
            <div className='bg-[#252626] w-full md:w-[50%] h-[400px] px-4 md:px-8 lg:px-24 xl:px-39 flex flex-col items-start justify-center gap-2'>
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-sans font-medium text-gray-100 leading-tight">
                    Start Building
                </h1>
                <p className='text-gray-100 font-medium font-sans'>Our developer documentation contains information you need to get started with Messenger.</p>
                <div className='flex items-center justify-start gap-2 text-gray-100 hover:text-gray-300 cursor-pointer'>
                <FaArrowRight className='text-[37px] border border-gray-100 rounded-full p-2'/> <span className='font-medium font-sans'>Developer Documentation</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Developers;