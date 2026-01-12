import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { RiSendPlane2Fill } from "react-icons/ri";
import { MdOutlineLock } from "react-icons/md";
import { useSocket } from '@/hooks/socket/useSocket';
import { useAuth } from '@/hooks/auth/useAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '@/libs/api';
import api from '@/utils/api';
import { useOnlineUsers } from '@/context/OnlineUsersContext';
import { User } from '@/libs/types';

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
  type?: 'text' | 'image' | 'video';
  mediaUrl?: string;
  timestamp?: string;
  createdAt: string;
}

interface FriendChatProps {
  conversationId: string;
  friend: User | null;
}

function FriendChat({ conversationId, friend }: FriendChatProps) {
  const { socket, joinConversation, leaveConversaton, sendMessage } = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'image' | 'video' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [typing, setTyping] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { onlineUsers } = useOnlineUsers();
  const skip = useRef(0);
  const limit = 30;
  const observer = useRef<IntersectionObserver | null>(null);
  
  console.log('messages:', messages);
  
  // auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendHand = () => {
    sendMessage({ conversationId, text: "👋" });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setPreviewType(file.type.startsWith('video') ? 'video' : 'image');

    // Upload immediately
    uploadAndSend(file);
  };

  const uploadAndSend = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post(`${API_BASE_URL}/upload/media`, formData , {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const mediaUrl = res.data.mediaUrl;

      console.log('Uploaded media URL:', mediaUrl);

      // Send message with media URL
      sendMessage({ conversationId, text: "", type: file.type.startsWith('video') ? 'video' : 'image', mediaUrl });

      // Clear preview
      setPreviewUrl(null);
      setPreviewType(null);
    } catch (error) {
      toast.error("Failed to upload media");
      setPreviewUrl(null);
      setPreviewType(null);
    }
  };

  // Fetch initial messages

  const fetchMessages = async (loadMore = false) => {
      if ((!hasMore && messages.length > 0)) return;
      setLoading(true);
      try {
        const res = await api.get(`${API_BASE_URL}/chat/messages/${conversationId}?skip=${skip.current}&limit=${limit}`);

        if (res.data.length < limit) setHasMore(false);
        
        setMessages(prev => loadMore ? [...res.data.reverse(), ...prev] : res.data.reverse()); // Reverse to show oldest first
        skip.current += res.data.length;
        scrollToBottom();
      } catch (error) {
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    
  useEffect(() => {
    skip.current = 0;
    setMessages([]);
    setHasMore(true);

    if (conversationId) {
      fetchMessages();
      joinConversation(conversationId);
    }

    return () => {
      leaveConversaton(conversationId);
    };
  }, [conversationId]);

  // Infinite scroll observer
  const lastMessageRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchMessages(true);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

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

  if (loading) return (
  <div className='flex flex-col gap-3 relative bg-[#ffffff] w-full mx-4 shadow-lg h-[97%] my-4 rounded-xl text-[#595959] font-sans'>
    <div className='flex flex-col gap-3 p-4 m-auto text-center items-center'>
    <Image src="/messenger.png" alt="Logo" width={40} height={40} className=''/>
    <h1 className='text-xl md:text-2xl lg:text-3xl font-light text-gray-800 '>
      Messanger for all Devices
    </h1>
    <p>
      Send and receive messages without keeping your phone online.
    <br/> Use Messenger on up to 4 linked devices and 1 phone at the same time.
    </p>
    </div>
    <div className='flex w-full items-center justify-center gap-1 pb-9'>
      <MdOutlineLock className='text-lg md:text-xl text-gray-800'/><p>Your personal messages are end-to-end encrypted.</p>
    </div>
    </div>
  );

  return (
    <>
    <div className='flex flex-col gap-3 relative bg-[#ffffff] w-full mx-4 shadow-lg h-[97%] my-4 rounded-xl text-[#595959] font-sans'>
      {/* header */}
      <div className='absolute top-0 left-0 w-full px-2 py-1 rounded-t-xl flex items-center justify-between border-b border-gray-300 bg-white shadow-xs'>
          <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-[5px] py-[2px] rounded-md'>
          <img src={friend?.avatar?.url || '/side2.png'} alt="Profile Image" width={100} height={100} className="w-[36px] h-[36px] cursor-pointer rounded-full border border-gray-300" />
          <span className={`absolute bottom-[10px] left-[40px] w-3 h-3 rounded-full border-2 border-white ${
              onlineUsers.has(friend?._id || '') ? 'bg-green-500' : 'bg-gray-400'
            }`} />
          <span className='flex flex-col'>
            <h2 className='text-gray-950 text-md'>{friend?.name || 'Loading...'}</h2>
            <p className='text-gray-500 text-[13px]'>@{friend?.username || ''}</p>
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
      <div className='w-full h-full mt-4 mb-12 flex-1 scrollbar-component p-4 pt-12 space-y-4'>
        {messages.map((msg, index) => (
          <div 
          key={msg._id}
          ref={index === 0 ? lastMessageRef : null} // Trigger load more at top
          className={`group flex items-center gap-2 ${msg.sender._id === user?.id ? 'self-end flex-row-reverse' : ''}`}>
          <img src={msg.sender.avatar?.url || '/side2.png'} alt="Profile Image" width={100} height={100} className="w-[36px] h-[36px] rounded-full" />
          <div className={``}>
            {msg.type === 'image' && msg.mediaUrl && (
              <img src={msg.mediaUrl} alt="Send Image" width={200} height={200} className="rounded-lg max-w-full object-contain" />
            )}
            {msg.type === 'video' && msg.mediaUrl && (
              <video
                src={msg.mediaUrl}
                controls
                className="rounded-lg max-w-full"
                width={300}
              >
                Your browser does not support the video tag.
              </video>
            )}
              {/* Text Content */}
            {msg.text && msg.text.trim() !== '' && (
              <div className={`${msg.sender._id === user?.id && msg.type === 'text' ? 'bg-[#3050f9] text-gray-50' : 'bg-gray-200 text-gray-950'} px-3 py-1 rounded-full`}>
              <p className='break-words'>{msg.text}
              </p>
              <p className={`text-[12px] ${msg.sender._id === user?.id ? 'text-end' : ''}`}>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            )}
            
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
          onClick={() => fileInputRef.current?.click()}
          className='flex items-center justify-center p-[8px] rounded-full hover:bg-gray-200'>
            <input type="file" title='media upload' ref={fileInputRef} onChange={handleFileSelect} accept="image/*,video/*" className="hidden" />
            <BsImage className='text-[18px] text-[#3050f9] cursor-pointer' />
          </span>
          {/* //////////////// */}
          {previewUrl && previewType && (
    <div className="mx-auto max-w-xs">
      {previewType === 'image' ? (
        <img src={previewUrl} alt="Preview" className="rounded-lg max-w-full" />
      ) : (
        <video src={previewUrl} controls className="rounded-lg max-w-full" />
      )}
    </div>
  )}
  {/* /////////////////////////// */}
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
        <button
          onClick={input.trim() ? handleSend : handleSendHand}
          className='flex items-center justify-center p-[6px] cursor-pointer rounded-full hover:bg-gray-200'
        >
          {input.trim() ? (
            <RiSendPlane2Fill className="w-5 h-5 text-[#3050f9]" />
          ) : (
            <span >👋</span>
          )}
        </button>
      </div>
    </div>
    </>
  )
}

export default FriendChat;