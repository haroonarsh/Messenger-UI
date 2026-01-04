import React, { useEffect, useState } from 'react'
import { MdFacebook } from "react-icons/md";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import Image from 'next/image';
import { InviteModal } from '../addFriend/addFriend';
import { useAuth } from '@/hooks/auth/useAuth';
import { useSocket } from '@/hooks/socket/useSocket';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { findOrCreateConversation } from '@/services/chat/chat.service';
import { getFriends } from '@/services/user/user.service';
import { Friend } from '@/libs/types';
import { useOnlineUsers } from '@/context/OnlineUsersContext';


function FriendsBar() {
    const [inviteOpen, setInviteOpen] = useState(false);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [onlineUser, setOnlineUser] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const { socket } = useSocket();
    const router = useRouter();
    const { onlineUsers } = useOnlineUsers();

    console.log('friends:', friends);
    console.log('onlines:', onlineUsers);
    console.log('online:', onlineUser);
    console.log('currentUser:', user);
    
    
    
    // Fetch friends
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const data = await getFriends();
        setFriends(data);
      } catch (error) {
        toast.error('Failed to load friends');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (user) fetchFriends();
    }, [user]);

    // Real-time online/offline status
    useEffect(() => {
      if (!socket) return;

      socket.on("userOnline", ({ userId }: { userId: string }) => {
      setOnlineUser(prev => new Set(prev).add(userId));
    });

    socket.on("userOffline", ({ userId }: { userId: string }) => {
      setOnlineUser(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    });

    return () => {
      socket.off("userOnline");
      socket.off("userOffline");
    };
    }, [socket]);

    const openChat = async (friendId: string) => {
      try {
        console.log('Creating conv with:', [user?.id, friendId]);
        
        const conv = await findOrCreateConversation([user?.id || '', friendId]);
        router.push(`/chat/${conv._id}`);
      } catch (error) {
        toast.error('Failed to open chat');
      }
    };

  if (loading) {
  return  <div className="flex flex-col gap-3 bg-[#ffffff] min-w-[338px] xl:min-w-[352px] h-full shadow-lg my-4 rounded-xl text-[#595959] font-sans px-4 py-2" > <p className="py-8 text-center">Loading friends... </p> </div>;
  }

  return (
    <>
    <div className='flex flex-col gap-3 bg-[#ffffff] min-w-[338px] xl:min-w-[352px] h-[97%] shadow-lg my-4 rounded-xl text-[#595959] font-sans px-4 py-2'>
      <div className='flex items-center justify-between text-gray-950'>
        <h1 className='text-2xl font-bold'>Chats</h1>
        <span className='flex items-center gap-2'>
          <span className='relative text-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer p-[6px] rounded-full'><MdFacebook />
          <span className='absolute w-[12px] h-[12px] rounded-full border-2 top-0 right-0 border-white bg-blue-600' />
          </span>
          <span className='text-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer p-[6px] rounded-full'
          onClick={() => setInviteOpen(true)}><HiMiniPencilSquare /></span>
        </span>
      </div>
      <div className='flex items-center justify-start gap-2 bg-gray-100 hover:bg-gray-200 cursor-pointer px-[6px] py-[3px] rounded-full'>
        <IoSearch className='text-3xl pl-2 text-gray-500'/>
        <input type="text" placeholder='Search Messenger' className='text-gray-950 focus:outline-none'/>
      </div>
      <div className='flex flex-col scrollbar-component pr-1'>
        {friends.length === 0 ? (
          <p className='text-center text-gray-500 mt-4'>No friends found.</p>
        ) : (
          friends.map((friend) => (
            <div key={friend._id} className='relative group flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded-lg duration-75'
            onClick={() => openChat(friend._id)}>
          <img src={friend.avatar?.url || ''} alt="Profile Image" width={100} height={100} className="w-[45px] h-[45px] cursor-pointer rounded-full border border-gray-300" />
          <span className={`absolute bottom-[10px] left-[43px] w-3 h-3 rounded-full border-2 border-white ${
              onlineUsers.has(friend._id) || onlineUser.has(friend._id) ? 'bg-green-500' : 'bg-gray-400'
            }`} />
          <div className='relative'>
            <h2 className='text-gray-950'>{friend.username}</h2>
            <p className='text-gray-500 text-sm'>Haroon send you a message. <span>1 min</span></p>
            <span className='hidden group-hover:block absolute rounded-full border-2 top-1 cursor-pointer right-0 border-gray-200 bg-white shadow-xs hover:bg-gray-100 p-2'>
              <BsThreeDots className='text-md text-gray-500' />
            </span>
          </div>
        </div>
          ))
        )}
        
      </div>
    </div>
    <InviteModal open={inviteOpen} onOpenChange={setInviteOpen} />
    </>
  )
}

export default FriendsBar;