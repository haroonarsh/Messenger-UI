import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
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
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '@/libs/api';
import api from '@/utils/api';
import { useOnlineUsers } from '@/context/OnlineUsersContext';
import { User } from '@/libs/types';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { IoVideocam } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { PhoneOff, Mic, MicOff, PlayCircle, PauseCircle } from 'lucide-react';
import { useUnread } from '@/context/UnreadContext';

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
  type?: 'text' | 'image' | 'video' | 'file' | 'audio' | 'voice';
  mediaUrl?: string;
  timestamp?: string;
  createdAt: string;
}

interface FriendChatProps {
  conversationId: string;
  friend: User | null;
  onToggleInfo?: () => void;
}

function FriendChat({ conversationId, friend, onToggleInfo }: FriendChatProps) {
  const { socket, joinConversation, leaveConversaton, sendMessage } = useSocket();
  const { user } = useAuth();
  const { resetUnread } = useUnread();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'image' | 'video' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { onlineUsers } = useOnlineUsers();
  const skip = useRef(0);
  const limit = 30;
  const observer = useRef<IntersectionObserver | null>(null);
  const [callType, setCallType] = useState<'audio' | 'video' | null>(null);
  const [inCall, setInCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState<{ fromUserId: string; type: 'audio' | 'video' } | null>(null);
  const [calling, setCalling] = useState(false);
  const [pendingOffer, setPendingOffer] = useState<RTCSessionDescriptionInit | null>(null);
  const [pendingCallerId, setPendingCallerId] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);

  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({}); 
  const [durations, setDurations] = useState<{ [key: string]: string }>({});
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: number }>({});

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  // Toggle play/pause function
  const togglePlay = (messageId: string) => {
    const audio = audioRefs.current[messageId];
    if (!audio) return;

    if (playingId === messageId) {
      audio.pause();
      setPlayingId(null);
    } else {
      // Pause any playing
      if (playingId) audioRefs.current[playingId]?.pause();

      audio.play();
      setPlayingId(messageId);
    }
  };

  // Seek function
const handleSeek = (messageId: string, value: number) => {
  const audio = audioRefs.current[messageId];
  if (audio) {
    audio.currentTime = value;
    setCurrentTimes(prev => ({ ...prev, [messageId]: value }));
  }
};

