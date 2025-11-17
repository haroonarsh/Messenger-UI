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

interface Message {
  senderId: string;
  text: string;
  attachments: any[];
  messageId: string;
  conversationId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
  id: string;
  type: string;
  status: string;
  mediaUrl: string;
  mediaType: string;
  readBy: string[];
  deletedBy: string[];
  deletedAt: string;
  deleted: boolean;
  deletedFor: string;
  deletedByUser: string;
  timestamp: string;
  sender: string;
  receiver: string;

}

function FriendChat({ conversationId }: { conversationId: string }) {
  const { socket, joinConversation, leaveConversaton, sendMessage } = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [typing, setTyping] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (socket && conversationId) {
      joinConversation(conversationId);

      // Listen for new messages
      socket.on("new-message", (newMessage: Message) => {
        setMessages((prev) => [...prev, newMessage]);
        scrollToBottom();
      });

      // Typing listener (assume backend emits "typing" with { userId, conversationId })
      socket.on("typing", (data: { userId: string }) => {
        if (data.userId !== user?._id) {
          setIsTyping('typing...');
          console.log(isTyping, data.userId, user?._id);
        }
      });

      socket.on("stopTyping", () => {
        setIsTyping('');
      });

      // Fetch initial messages via HTTP
      fetch(`/api/chat/messages/${conversationId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch messages");
          return res.json(); 
        })
        .then((data: Message[]) => {
          setMessages(data);
          scrollToBottom();
        })
        .catch((error) => console.error("Error fetching messages:", error));

      return () => {
        leaveConversaton(conversationId); // Fixed typo
        socket.off("new-message"); // Fixed typo
        socket.off("typing");
        socket.off("stopTyping");
      };
    }
  }, [socket, conversationId, user?._id]);

  // Handle typing indicator emission
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    if (typing) {
      socket?.emit("typing", { conversationId });
      typingTimeout = setTimeout(() => {
        socket?.emit("stopTyping", { conversationId });
        setTyping(false);
      }, 3000); // 3 seconds
    }

    return () => clearTimeout(typingTimeout);
  }, [typing, socket, conversationId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (!typing) setTyping(true);
  }

  const handleSend = () => {
    if (input.trim()) {
      sendMessage({ conversationId, text: input, type: 'text' });
      setInput('');
      setTyping(false);
      socket?.emit("stopTyping", { conversationId });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Stub for image upload (triggers file input)
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Stub for file upload (integrate with Cloudinary/Multer via API)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const { mediaUrl } = response.data;
        sendMessage({ conversationId, text: mediaUrl, type: 'image' });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // Format timestamp (simple example)
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
    <div className='flex flex-col gap-3 relative bg-[#ffffff] w-full mx-4 shadow-lg h-[97%] my-4 rounded-xl text-[#595959] font-sans'>
      {/* header */}
      <div className='absolute top-0 left-0 w-full px-2 py-1 rounded-t-xl flex items-center justify-between border-b border-gray-300 bg-white shadow-xs'>
        <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-[5px] py-[2px] rounded-md'>
          <Image src="/side2.png" alt="Profile Image" width={100} height={100} className="w-[36px] h-[36px] cursor-pointer rounded-full border border-gray-300" />
          <span className='flex flex-col'>
            <h2 className='text-gray-950 text-md'>Haroon Arshad</h2>
            <p className='text-gray-500 text-[13px]'>FullStack Developer</p>
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
      <div className='w-full h-full scrollbar-component flex flex-col gap-2 flex-grow items-start justify-end mb-16 p-4'>
        {messages.map((msg) => (
          <div key={msg._id} className={`group flex items-center gap-2 ${msg.senderId === user?._id ? 'self-end flex-row-reverse' : ''}`}>
          <Image src={msg.senderAvatar || '/side2.png'} alt="Profile Image" width={100} height={100} className="w-[36px] h-[36px] rounded-full" />
          <div className={`${msg.senderId === user?._id ? 'bg-[#3050f9] text-gray-50' : 'bg-gray-200 text-gray-950'} px-3 py-1 rounded-full`}>
            {msg.type === 'image' && msg.mediaUrl ? (
              <Image src={msg.mediaUrl} alt="Media" width={200} height={200} className="rounded-md" />
            ) : (
              <p>{msg.text}</p>
            )}
            <p className={`text-[12px] ${msg.senderId === user?._id ? 'text-end' : ''}`}>{formatTimestamp(msg.timestamp || msg.createdAt)}</p>
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
          <span onClick={handleImageClick} className='flex items-center justify-center p-[8px] rounded-full hover:bg-gray-200'>
            <BsImage className='text-[18px] text-[#3050f9] cursor-pointer' />
          </span>
          <label htmlFor="file" title='Upload Image'/>
          <input id="file" type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          <span className='flex items-center justify-center p-[6px] rounded-full hover:bg-gray-200'>
            <RiEmojiStickerFill className='text-[22px] text-[#3050f9] cursor-pointer' />
          </span>
          <span className='flex items-center justify-center p-[6px] rounded-full hover:bg-gray-200'>
            <HiGif className='text-[22px] text-[#3050f9] cursor-pointer' />
          </span>
        </div>
        <div className='flex items-center gap-2 w-full bg-gray-100 cursor-pointer px-[0px] py-[0px] mx-2 rounded-full'>
          <input type="text" placeholder='Aa' value={input} onChange={handleInputChange} onKeyDown={handleKeyDown} className='w-full rounded-full px-3 bg-gray-100 focus:outline-none' />
          <BsFillEmojiSmileFill className='text-[35px] text-[#3050f9] cursor-pointer flex items-center justify-center p-[8px] rounded-full hover:bg-gray-200' />
        </div>
        <div onClick={handleSend} className='flex items-center justify-center p-[6px] cursor-pointer rounded-full hover:bg-gray-200'>👋</div>
      </div>
    </div>
    </>
  )
}

export default FriendChat;