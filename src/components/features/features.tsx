import Image from 'next/image'
import React from 'react'

function Features() {
  return (
    <>
    <div className="max-h-screen mb-[3rem] md:mb-[12rem] max-w-7xl mx-auto px-4 md:px-10 pb-10 md:pb-0 bg-white">
        <div className="flex w-[100%] flex-col md:flex-row items-center justify-between gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[65%]">
            <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-[4.8rem] font-sans font-bold text-blue-600 leading-tight">
                Useful.
                <br />
                Social.
                <br />
                Expressive. 
            </h1>

            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Stay in touch with your friends and family, explore your interests, build your community, and express yourself beyond words – all in one app.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
    <span id='useful'></span>
    <div className="min-h-screen w-[100%] bg-[#f4f9fe] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row items-center justify-between gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>CHATTING AND CALLING</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Reach anyone, anywhere 
            </h1>

            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Find and connect with your friends and family on Facebook and Messenger, no phone number needed.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature1.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>

          {/* =================== */}
    <div className="min-h-screen w-[100%] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row-reverse items-center justify-between lg:gap-16 md:gap-6 gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>META AI</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Get instant <br /> answers 
            </h1>

            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Use an intelligent assistant to answer questions, give you how-to advice, help with homework and more.
            </p>
            <p className='text-[14px] font-sans text-gray-600'>
              *Meta AI is available in selected languages and countries only, with more coming soon
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature2.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
    <div className="min-h-screen w-[100%] bg-[#f4f9fe] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row items-center justify-between gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>HD MEDIA</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Share photos in high-def 
            </h1>

            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Send and receive clearer, crisper pictures of your favourite moments with Messenger.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature3.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
    <div className="min-h-screen w-[100%] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row-reverse items-center justify-between lg:gap-16 md:gap-6 gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>SHARED ALBUMS</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Relive the <br /> good times 
            </h1>

            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Create photo and video albums in group chats to reminisce over life events, themes and more.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature4.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
    <div className="min-h-screen w-[100%] bg-[#f4f9fe] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row items-center justify-between gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>QR CODES</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Easily add new connections
            </h1>

            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Connect with people that you meet in real life by scanning their Messenger QR code or sharing yours.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature5.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
    <div className="min-h-screen w-[100%] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row-reverse items-center justify-between lg:gap-16 md:gap-6 gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>FILE SHARING</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Share large files 
            </h1>
            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Who needs email? Whether it's a Word, PDF or Excel doc, you can send files up to 100 MB in Messenger.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature6.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
    <div className="min-h-screen w-[100%] bg-[#f4f9fe] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row items-center justify-between gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>EDIT AND UNSEND</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Ctrl-Z for<br />your chats
            </h1>

            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              You can edit a message up to 15 minutes after sending, or unsend a message at any time.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature7.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
    <div className="min-h-screen w-[100%] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row-reverse items-center justify-between lg:gap-16 md:gap-6 gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>DISAPPEARING MESSAGES</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Keep your <br /> secrets secret 
            </h1>
            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Choose how long your messages stick around for with messages that disappear after they've been sent.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature8.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
    <div className="min-h-screen w-[100%] bg-[#f4f9fe] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row items-center justify-between gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>HD VIDEO CALLS</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Make HD <br />video calls
            </h1>

            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Enjoy clearer, higher-quality video calls on Messenger.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature9.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
    <div className="min-h-screen w-[100%] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row-reverse items-center justify-between lg:gap-16 md:gap-6 gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>VOICE MESSAGES</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Send audio <br /> and video <br /> messages 
            </h1>
            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Leave an audio or video message when calls go unanswered.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature10.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
    <div className="min-h-screen w-[100%] bg-[#f4f9fe] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row items-center justify-between gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>NOISE SUPPRESSION</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Reduce <br />background <br />noise
            </h1>

            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Clearly hear calls even when taking them from a busy place.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature11.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
    <div className="min-h-screen w-[100%] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row-reverse items-center justify-between lg:gap-16 md:gap-6 gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>SIRI INTEGRATION</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Connect <br /> hands-free 
            </h1>
            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Use Siri prompts to make calls or send messages without lifting a finger.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature12.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
    <span id='social'></span>
    <div className="min-h-screen w-[100%] bg-[#f4f9fe] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row items-center justify-between gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>CHANNELS</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Get insider access
            </h1>

            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Stay in the know with creators by joining their channels for authentic and casual content.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature13.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
         {/* =================== */}
    <div className="min-h-screen w-[100%] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row-reverse items-center justify-between lg:gap-16 md:gap-6 gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>MESSENGER COMMUNITIES</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Connect <br /> with your <br /> communities 
            </h1>
            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Come together to meaningfully connect with people in your school, neighbourhood or interest groups.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature14.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
          {/* =================== */}
    <span id='expressive'></span>
    <div className="min-h-screen w-[100%] bg-[#f4f9fe] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row items-center justify-between gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>META AI</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Unleash <br />your <br />imagination
            </h1>

            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Tap into Meta AI as your go-to creative partner to create, edit, animate images and more.
            </p>
            <p className='text-[14px] font-sans text-gray-600'>
              *Meta AI is available in selected languages and countries only,<br />with more coming soon 
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature15.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
        {/* =================== */}
    <div className="min-h-screen w-[100%] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row-reverse items-center justify-between lg:gap-16 md:gap-6 gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>STORIES</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Capture <br /> everyday <br /> moments 
            </h1>
            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Highlight moments of your day using photos and videos that disappear after 24 hours.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature16.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
         {/* =================== */}
    <div className="min-h-screen w-[100%] bg-[#f4f9fe] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row items-center justify-between gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>NOTES</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Share a note
            </h1>

            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Stay connected with your friends by sharing quick updates that disappear after 24 hours.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature17.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
      {/* =================== */}
    <div className="min-h-screen w-[100%] py-16">
        <div className="flex flex-col-reverse max-w-7xl mx-auto px-4 md:px-9 md:flex-row-reverse items-center justify-between lg:gap-16 md:gap-6 gap-3 ">
          {/* Left Content */}
          <div className="space-y-6 text-start md:text-left w-full lg:w-[80%]">
            <p className='text-[14px] font-semibold font-sans text-gray-600'>CHAT THEMES</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-gray-950 leading-tight">
              Set the mood <br /> for your chats
            </h1>
            <p className="text-md md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
              Customise your chats with an evolving selection of themes featuring popular artists, holidays and more.
            </p>
          </div>
          {/* Right Content */}
          <div className="flex items-center justify-center">
            <Image src="/feature18.png" alt="Hero Image" width={1000} height={1000} className="max-w-full h-auto" />
          </div>
        </div>
    </div>
    </>
  )
}

export default Features