// Format seconds to mm:ss
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

  //Recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

        // Upload
        uploadVoice(audioBlob);

        // Clear chunks
        audioChunksRef.current = [];
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);
    } catch (error: unknown) {
      toast.error("Failed to access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

    // Toggle recording function
  const toggleRecording = async () => {
    if (recording) {
      // Stop recording
      stopRecording();
    } else {
      // START RECORDING
      startRecording();
    }
  };

  const uploadVoice = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("file", blob, "voice.webm");

    try {
      const res = await api.post(`${API_BASE_URL}/api/upload/media`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { mediaUrl } = res.data;

      sendMessage({
        conversationId,
        text: "",
        type: "voice",
        mediaUrl,
      });

    } catch (error: unknown) {
      toast.error("Failed to upload voice message");
    }
  }

    // WebRTC setup for calls
  const servers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  };

  const createPeerConnection = (type: 'audio' | 'video') => {
    const pc = new RTCPeerConnection(servers);

    pc.onicecandidate = (event) => {
      if (event.candidate && friend?._id) {
        socket?.emit("ice-candidate", { toUserId: friend._id, candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      const stream = event.streams[0];
      if (type === 'video') {
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = stream;
      } else {
        if (remoteAudioRef.current) remoteAudioRef.current.srcObject = stream;
      }
    };

    return pc;
  };

  const startCall = async (type: 'audio' | 'video') => {
    if (!friend?._id) return;

    setCalling(true);
    setCallType(type);
    peerConnectionRef.current = createPeerConnection(type);

    try {
      const constraints = type === 'video' ? { audio: true, video: true } : { audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Attach stream
      if (type === 'video' && localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      } else if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
      }

      stream.getTracks().forEach(track => peerConnectionRef.current?.addTrack(track, stream));

      const offer = await peerConnectionRef.current?.createOffer();
      await peerConnectionRef.current?.setLocalDescription(offer);

      socket?.emit("call-offer", {
        toUserId: friend._id,
        offer,
        payload: { callType: type }
      });
    } catch (error: unknown) {
      console.error("Call start error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }

    cleanupCall();
    }
  };
  
  const acceptCall = async () => {
    if (!pendingOffer || !pendingCallerId || !callType) {
      toast.error("No pending call");
      return;
    }

    setInCall(true);
    peerConnectionRef.current = createPeerConnection(callType);

    try {
      await peerConnectionRef.current?.setRemoteDescription(pendingOffer);

      const constraints = callType === 'video' ? { audio: true, video: true } : { audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (callType === 'video' && localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      } else if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
      }

      stream.getTracks().forEach(track => peerConnectionRef.current?.addTrack(track, stream));

      const answer = await peerConnectionRef.current?.createAnswer();
      await peerConnectionRef.current?.setLocalDescription(answer);

      socket?.emit("call-answer", { 
        toUserId: pendingCallerId, 
        answer 
      });

      // Clear pending
      setPendingOffer(null);
      setPendingCallerId(null);
    } catch (error: unknown) {
      console.error("Call accept error:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Failed to accept call");
      }
      cleanupCall();
    }
  };

  const cleanupCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    [localVideoRef, remoteVideoRef, localAudioRef, remoteAudioRef].forEach(ref => {
      if (ref.current) ref.current.srcObject = null;
    });

    setInCall(false);
    setCalling(false);
    setIncomingCall(null);
    setCallType(null);
  };

  const hangUp = () => {
    if (friend?._id) {
      socket?.emit("call-hangup", { toUserId: friend._id });
    }
    cleanupCall();
  };

  // Socket listeners
  useEffect(() => {
    if (!socket || !friend?._id) return;

    socket.on("incoming-call", ({ fromUserId, offer, callType }: { fromUserId: string; offer: RTCSessionDescriptionInit; callType: 'audio' | 'video' }) => {
      setPendingCallerId(fromUserId);
      setPendingOffer(offer); // store the offer temporarily
      setCallType(callType);
      setIncomingCall({ fromUserId, type: callType });
      toast(`Incoming ${callType} call from ${friend.name}`);
    });

    socket.on("call-answered", async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(answer);
        setInCall(true);
        setCalling(false);
      }
    });

    socket.on("ice-candidate", async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.addIceCandidate(candidate);
      }
    });

    socket.on("call-ended", cleanupCall);

    return () => {
      socket.off("incoming-call");
      socket.off("call-answered");
      socket.off("ice-candidate");
      socket.off("call-ended");
    };
  }, [socket, friend]);

  ////////////////////////////////////////

  console.log('messages:', messages);
  
  // auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTyping = () => {
    if (!isTyping) {
      socket?.emit("typing", { conversationId });
      setIsTyping(true);
    }

    // Reset typing timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    
    typingTimeoutRef.current = setTimeout(() => {
      socket?.emit("stopTyping", { conversationId });
      setIsTyping(false);
    }, 3000); // 3 seconds of inactivity
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

    console.log('Selected file:', file);
    // Upload immediately
    uploadAndSend(file);
  };
  console.log('previewUrl:', previewUrl);
  console.log('previewType:', previewType);
  

  const uploadAndSend = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post(`${API_BASE_URL}/api/upload/media`, formData , {
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
    } catch (error: unknown) {
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
        const res = await api.get(`${API_BASE_URL}/api/chat/messages/${conversationId}?skip=${skip.current}&limit=${limit}`);

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

    socket.on("typing", ({ userId }: { userId: string }) => {
      if (userId !== user?.id) {
        setOtherTyping(true);
      }
    });

    socket.on("stopTyping", ({ userId }: { userId: string }) => {
      if (userId !== user?.id) {
        setOtherTyping(false);
      }
    });

    socket.on("new-message", (newMessage: Message) => {
      setMessages(prev => [...prev, newMessage]);
      scrollToBottom();
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("new-message");
    };
  }, [socket, user?.id]);

  // Mark messages as read when opening chat
    useEffect(() => {
    if (friend?._id) {
      resetUnread(friend._id);
    }
  }, [friend?._id]);

  const handleSend = () => {
    if (!input.trim() || !conversationId) return;

    sendMessage({ conversationId, text: input.trim() });
    setInput("");
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    socket?.emit("stopTyping", { conversationId });
    setIsTyping(false);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInput((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
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
          {inCall || calling ? (
            <button title='End call' onClick={hangUp} className="p-3 bg-red-500 rounded-full text-white">
              <PhoneOff className="w-5 h-5" />
            </button>
          ) : (
            <>
              <button onClick={() => startCall('audio')} title='Voice call' className='flex items-center justify-center p-[6px] rounded-full hover:bg-gray-200'>
                <IoCall className='text-[21px] text-[#aa00ff] cursor-pointer' />
              </button>
              <button onClick={() => startCall('video')} title='Video call' className='flex items-center justify-center p-[6px] rounded-full hover:bg-gray-200'>
                <IoVideocam className='text-[22px] text-[#aa00ff] cursor-pointer' />
              </button>
            </>
          )}
          
          <button onClick={onToggleInfo} title='Conversation info' className='flex items-center justify-center p-[6px] rounded-full hover:bg-gray-200'>
            <PiDotsThreeCircleFill className='text-[22px] text-[#aa00ff] cursor-pointer' />
          </button>
        </div>
      </div>

      {/* Call UI */}
      {inCall && (
        <div className="flex-1 flex flex-col items-center justify-center bg-black">
          {callType === 'video' && (
            <>
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full max-w-2xl rounded-lg" />
              <video ref={localVideoRef} autoPlay playsInline muted className="fixed bottom-4 right-4 w-48 rounded-lg border-4 border-white" />
            </>
          )}
          {callType === 'audio' && (
            <div className="text-white text-2xl">
              Voice call with {friend?.name}
            </div>
          )}
          <audio ref={remoteAudioRef} autoPlay />
          <audio ref={localAudioRef} autoPlay muted />
        </div>
      )}

      {/* Incoming Call Modal */}
      {incomingCall && !inCall && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl text-center">
            <p className="text-2xl mb-4">
              Incoming {incomingCall.type} call from {friend?.name}
            </p>
            <div className="flex gap-4 justify-center">
              <button onClick={acceptCall} className="px-8 py-4 bg-green-500 text-white rounded-full text-xl">
                Accept
              </button>
              <button onClick={hangUp} className="px-8 py-4 bg-red-500 text-white rounded-full text-xl">
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

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
              <div>
              <img src={msg.mediaUrl} alt="Send Image" width={200} height={200} className="rounded-lg max-w-full object-contain" />
              <p className={`text-[12px] ${msg.sender._id === user?.id ? 'text-end' : ''}`}>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            )}
            {msg.type === 'video' && msg.mediaUrl && (
              <div>
              <video
                src={msg.mediaUrl}
                controls
                className="rounded-lg max-w-full"
                width={300}
              >
                Your browser does not support the video tag.
              </video>
              <p className={`text-[12px] ${msg.sender._id === user?.id ? 'text-end' : ''}`}>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            )}
            {msg.type === 'voice' && msg.mediaUrl && (
              <>
  <div className={`relative px-4 py-3 rounded-3xl flex items-center gap-3 ${
    msg.sender._id === user?.id 
      ? 'bg-[#0084ff] rounded-br-none' 
      : 'bg-[#e4e6eb] rounded-bl-none'
  }`}>
    {/* Play/Pause Button */}
    <button onClick={() => togglePlay(msg._id)} className="flex-shrink-0 z-10">
      {playingId === msg._id ? (
        <PauseCircle className={`w-10 h-10 ${
          msg.sender._id === user?.id ? 'text-white' : 'text-[#0084ff]'
        }`} />
      ) : (
        <PlayCircle className={`w-10 h-10 ${
          msg.sender._id === user?.id ? 'text-white' : 'text-[#0084ff]'
        }`} />
      )}
    </button>

    {/* Waveform + Seek Slider in One Line */}
    <div className="flex-1 relative flex items-center">
      {/* Static Waveform Bars */}
      <div className="absolute inset-0 flex items-center gap-1 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full ${
              msg.sender._id === user?.id ? 'bg-white/40' : 'bg-[#0084ff]/40'
            }`}
            style={{ height: `${9 + (i % 4) * 8}px` }}
          />
        ))}
      </div>

      {/* Seek Slider - Over Waveform */}
      <input
      title="Seek"
        type="range"
        min="0"
        max={audioRefs.current[msg._id]?.duration || 0}
        value={currentTimes[msg._id] || 0}
        onChange={(e) => handleSeek(msg._id, parseFloat(e.target.value))}
        className={`w-full h-8 bg-transparent cursor-pointer z-10 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0`}
        style={{
          background: `linear-gradient(to right, ${
            msg.sender._id === user?.id ? 'rgba(255,255,255,0.6)' : '#0084ff'
          } 0%, ${
            msg.sender._id === user?.id ? 'rgba(255,255,255,0.6)' : '#0084ff'
          } ${(currentTimes[msg._id] || 0) / (audioRefs.current[msg._id]?.duration || 1) * 100}%, ${
            msg.sender._id === user?.id ? 'rgba(255,255,255,0.2)' : 'rgba(0,132,255,0.2)'
          } ${(currentTimes[msg._id] || 0) / (audioRefs.current[msg._id]?.duration || 1) * 100}%, ${
            msg.sender._id === user?.id ? 'rgba(255,255,255,0.2)' : 'rgba(0,132,255,0.2)'
          } 100%)`,
        }}
      />
    </div>

    {/* Duration */}
    <span className={`text-sm font-medium min-w-[70px] text-right ${
      msg.sender._id === user?.id ? 'text-white/90' : 'text-gray-700'
    }`}>
      {currentTimes[msg._id] !== undefined ? formatTime(currentTimes[msg._id]) : "0:00"} / {durations[msg._id] || "0:00"}
    </span>

    {/* Hidden Audio */}
    <audio
      ref={(el) => {
        if (el && msg.mediaUrl) {
          audioRefs.current[msg._id] = el;
          el.onloadedmetadata = () => {
            setDurations(prev => ({ ...prev, [msg._id]: formatTime(el.duration) }));
          };
          el.ontimeupdate = () => {
            setCurrentTimes(prev => ({ ...prev, [msg._id]: el.currentTime }));
          };
          el.onended = () => setPlayingId(null);
        }
      }}
      src={msg.mediaUrl}
    />
    
  </div>
  <p className={`text-[12px] ${msg.sender._id === user?.id ? 'text-end' : ''}`}>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
  </>
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
        {/* Typing Indicator */}
          {otherTyping && (
            <div className="flex items-center gap-2 self-start mb-4">
              <img src={friend?.avatar?.url || "/side2.png"} alt="" width={36} height={36} className="rounded-full" />
              <div className="bg-gray-200 px-4 py-2 rounded-full">
                <p className="text-sm">
                  {friend?.name || "Friend"} is typing
                  <span className="inline-block animate-pulse">...</span>
                </p>
              </div>
            </div>
          )}
        {/* {isTyping && <p className="text-gray-500 text-sm">{isTyping}</p>} */}
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
          <button 
          title={recording ? 'Stop Recording' : 'Start Recording'}
          onClick={toggleRecording}
          className={`flex items-center justify-center p-[6px] rounded-full ${recording ? 'bg-red-500 animate-pulse' : 'bg-transparent hover:bg-gray-200'}`}>
            {recording ? <MicOff className='text-[18px] text-gray-950 cursor-pointer' /> : <Mic className='text-[18px] text-[#3050f9] cursor-pointer' />}
            {/* <MdSettingsVoice className='text-[22px] text-[#3050f9] cursor-pointer' /> */}
            
          </button>
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
          onChange={(e) => {
            setInput(e.target.value);
            handleTyping();
          }} 
          onKeyPress={handleKeyPress}
          className='w-full rounded-full px-3 bg-gray-100 focus:outline-none' />
          <BsFillEmojiSmileFill className='text-[35px] text-[#3050f9] cursor-pointer flex items-center justify-center p-[8px] rounded-full hover:bg-gray-200' onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-16 right-4 z-10">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
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