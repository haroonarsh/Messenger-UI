"use client";

import FriendChat from '@/features/friendChat/friendChat';
import FriendInfo from '@/features/friendInfo/friendInfo'
import FriendsBar from '@/features/friendsBar/friendsBar'
import Sidebar from '@/features/sidebar/sidebar'
import { useAuth } from '@/hooks/auth/useAuth';
import { API_BASE_URL } from '@/libs/api';
import { IUser, User } from '@/libs/types';
import api from '@/utils/api';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const loadingToast = () => toast.loading("Loading...", { duration: 3000, position: "top-right"});

function Page() {
  const { loading, user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [friend, setFriend] = useState<User | null>(null);
  const [showFriendInfo, setShowFriendInfo] = useState(false);
  
  useEffect(() => {
    if (!loading && !user || user === null) {
      router.push('/');
    } else {
      console.log("User:", user);
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchConversation = async () => {
      if (!params || !user) return;

      try {
        const response = await api.get(`${API_BASE_URL}/chat/conversations/${params.id}`);
        const conversation = response.data;

        console.log('Fetched conversation:', conversation);
        console.log('userID:', user.id);
        
        const otherParticipant = conversation.participants.find(
          (p: User) => p._id !== user?.id
        );

        console.log('otherParticipant:', otherParticipant);
        

        setFriend(otherParticipant || null);
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };

    fetchConversation();
  }, [params, user]);

  const toggleFriendInfo = () => {
    setShowFriendInfo(prev => !prev);
  }

  if (loading) return loadingToast();

  return (
    <main className='bg-[#f5f5f5] h-screen overflow-hidden w-full flex items-start justify-start'>
      <Sidebar data={user as IUser} />
      <FriendsBar />
      <FriendChat conversationId={params.id as string} friend={friend} onToggleInfo={toggleFriendInfo} />
      {showFriendInfo && friend && <FriendInfo friend={friend} onclose={() => setShowFriendInfo(false)} />}
      <Toaster />
    </main>
  )
}

export default Page