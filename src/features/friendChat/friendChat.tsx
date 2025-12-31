import React, { useEffect, useRef, useState } from 'react'
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
import { useSocket } from '@/hooks/socket/useSocket';
import { useAuth } from '@/hooks/auth/useAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '@/libs/api';
import api from '@/utils/api';

interface Message {
  _id: string;
  sender: {
    _id: string;
    username: string;
    avatar?: {
      url: string;
    };
  };
  text: string;
  type: string;
  mediaUrl?: string;
  timestamp?: string;
  createdAt: string;
}

function FriendChat({ conversationId }: { conversationId: string }) {
  const { socket, joinConversation, leaveConversaton, sendMessage } = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  console.log('conversation Id:', conversationId);
  console.log('Current user Id:', user?.id);
  
  // auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`${API_BASE_URL}/chat/messages/${conversationId}`);
        console.log('data:', res);
        
        setMessages(res.data); // Reverse to show oldest first
        scrollToBottom();
      } catch (error) {
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    if (conversationId) {
      fetchMessages();
      joinConversation(conversationId);
    }

    return () => {
      leaveConversaton(conversationId);
    };
  }, [conversationId]);

  // Real-time incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.on("new-message", (newMessage: Message) => {
      setMessages(prev => [...prev, newMessage]);
      scrollToBottom();
    });

    return () => {
      socket.off("new-message");
    };
  }, [socket]);

  const handleSend = () => {
    if (!input.trim() || !conversationId) return;

    sendMessage({ conversationId, text: input.trim() });
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  if (loading) return <div className="p-8 text-center">Loading chat...</div>;

  return (
    <>
    <div className='flex flex-col gap-3 relative bg-[#ffffff] w-full mx-4 shadow-lg h-[97%] my-4 rounded-xl text-[#595959] font-sans'>
      {/* header */}
      <div className='absolute top-0 left-0 w-full px-2 py-1 rounded-t-xl flex items-center justify-between border-b border-gray-300 bg-white shadow-xs'>
        {messages.length > 0 && (
          <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-[5px] py-[2px] rounded-md'>
          <img src={messages[0].sender.avatar?.url} alt="Profile Image" width={100} height={100} className="w-[36px] h-[36px] cursor-pointer rounded-full border border-gray-300" />
          <span className='flex flex-col'>
            <h2 className='text-gray-950 text-md'>{messages[0].sender.username}</h2>
            <p className='text-gray-500 text-[13px]'>@{messages[0].sender.username}</p>
          </span>
        </div>
        )}
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
        {messages.map((msg) => (
          <div key={msg._id} className={`group flex items-center gap-2 ${msg.sender._id === user?.id ? 'self-end flex-row-reverse' : ''}`}>
          <img src={msg.sender.avatar?.url || '/side2.png'} alt="Profile Image" width={100} height={100} className="w-[36px] h-[36px] rounded-full" />
          <div className={`${msg.sender._id === user?.id ? 'bg-[#3050f9] text-gray-50' : 'bg-gray-200 text-gray-950'} px-3 py-1 rounded-full`}>
            {msg.type === 'image' && msg.mediaUrl ? (
              <img src={msg.mediaUrl || '/side2.png'} alt="Media" width={200} height={200} className="rounded-md" />
            ) : (
              <p>{msg.text}</p>
            )}
            <p className={`text-[12px] ${msg.sender._id === user?.id ? 'text-end' : ''}`}>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          {/* <p className='bg-gray-200 px-3 py-1 rounded-full text-gray-950'>Hello</p> */}
          <span className='hidden group-hover:flex items-center justify-center'>
            <MdEmojiEmotions className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
            <BiSolidShare className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
            <BiSolidMessageRoundedDetail className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
            <BiDotsVerticalRounded className='text-[27px] text-gray-500 p-[4px] rounded-full hover:bg-gray-200 cursor-pointer' />
          </span>
        </div>
        ))}
        {isTyping && <p className="text-gray-500 text-sm">{isTyping}</p>}
        <div ref={messagesEndRef} />
        {/* <div className='group flex items-start gap-2 self-end my-3'>
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
        </div> */}
      </div>
      {/* input */}
      <div className='absolute bottom-0 left-0 w-full px-2 py-3 flex items-center rounded-b-xl justify-between bg-white shadow-xs'>
        <div className='flex items-center gap-2'>
          <span className='flex items-center justify-center p-[6px] rounded-full hover:bg-gray-200'>
            <HiMiniPlusCircle className='text-[22px] text-[#3050f9] cursor-pointer' />
          </span>
          <span 
          // onClick={handleImageClick} 
          className='flex items-center justify-center p-[8px] rounded-full hover:bg-gray-200'>
            <BsImage className='text-[18px] text-[#3050f9] cursor-pointer' />
          </span>
          <label htmlFor="file" title='Upload Image'/>
          <input id="file" type="file" 
          // ref={fileInputRef} onChange={handleFileChange} 
          accept="image/*" className="hidden" />
          <span className='flex items-center justify-center p-[6px] rounded-full hover:bg-gray-200'>
            <RiEmojiStickerFill className='text-[22px] text-[#3050f9] cursor-pointer' />
          </span>
          <span className='flex items-center justify-center p-[6px] rounded-full hover:bg-gray-200'>
            <HiGif className='text-[22px] text-[#3050f9] cursor-pointer' />
          </span>
        </div>
        <div className='flex items-center gap-2 w-full bg-gray-100 cursor-pointer px-[0px] py-[0px] mx-2 rounded-full'>
          <input type="text" placeholder='Aa' 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyPress={handleKeyPress}
          className='w-full rounded-full px-3 bg-gray-100 focus:outline-none' />
          <BsFillEmojiSmileFill className='text-[35px] text-[#3050f9] cursor-pointer flex items-center justify-center p-[8px] rounded-full hover:bg-gray-200' />
        </div>
        <div onClick={handleSend} className='flex items-center justify-center p-[6px] cursor-pointer rounded-full hover:bg-gray-200'>👋</div>
      </div>
    </div>
    </>
  )
}

export default FriendChat;