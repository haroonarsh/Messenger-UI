'use client';

import FriendChat from '@/features/friendChat/friendChat'
import FriendsBar from '@/features/friendsBar/friendsBar'
import Sidebar from '@/features/sidebar/sidebar'
import { useAuth } from '@/hooks/auth/useAuth';
import { IUser } from '@/libs/types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';

function page() {
  const { loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user || user === null) {
      router.push('/');
    } else {
      console.log("User:", user);
    }
  }, [loading, user, router]);

  return (
    <main className='bg-[#f5f5f5] h-screen overflow-hidden w-full flex items-start justify-start'>
      <Sidebar data={user as IUser} />
      <FriendsBar />
      <FriendChat conversationId="" friend={null} />
      {/* <FriendInfo /> */}
      <Toaster />
    </main>
  )
}

export default page